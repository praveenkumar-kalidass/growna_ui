import React, {Component} from "react";
import {
  AppBar,
  Avatar,
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  ExpandMore
} from "@material-ui/icons";
import {connect} from "react-redux";
import _ from "underscore";
import {getQuotationAndPlans} from "../../Actions/Insurance";

const mapStateToProps = (state) => ({
  loading: state.insurance.loading,
  quotation: state.insurance.quotation,
  plans: state.insurance.plans
});

const mapDispatchToProps = (dispatch) => ({
  getQuotationAndPlans: (id) => { dispatch(getQuotationAndPlans(id)) }
});

class Quotation extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const {
      loading,
      quotation,
      plans,
      expandIndex
    } = this.state;

    return (
      <div className="gis-quotation">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6" color="inherit">
                  Plans
                </Typography>
              </Grid>
              <Grid item>
                {
                  quotation.id &&
                  <Typography variant="caption" color="inherit">
                    {`${quotation.brand}, ${quotation.model}, ${quotation.variant}`}
                  </Typography>
                }
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {
          _.map(plans, (plan, index) => (
            <ExpansionPanel key={index}
              expanded={expandIndex === plan.id}
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
                        <Button variant="outlined" color="primary">
                          {`${plan.oneYearPremium} INR`}
                        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Quotation);
