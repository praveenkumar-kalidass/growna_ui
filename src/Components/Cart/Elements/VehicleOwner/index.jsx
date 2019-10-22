import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField
} from "@material-ui/core";
import {
  DatePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";
import PropTypes from "prop-types";
import MomentUtils from "@date-io/moment";
import Strategy from "joi-validation-strategy";
import Validation from "react-validation-mixin";
import {withRouter} from "react-router-dom";
import _ from "underscore";
import Schema from "./schema";
import {saveVehicleOwnerDetails} from "../../../../Actions/Insurance";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.insurance.loading,
  firstName: state.insurance.vehicleOwner.firstName,
  lastName: state.insurance.vehicleOwner.lastName,
  gender: state.insurance.vehicleOwner.gender,
  dateOfBirth: state.insurance.vehicleOwner.dateOfBirth,
  mobileNumber: state.insurance.vehicleOwner.mobileNumber,
  email: state.insurance.vehicleOwner.email
});

const mapDispatchToProps = (dispatch) => ({
  saveVehicleOwnerDetails: (data) => { dispatch(saveVehicleOwnerDetails(data)) }
});

class VehicleOwner extends Component {
  static propTypes = {
    handleCartIndex: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.validatorTypes = {
      firstName: Schema.firstName,
      lastName: Schema.lastName,
      gender: Schema.gender,
      dateOfBirth: Schema.dateOfBirth,
      email: Schema.email,
      mobileNumber: Schema.mobileNumber
    };
    this.state = {
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      gender: props.gender || "",
      dateOfBirth: props.dateOfBirth || new Date(),
      mobileNumber: props.mobileNumber || "",
      email: props.email || ""
    };
  }

  static getDerivedStateFromProps(props) {
    if(state.loading) {
      return {
        firstName: props.firstName || "",
        lastName: props.lastName || "",
        gender: props.gender || "",
        dateOfBirth: props.dateOfBirth || new Date(),
        mobileNumber: props.mobileNumber || "",
        email: props.email || ""
      };
    }
  }

  getValidatorData = () => (this.state)

  handleChange = (field) => (event) => {
    let date;
    if (field === "dateOfBirth") {
      date = event.toDate();
    }
    this.setState({
      [field]: date || event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.validate((error) => {
      if (!error) {
        this.props.saveVehicleOwnerDetails({
          ..._.pick(
            this.state,
            "firstName",
            "lastName",
            "gender",
            "dateOfBirth",
            "mobileNumber",
            "email"
          ),
          cartId: this.props.match.params.id
        });
        this.props.handleCartIndex(1);
      }
    });
  }

  render() {
    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      mobileNumber,
      email
    } = this.state;

    return (
      <div className="gis-vehicle-owner">
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <Paper className="form-container">
              <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="First Name"
                      value={firstName}
                      onChange={this.handleChange("firstName")}
                      onBlur={this.props.handleValidation("firstName")}
                      margin="normal"
                      fullWidth
                      required
                      error={!this.props.isValid("firstName")}
                      helperText={this.props.getValidationMessages("firstName")[0]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Last Name"
                      value={lastName}
                      onChange={this.handleChange("lastName")}
                      onBlur={this.props.handleValidation("lastName")}
                      margin="normal"
                      fullWidth
                      required
                      error={!this.props.isValid("lastName")}
                      helperText={this.props.getValidationMessages("lastName")[0]}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={16} alignItems="flex-end">
                  <Grid item xs={12} sm={12} md={6}>
                    <FormControl
                      error={!this.props.isValid("gender")}
                      fullWidth
                      margin="normal">
                      <FormLabel>Gender</FormLabel>
                      <RadioGroup row
                        value={gender}
                        onChange={this.handleChange("gender")}>
                        <FormControlLabel value="MALE" control={<Radio color="primary" />} label="Male" />
                        <FormControlLabel value="FEMALE" control={<Radio color="primary" />} label="Female" />
                        <FormControlLabel value="OTHER" control={<Radio color="primary" />} label="Other" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                        fullWidth
                        label="Date of Birth"
                        value={dateOfBirth}
                        disableFuture
                        openTo="year"
                        views={["year", "month", "day"]}
                        format="MM/DD/YYYY"
                        onChange={this.handleChange("dateOfBirth")}
                        onBlur={this.props.handleValidation("dateOfBirth")}
                        error={!this.props.isValid("dateOfBirth")}
                        helperText={this.props.getValidationMessages("dateOfBirth")} />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
                <TextField
                  label="E-Mail"
                  value={email}
                  type="email"
                  onChange={this.handleChange("email")}
                  onBlur={this.props.handleValidation("email")}
                  margin="normal"
                  fullWidth
                  required
                  error={!this.props.isValid("email")}
                  helperText={this.props.getValidationMessages("email")[0]}
                />
                <TextField
                  label="Mobile Number"
                  value={mobileNumber}
                  onChange={this.handleChange("mobileNumber")}
                  onBlur={this.props.handleValidation("mobileNumber")}
                  margin="normal"
                  fullWidth
                  required
                  error={!this.props.isValid("mobileNumber")}
                  helperText={this.props.getValidationMessages("mobileNumber")[0]}
                />
                <Grid container justify="flex-end">
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
)(Validation(Strategy)(VehicleOwner)));
