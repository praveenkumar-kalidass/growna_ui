import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  Slider,
  TextField,
  Typography
} from "@material-ui/core";
import {connect} from "react-redux";
import {editQuotation} from "../../../../Actions/Insurance";
import "./style.scss";

const mapDispatchToProps = (dispatch) => ({
  editQuotation: (data, callback) => { dispatch(editQuotation(data, callback)) }
});

class IDVForm extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    idv: PropTypes.number.isRequired,
    standardIdv: PropTypes.number.isRequired,
    handleDialog: PropTypes.func.isRequired,
    quotationId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      insuredDeclaredValue: props.idv || props.standardIdv,
      minIdv: props.standardIdv * 0.7,
      maxIdv: props.standardIdv * 1.3,
      open: props.open,
      submit: false
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      open: props.open
    };
  }

  handleIDV = (event, insuredDeclaredValue) => {
    this.setState({insuredDeclaredValue});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      submit: true
    });
    this.props.editQuotation({
      id: this.props.quotationId,
      insuredDeclaredValue: this.state.insuredDeclaredValue
    }, this.props.handleDialog("changeIDV", false));
  }

  render() {
    const {
      insuredDeclaredValue,
      minIdv,
      maxIdv,
      open,
      submit
    } = this.state;

    return (
      <Dialog className="gis-idv-form"
        open={open}
        onClose={this.props.handleDialog("changeIDV", false)}
        fullWidth
        maxWidth="sm">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <DialogTitle>Set Custom IDV</DialogTitle>
          <DialogContent>
            <Grid container alignItems="flex-end" spacing={4}
              className="text-container">
              <Grid item>
                <DialogContentText>
                Set a custom IDV in the specified range,
                </DialogContentText>
              </Grid>
              <Grid item>
                <TextField
                  value={insuredDeclaredValue}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                    startAdornment: <InputAdornment position="start">&#8377;</InputAdornment>
                  }} />
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="caption">
                  Min. IDV: &#8377;{minIdv.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  Min. IDV: &#8377;{maxIdv.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
            <Slider
              className="idv-slider"
              min={minIdv}
              max={maxIdv}
              value={insuredDeclaredValue}
              onChange={this.handleIDV}
              step={100} />
          </DialogContent>
          <DialogActions>
            {
              submit ?
              <Button variant="contained" color="primary">
                <CircularProgress size={24} className="button-progress" />
              </Button> :
              <Fragment>
                <Button color="primary"
                  onClick={this.props.handleDialog("changeIDV", false)}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Fragment>
            }
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(IDVForm);
