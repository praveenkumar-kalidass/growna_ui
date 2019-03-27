import React, {Component} from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField
} from "@material-ui/core";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Strategy from "joi-validation-strategy";
import Validation from "react-validation-mixin";
import {withRouter} from "react-router-dom";
import _ from "underscore";
import Schema from "./schema";
import {saveVehicleDetail} from "../../../../Actions/Insurance";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.insurance.loading,
  vehicleNumber: state.insurance.vehicle.vehicleNumber,
  onLoan: state.insurance.vehicle.onLoan
});

const mapDispatchToProps = (dispatch) => ({
  saveVehicleDetail: (data) => { dispatch(saveVehicleDetail(data)) }
});

class VehicleDetail extends Component {
  static propTypes = {
    handleCartIndex: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.validatorTypes = {
      vehicleNumber: Schema.vehicleNumber
    };
    this.state = {
      vehicleNumber: props.vehicleNumber || "",
      onLoan: props.onLoan || false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading) {
      this.setState({
        vehicleNumber: nextProps.vehicleNumber || "",
        onLoan: nextProps.onLoan || ""
      });
    }
  }

  getValidatorData = () => (this.state)

  handleChange = (field) => (event) => {
    let value = event.target.value;
    if (field === "onLoan") {
      value = event.target.checked;
    }
    this.setState({
      [field]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.validate((error) => {
      if (!error) {
        this.props.saveVehicleDetail({
          ..._.pick(this.state, "vehicleNumber", "onLoan"),
          cartId: this.props.match.params.id
        });
        this.props.handleCartIndex(3);
      }
    });
  }

  render() {
    const {
      vehicleNumber,
      onLoan
    } = this.state;

    return (
      <div className="gis-vehicle-detail">
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <Paper className="form-container">
              <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <TextField
                  label="Vehicle RTO number"
                  value={vehicleNumber}
                  onChange={this.handleChange("vehicleNumber")}
                  onBlur={this.props.handleValidation("vehicleNumber")}
                  margin="normal"
                  fullWidth
                  required
                  error={!this.props.isValid("vehicleNumber")}
                  helperText={this.props.getValidationMessages("vehicleNumber")[0]} />
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={this.handleChange("onLoan")}
                        checked={onLoan}>
                      </Checkbox>
                    }
                    label="Vehicle still on loan?" />
                </FormGroup>
                <Grid container justify="flex-end" spacing={16}>
                  <Grid item>
                    <Button variant="contained" color="primary"
                      onClick={() => this.props.handleCartIndex(1)}>
                      Previous
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button type="submit" variant="contained" color="primary">
                      Next
                    </Button>
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
)(Validation(Strategy)(VehicleDetail)));
