import React, {Component} from "react";
import {
  Button,
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
import {saveAddress} from "../../../../Actions/Insurance";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.insurance.loading,
  houseNumber: state.insurance.address.houseNumber,
  address: state.insurance.address.address,
  pincode: state.insurance.address.pincode
});

const mapDispatchToProps = (dispatch) => ({
  saveAddress: (data) => { dispatch(saveAddress(data)) }
});

class CommunicationAddress extends Component {
  static propTypes = {
    handleCartIndex: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.validatorTypes = {
      houseNumber: Schema.houseNumber,
      address: Schema.address,
      pincode: Schema.pincode
    };
    this.state = {
      houseNumber: props.houseNumber || "",
      address: props.address || "",
      pincode: props.pincode || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading) {
      this.setState({
        houseNumber: nextProps.houseNumber || "",
        address: nextProps.address || "",
        pincode: nextProps.pincode || ""
      });
    }
  }

  getValidatorData = () => (this.state)

  handleChange = (field) => (event) => {
    this.setState({
      [field]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.validate((error) => {
      if (!error) {
        this.props.saveAddress({
          ..._.pick(this.state, "houseNumber", "address", "pincode"),
          cartId: this.props.match.params.id
        });
        this.props.handleCartIndex(2);
      }
    });
  }

  render() {
    const {
      houseNumber,
      address,
      pincode
    } = this.state;

    return (
      <div className="gis-communication-address">
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <Paper className="form-container">
              <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={3} md={3}>
                    <TextField
                      label="House number"
                      value={houseNumber}
                      onChange={this.handleChange("houseNumber")}
                      onBlur={this.props.handleValidation("houseNumber")}
                      margin="normal"
                      fullWidth
                      required
                      error={!this.props.isValid("houseNumber")}
                      helperText={this.props.getValidationMessages("houseNumber")[0]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} md={9}>
                    <TextField
                      label="Address"
                      value={address}
                      onChange={this.handleChange("address")}
                      onBlur={this.props.handleValidation("address")}
                      margin="normal"
                      fullWidth
                      required
                      error={!this.props.isValid("address")}
                      helperText={this.props.getValidationMessages("address")[0]}
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="Pincode"
                  value={pincode}
                  onChange={this.handleChange("pincode")}
                  onBlur={this.props.handleValidation("pincode")}
                  margin="normal"
                  fullWidth
                  required
                  error={!this.props.isValid("pincode")}
                  helperText={this.props.getValidationMessages("pincode")[0]}
                />
                <Grid container justify="flex-end" spacing={16}>
                  <Grid item>
                    <Button variant="contained" color="primary"
                      onClick={() => this.props.handleCartIndex(0)}>
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
)((Validation(Strategy))(CommunicationAddress)));
