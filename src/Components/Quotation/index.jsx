import React, {Component} from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Collapse,
  Fab,
  Grid,
  IconButton,
  Paper,
  Typography
} from "@material-ui/core";
import {
  Create,
  ExpandMore,
  ShoppingCart
} from "@material-ui/icons";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import _ from "underscore";
import Cookies from "universal-cookie";
import Routes from "../../Utils/Routes";
import {
  getQuotationAndPlans,
  saveCart
} from "../../Actions/Insurance";
import IDVForm from "./Elements/IDVForm";
import Config from "../../../config/config";
import "./style.scss";

const environment = process.env.NODE_ENV || "development";

const mapStateToProps = (state) => ({
  loading: state.insurance.loading,
  quotation: state.insurance.quotation,
  plans: state.insurance.plans
});

const mapDispatchToProps = (dispatch) => ({
  getQuotationAndPlans: (id) => { dispatch(getQuotationAndPlans(id)) },
  saveCart: (data, callback) => { dispatch(saveCart(data, callback)) }
});

class Quotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCart: false,
      loading: true,
      quotation: {},
      plans: [],
      expandIndex: "",
      changeIDV: false
    };
  }

  componentDidMount() {
    this.props.getQuotationAndPlans(this.props.match.params.id);
  }

  static getDerivedStateFromProps(props) {
    return {
      loading: props.loading,
      quotation: props.quotation,
      plans: props.plans
    };
  }

  handleExpandIndex = (expandIndex) => () => {
    this.setState({expandIndex});
  }

  addToCart = (plan) => () => {
    const cookies = new Cookies();
    const gis = cookies.get("gis");
    this.setState({
      addCart: true
    });
    this.props.saveCart({
      type: plan.type,
      status: "QUOTE",
      userId: gis.userId,
      tenantId: gis.tenantId,
      quotationId: this.state.quotation.id,
      companyId: plan.id
    }, (cart) => {
      this.props.history.push(Routes.CART.path.replace(":id", cart.id));
    });
  }

  handleDialog = (dialog, open) => () => {
    this.setState({
      [dialog]: open
    });
  }

  render() {
    const {
      addCart,
      loading,
      quotation,
      plans,
      expandIndex,
      changeIDV
    } = this.state;

    return (
      <div className="gis-quotation">
        <Paper className="quotation-head-container">
          <Typography className="page-header" variant="h4" gutterBottom>
            Quotation
          </Typography>
          <Grid container justify="space-between" alignItems="center">
            {
              quotation.id &&
              <Grid item>
                <Typography variant="subtitle1" color="inherit" inline>
                  {`(${quotation.vehicleYear}) ${quotation.brand} |
                    ${quotation.model} | ${quotation.variant} |
                    ${quotation.engineCc} CC`}
                </Typography>
                <IconButton color="primary"><Create /></IconButton>
              </Grid>
            }
            {
              !!quotation.insuredDeclaredValue ?
              <Grid item>
                <Typography variant="subtitle1" color="inherit" inline>
                  IDV: &#8377; {quotation.insuredDeclaredValue}
                </Typography>
                <IconButton color="primary"
                  onClick={this.handleDialog("changeIDV", true)}>
                  <Create />
                </IconButton>
              </Grid> :
              <Grid item>
                <Button color="primary"
                  onClick={this.handleDialog("changeIDV", true)}>
                  Set Custom IDV
                </Button>
              </Grid>
            }
          </Grid>
        </Paper>
        <Grid container justify="center" spacing={16}>
          {
            loading ?
            <Grid item>
              <CircularProgress size={40} />
            </Grid> :
            _.map(plans, (plan, index) => (
              <Grid item key={plan.id} xs={12} sm={6} md={4}>
                <Card className="quotation-plan-card">
                  <CardMedia
                    className="plan-image"
                    image={`${Config[environment].service}${plan.companyImage.path}`}
                    title={plan.name} />
                  <Fab size="small" variant="extended" color="primary"
                    className="discount-button">
                    {plan.discount.toFixed(2)}% OFF
                  </Fab>
                  <CardContent className="card-content">
                    <Fab size="small" color="primary" className="cart-button">
                      <ShoppingCart onClick={this.addToCart(plan)} />
                    </Fab>
                    <Typography gutterBottom variant="h5">
                      {plan.name}
                    </Typography>
                    <Typography variant="body2">
                      IDV : &#8377;{plan.insuredDeclaredValue}
                    </Typography>
                  </CardContent>
                  <Collapse in={expandIndex === index}
                    timeout="auto"
                    unmountOnExit>
                    <CardContent>
                      <Typography variant="body2">
                        Third party premium : &#8377;{plan.thirdPartyPremium}
                      </Typography>
                      <Typography variant="body2">
                        Premium Amount : &#8377;{plan.premiumAmount}
                      </Typography>
                      <Typography variant="body2">
                        GST : &#8377;{plan.gst}
                      </Typography>
                    </CardContent>
                  </Collapse>
                  <CardActions>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Typography variant="h6">
                          &#8377; {plan.oneYearPremium}
                        </Typography>
                      </Grid>
                      <Grid item>
                        {
                          expandIndex === index ?
                          <Button variant="outlined" color="primary"
                            onClick={this.handleExpandIndex("")}>
                            Hide Detail
                          </Button> :
                          <Button variant="outlined" color="primary"
                            onClick={this.handleExpandIndex(index)}>
                            See Detail
                          </Button>
                        }
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }
        </Grid>
        {
          changeIDV &&
          <IDVForm
            open={changeIDV}
            idv={quotation.insuredDeclaredValue}
            standardIdv={quotation.standardIdv}
            handleDialog={this.handleDialog}
            quotationId={quotation.id} />
        }
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Quotation));
