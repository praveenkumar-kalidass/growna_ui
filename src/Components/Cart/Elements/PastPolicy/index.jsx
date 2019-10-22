import React, {Component} from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Paper,
  TextField
} from "@material-ui/core";
import {
  DatePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MomentUtils from "@date-io/moment";
import Strategy from "joi-validation-strategy";
import Validation from "react-validation-mixin";
import {withRouter} from "react-router-dom";
import _ from "underscore";
import Schema from "./schema";
import {
  savePastPolicy,
  getCompanyList
} from "../../../../Actions/Insurance";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.insurance.loading,
  companies: state.insurance.companies,
  policyNumber: state.insurance.pastPolicy.policyNumber,
  expiryDate: state.insurance.pastPolicy.expiryDate,
  claimed: state.insurance.pastPolicy.claimed,
  noClaimBonus: state.insurance.pastPolicy.noClaimBonus,
  companyId: state.insurance.pastPolicy.companyId
});

const mapDispatchToProps = (dispatch) => ({
  savePastPolicy: (data) => { dispatch(savePastPolicy(data)) },
  getCompanyList: (type) => { dispatch(getCompanyList(type)) }
});

class PastPolicy extends Component {
  static propTypes = {
    handleCartIndex: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.validatorTypes = {
      policyNumber: Schema.policyNumber,
      expiryDate: Schema.expiryDate,
      noClaimBonus: Schema.noClaimBonus,
      companyId: Schema.companyId
    };
    this.state = {
      companies: props.companies,
      policyNumber: props.policyNumber || "",
      expiryDate: props.expiryDate || new Date(),
      claimed: props.claimed || false,
      noClaimBonus: props.noClaimBonus || 0,
      companyId: props.companyId || ""
    };
  }

  componentDidMount() {
    this.props.getCompanyList(this.props.type);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.loading) {
      return {
        policyNumber: props.policyNumber || "",
        expiryDate: props.expiryDate || new Date(),
        claimed: props.claimed || false,
        noClaimBonus: props.noClaimBonus || 0,
        companyId: props.companyId || ""
      };
    }
    return {
      companies: props.companies
    };
  }

  getValidatorData = () => (this.state)

  handleChange = (field) => (event) => {
    let value;
    if (field === "expiryDate") {
      value = event.toDate();
    } else {
      value = event.target.value;
      if (field === "claimed") {
        value = event.target.checked
        if (!value) {
          this.setState({
            noClaimBonus: 0
          });
        }
      }
    }
    this.setState({
      [field]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.validate((error) => {
      if (!error) {
        this.props.savePastPolicy({
          ..._.pick(
            this.state,
            "policyNumber",
            "expiryDate",
            "claimed",
            "noClaimBonus",
            "companyId"
          ),
          cartId: this.props.match.params.id
        });
        this.props.handleCartIndex(4);
      }
    });
  }

  render() {
    const {
      companies,
      policyNumber,
      expiryDate,
      claimed,
      noClaimBonus,
      companyId
    } = this.state;

    return (
      <div className="gis-past-policy">
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <Paper className="form-container">
              <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <TextField
                  label="Policy Number"
                  value={policyNumber}
                  onChange={this.handleChange("policyNumber")}
                  onBlur={this.props.handleValidation("policyNumber")}
                  margin="normal"
                  fullWidth
                  required
                  error={!this.props.isValid("policyNumber")}
                  helperText={this.props.getValidationMessages("policyNumber")[0]} />
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    fullWidth
                    label="Previous policy expiry date"
                    value={expiryDate}
                    disableFuture
                    openTo="year"
                    views={["year", "month", "day"]}
                    format="MM/DD/YYYY"
                    onChange={this.handleChange("expiryDate")}
                    onBlur={this.props.handleValidation("expiryDate")}
                    error={!this.props.isValid("expiryDate")}
                    helperText={this.props.getValidationMessages("expiryDate")} />
                </MuiPickersUtilsProvider>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={6} md={6}>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            onChange={this.handleChange("claimed")}
                            checked={claimed}>
                          </Checkbox>
                        }
                        label="Claimed Previous policy?" />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      select
                      margin="normal"
                      fullWidth
                      disabled={!claimed}
                      value={noClaimBonus}
                      onChange={this.handleChange("noClaimBonus")}
                      error={!this.props.isValid("noClaimBonus")}
                      helperText={this.props.getValidationMessages("noClaimBonus")}>
                      <MenuItem value={0}>0%</MenuItem>
                      <MenuItem value={25}>25%</MenuItem>
                      <MenuItem value={50}>50%</MenuItem>
                    </TextField>
                  </Grid>
                  <TextField
                    select
                    margin="normal"
                    fullWidth
                    value={companyId}
                    onChange={this.handleChange("companyId")}
                    error={!this.props.isValid("companyId")}
                    helperText={this.props.getValidationMessages("companyId")}>
                    {
                      _.map(companies, (company, index) => (
                        <MenuItem key={index} value={company.id}>
                          {company.name}
                        </MenuItem>
                      ))
                    }
                  </TextField>
                  <Grid container justify="flex-end" spacing={16}>
                    <Grid item>
                      <Button variant="contained" color="primary"
                        onClick={() => this.props.handleCartIndex(2)}>
                        Previous
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button type="submit" variant="contained" color="primary">
                        Done
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Validation(Strategy)(PastPolicy)));
