import React, {Component} from "react";
import {
  Avatar,
  Breadcrumbs,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography
} from "@material-ui/core";
import {
  Edit
} from "@material-ui/icons";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Routes from "../../Utils/Routes";
import {getCartDetails} from "../../Actions/Insurance";
import VehicleOwner from "./Elements/VehicleOwner";
import CommunicationAddress from "./Elements/CommunicationAddress";
import VehicleDetail from "./Elements/VehicleDetail";
import PastPolicy from "./Elements/PastPolicy";
import Invoice from "./Elements/Invoice";
import Config from "../../../config/config";
import "./style.scss";

const environment = process.env.NODE_ENV || "development";

const mapStateToProps = (state) => ({
  loading: state.insurance.loading,
  cart: state.insurance.cart,
  quotation: state.insurance.quotation,
  company: state.insurance.company,
  plan: state.insurance.plan
});

const mapDispatchToProps = (dispatch) => ({
  getCartDetails: (id) => { dispatch(getCartDetails(id)) }
});

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      cartIndex: 0,
      cart: {},
      quotation: {},
      company: {},
      plan: {}
    };
  }

  componentDidMount() {
    this.props.getCartDetails(this.props.match.params.id);
  }

  static getDerivedStateFromProps(props) {
    return {
      loading: props.loading,
      cart: props.cart,
      quotation: props.quotation,
      company: props.company,
      plan: props.plan
    };
  }

  handleCartIndex = (cartIndex) => {
    this.setState({cartIndex});
  }

  render() {
    const {
      loading,
      cartIndex,
      cart,
      quotation,
      company,
      plan
    } = this.state;

    return (
      <div className="gis-cart">
        <Paper className="quotation-container">
          {
            loading ?
            <Grid container justify="center">
              <Grid item>
                <CircularProgress />
              </Grid>
            </Grid> :
            <Grid container justify="space-around" spacing={10} className="quotation-details-container">
              <Grid item xs={12} sm={6} md={4} className="quotation-details">
                <Grid container alignItems="center" spacing={4}>
                  <Grid item>
                    {
                      company.companyImage &&
                      <Avatar
                        className="company-image"
                        src={`${Config[environment].service}${company.companyImage.path}`} />
                    }
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {company.name}
                      <IconButton color="primary" component={Link}
                        to={Routes.QUOTATION.path.replace(":id", cart.quotationId)}>
                        <Edit />
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className="quotation-details">
                <Typography variant="caption">Vehicle:</Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {`${quotation.brand} | ${quotation.model} |
                    ${quotation.variant} | ${quotation.engineCc} CC`}
                </Typography>
                <Typography variant="caption">Registered Year:</Typography>
                <Typography variant="subtitle2">
                  {quotation.vehicleYear}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className="quotation-details">
                <Typography variant="caption">GST:</Typography>
                <Typography variant="subtitle2" gutterBottom>
                  &#8377;{plan.gst}
                </Typography>
                <Typography variant="caption">One year Premium:</Typography>
                <Typography variant="subtitle2">
                  &#8377; {plan.oneYearPremium}
                </Typography>
              </Grid>
            </Grid>
          }
        </Paper>
        <Paper className="form-container">
          <Breadcrumbs className="form-breadcrumbs">
            <Typography variant="caption"
              color={cartIndex === 0 ? "primary" : "textPrimary"}>
              Vehicle Owner Details
            </Typography>
            <Typography variant="caption"
              color={cartIndex === 1 ? "primary" : "textPrimary"}>
              Communication Address
            </Typography>
            <Typography variant="caption"
              color={cartIndex === 2 ? "primary" : "textPrimary"}>
              Vehicle Details
            </Typography>
            <Typography variant="caption"
              color={cartIndex === 3 ? "primary" : "textPrimary"}>
              Past Policy Details
            </Typography>
            <Typography variant="caption"
              color={cartIndex === 4 ? "primary" : "textPrimary"}>
              Invoice
            </Typography>
          </Breadcrumbs>
          {
            !loading && cartIndex === 0 &&
            <VehicleOwner handleCartIndex={this.handleCartIndex} />
          }
          {
            !loading && cartIndex === 1 &&
            <CommunicationAddress handleCartIndex={this.handleCartIndex} />
          }
          {
            !loading && cartIndex === 2 &&
            <VehicleDetail handleCartIndex={this.handleCartIndex} />
          }
          {
            !loading && cartIndex === 3 &&
            <PastPolicy
              type={cart.type}
              handleCartIndex={this.handleCartIndex} />
          }
          {
            !loading && cartIndex === 4 &&
            <Invoice />
          }
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
