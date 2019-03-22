import React, {Component} from "react";
import {
  AppBar,
  Avatar,
  Button,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  Create,
  ExpandMore
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
import "./style.scss";

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
      loading: false,
      quotation: {},
      plans: [],
      expandIndex: ""
    };
  }

  componentDidMount() {
    this.props.getQuotationAndPlans(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      quotation: nextProps.quotation,
      plans: nextProps.plans
    });
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

  render() {
    const {
      addCart,
      loading,
      quotation,
      plans,
      expandIndex
    } = this.state;

    return (
      <div className="gis-quotation">
        <Paper className="quotation-head-container">
          <Typography className="page-header" variant="h4" gutterBottom>
            Quotation
          </Typography>
          <Grid container alignItems="center">
            {
              quotation.id &&
              <Grid item>
                <Typography variant="subtitle1" color="inherit" inline
                  className="bike-label">
                  {`(${quotation.vehicleYear}) ${quotation.brand} | ${quotation.model} | ${quotation.variant}`}
                </Typography>
                <IconButton color="primary"><Create /></IconButton>
              </Grid>
            }
          </Grid>
        </Paper>
        {
          !loading &&
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Plans
              </Typography>
            </Toolbar>
          </AppBar>
        }
        {
          loading ?
          <Grid container justify="center">
            <Grid item>
              <CircularProgress size={40} />
            </Grid>
          </Grid> :
          _.map(plans, (plan, index) => (
            <ExpansionPanel key={index}
              expanded={expandIndex === plan.id && !addCart}
              onChange={this.handleExpandIndex(plan.id)}>
              <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <Grid container justify="space-between">
                  <Grid item>
                    <Grid container alignItems="center" spacing={16}>
                      <Grid item>
                        <Avatar alt={plan.name}
                          src={`http://localhost:3000${plan.companyImage.path}`} />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">
                          {plan.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={40}>
                      <Grid item>
                        <Button variant="outlined" color="primary">
                          {`${plan.discount}% OFF`}
                        </Button>
                      </Grid>
                      <Grid item>
                        {
                          addCart && (expandIndex === plan.id) ?
                          <Button variant="outlined" color="primary">
                            <CircularProgress size={24} />
                          </Button> :
                          <Button variant="outlined" color="primary"
                            onClick={this.addToCart(plan)}>
                            {`${plan.oneYearPremium} INR`}
                          </Button>
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>IDV</TableCell>
                      <TableCell>{`${plan.insuredDeclaredValue} INR`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Third Party Premium</TableCell>
                      <TableCell>{`${plan.thirdPartyPremium} INR`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Own Damage Premium</TableCell>
                      <TableCell>{`${plan.ownDamagePremium} INR`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Premium Amount</TableCell>
                      <TableCell>{`${plan.premiumAmount} INR`}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>GST</TableCell>
                      <TableCell>{`${plan.gst} INR`}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))
        }
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Quotation));
