import React, {Component} from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Popper,
  TextField
} from "@material-ui/core";
import {
  CameraAlt
} from "@material-ui/icons";
import {connect} from "react-redux";
import Autosuggest from "react-autosuggest";
import _ from "underscore";
import {$} from "jquery";
import {saveCompany} from "../../../../Actions/Tenant";
import "./style.scss";

const environment = process.env.NODE_ENV || "development";

const mapStateToProps = (state) => ({
  companyList: state.tenant.companyList
});

const mapDispatchToProps = (dispatch) => ({
  saveCompany: (data, callback) => { dispatch(saveCompany(data, callback)) }
});

class PlanDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    plan: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      plan: props.plan || {},
      companyList: props.companyList,
      suggestions: [],
      name: props.plan.name || "",
      insuredDeclaredValue: props.plan.insuredDeclaredValue || "",
      thirdPartyPremium: props.plan.thirdPartyPremium || "",
      noClaimBonus: props.plan.noClaimBonus || "",
      discount: props.plan.discount || "",
      ownerDriver: props.plan.ownerDriver || "",
      type: props.plan.type || "",
      image: props.plan.companyImage || "",
      imageSrc: ""
    };
  }

  componentDidMount() {
    if (this.props.plan.companyImage) {
      this.setState({
        imageSrc: `${Config[environment].service}${this.props.plan.companyImage.path}`
      });
    }
  }

  handleChange = (field) => (event) => {
    this.setState({
      [field]: event.target.value
    });
  }

  handleNameChange = (field) => (event, {newValue}) => {
    this.setState({
      [field]: event.target.value || newValue
    });
  }

  handleImage = (event) => {
    if (event.target.files.length) {
      let fr = new FileReader();
      fr.onload = () => {
        this.setState({
          imageSrc: fr.result
        });
      };
      fr.readAsDataURL(event.target.files[0]);
      this.setState({
        image: event.target.files[0]
      });
    }
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.setState((state) => ({
      suggestions: _.filter(state.companyList, ({name}) => (
        new RegExp(value, "i").test(name)
      ))
    }));
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.saveCompany({
      ..._.pick(
        this.props.plan,
        "id",
        "imageId"
      ),
      ..._.pick(
        this.state,
        "name",
        "insuredDeclaredValue",
        "thirdPartyPremium",
        "noClaimBonus",
        "discount",
        "ownerDriver",
        "type",
        "image"
      )
    }, () => {
      this.props.handleClose(true);
    });
  }

  render() {
    const {
      open,
      handleClose
    } = this.props;
    const {
      suggestions,
      name,
      insuredDeclaredValue,
      thirdPartyPremium,
      noClaimBonus,
      discount,
      ownerDriver,
      type,
      imageSrc
    } = this.state;

    return (
      <Dialog
        className="gis-plan-dialog"
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <DialogTitle>
            Add new plan for a company
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={12} sm={4} md={4} className="image-container">
                <Avatar
                  className="company-image"
                  src={imageSrc} />
                <Grid container justify="center" className="upload-image">
                  <input id="company-picture"
                    accept="image/*"
                    type="file"
                    style={{display: "none"}}
                    onChange={this.handleImage} />
                  <label htmlFor="company-picture">
                    <Button component="span" className="upload-label">
                      <CameraAlt className="upload-icon" />
                      Change picture
                    </Button>
                  </label>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={8} md={8 }>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={(suggestion) => (suggestion.name)}
                  focusInputOnSuggestionClick={false}
                  renderSuggestion={(suggestion, {isHighlighted}) => (
                    <MenuItem selected={isHighlighted} component="div">
                      <div>{suggestion.name}</div>
                    </MenuItem>
                  )}
                  inputProps={{
                    placeholder: "Enter a company name",
                    value: name,
                    onChange: this.handleNameChange("name"),
                    inputRef: (node) => {
                      this.popperNode = node;
                    }
                  }}
                  renderInputComponent={(inputProps) => (
                    <TextField fullWidth {...inputProps} />
                  )}
                  renderSuggestionsContainer={(options) => (
                    <Popper
                      {...options.containerProps}
                      open={Boolean(options.children)}
                      anchorEl={this.popperNode}
                      className="plan-popper">
                      <Paper>
                        {options.children}
                      </Paper>
                    </Popper>
                  )} />
              </Grid>
            </Grid>
            <TextField
              required
              fullWidth
              margin="normal"
              value={insuredDeclaredValue}
              onChange={this.handleChange("insuredDeclaredValue")}
              placeholder="Insured Declared Value"
              InputProps={{
                endAdornment: <InputAdornment position="end">
                % of IDV
              </InputAdornment>
            }} />
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  value={thirdPartyPremium}
                  onChange={this.handleChange("thirdPartyPremium")}
                  placeholder="Third Party Premium"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                    % of TPP
                  </InputAdornment>
                }} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  value={noClaimBonus}
                  onChange={this.handleChange("noClaimBonus")}
                  placeholder="No Claim Bonus"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                }}/>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  value={discount}
                  onChange={this.handleChange("discount")}
                  placeholder="Discount"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                }} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  value={ownerDriver}
                  onChange={this.handleChange("ownerDriver")}
                  placeholder="Owner Driver"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                    &#8377;
                  </InputAdornment>
                }}/>
              </Grid>
            </Grid>
            <TextField
              required
              fullWidth
              select
              label="Select a plan type"
              value={type}
              onChange={this.handleChange("type")}
              margin="normal">
              <MenuItem value="BIKE">Bike</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanDialog);
