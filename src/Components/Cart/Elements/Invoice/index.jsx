import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Button,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import Cookies from "universal-cookie";
import {saveInvoice} from "../../../../Actions/Insurance";
import "./style.scss";

const mapStateToProps = (state) => ({
  vehicleOwner: state.insurance.vehicleOwner,
  address: state.insurance.address,
  vehicle: state.insurance.vehicle,
  pastPolicy: state.insurance.pastPolicy,
  plan: state.insurance.plan
});

const mapDispatchToProps = (dispatch) => ({
  saveInvoice: (data, callback) => { dispatch(saveInvoice(data, callback)) }
});

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleOwner: props.vehicleOwner,
      address: props.address,
      vehicle: props.vehicle,
      pastPolicy: props.pastPolicy,
      plan: props.plan
    };
  }

  handleSubmit = () => {
    const cookies = new Cookies();
    const gis = cookies.get("gis");
    this.props.saveInvoice({
      amount: this.state.plan.oneYearPremium,
      cartId: this.props.match.params.id,
      userId: gis.userId,
      tenantId: gis.tenantId
    }, () => {
      window.alert('Redirect to Payment')
    });
  }

  render() {
    const {
      vehicleOwner,
      address,
      vehicle,
      pastPolicy,
      plan
    } = this.state;

    return (
      <div className="gis-invoice">
        <Paper className="invoice-details">
          <Grid container>
            <Grid item xs={12} sm={6} md={3}
              className="invoice-detail-container">
              <Typography variant="subtitle2" gutterBottom>
                {`${vehicleOwner.firstName} ${vehicleOwner.lastName}`}
              </Typography>
              <Typography variant="caption">Contact:</Typography>
              <Typography variant="subtitle2">
                {vehicleOwner.email}
              </Typography>
              <Typography variant="subtitle2">
                {vehicleOwner.mobileNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}
              className="invoice-detail-container">
              <Typography variant="caption">Address:</Typography>
              <Typography variant="subtitle2" gutterBottom>
                {`${address.houseNumber}, ${address.address}`}
              </Typography>
              <Typography variant="subtitle2">
                {address.pincode}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}
              className="invoice-detail-container">
              <Typography variant="caption">Vehicle Number:</Typography>
              <Typography variant="subtitle2">
                {vehicle.vehicleNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}
              className="invoice-detail-container">
              <Typography variant="caption">Past Policy:</Typography>
              <Typography variant="subtitle2">
                {pastPolicy.policyNumber}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper className="payment-details">
          <Grid container direction="column" alignItems="flex-end">
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Payable Amount: &#8377;{plan.oneYearPremium}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary"
                onClick={this.handleSubmit}>
                Proceed to Pay
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice));
