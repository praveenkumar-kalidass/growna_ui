import React, {Component} from "react";
import {
  AppBar,
  Avatar,
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  Edit,
  ExpandMore
} from "@material-ui/icons";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import _ from "underscore";
import Routes from "../../Utils/Routes";
import {
  getCompanyList,
  getCompanies
} from "../../Actions/Tenant";
import PlanDialog from "./Elements/PlanDialog";
import Config from "../../../config/config";
import "./style.scss";

const environment = process.env.NODE_ENV || "development";

const mapStateToProps = (state) => ({
  loading: !!state.tenant.loading,
  companyList: state.tenant.companyList,
  companyPlans: state.tenant.companyPlans,
});

const mapDispatchToProps = (dispatch) => ({
  getCompanyList: () => { dispatch(getCompanyList()) },
  getCompanies: (name, callback) => { dispatch(getCompanies(name, callback)) }
});

class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      companyList: [],
      companyIndex: "",
      companyLoading: false,
      companyPlans: [],
      openPlan: false,
      editPlan: {}
    };
  }

  componentDidMount() {
    this.props.getCompanyList();
  }

  static getDerivedStateFromProps(props) {
    return {
      loading: props.loading,
      companyList: props.companyList,
      companyPlans: props.companyPlans
    };
  }

  loadCompanyPlans = (name) => () => {
    this.props.getCompanies(name, () => {
      this.setState({
        companyLoading: false
      });
    });
    this.setState({
      companyLoading: true,
      companyIndex: name
    });
  }

  openPlanDialog = (editPlan) => {
    this.setState({
      editPlan,
      openPlan: true
    });
  }

  closePlanDialog = (reload) => {
    if (reload) {
      this.setState({
        companyPlans: []
      });
    }
    this.setState({
      editPlan: {},
      openPlan: false
    });
  }

  render() {
    const {
      loading,
      companyList,
      companyIndex,
      companyPlans,
      openPlan,
      editPlan
    } = this.state;

    return (
      <div className="gis-company-list">
        <Paper className="header-container">
          <Grid container justify="space-between" alignItems="center">
            <Typography className="page-header" variant="h4" gutterBottom>
              Company List
            </Typography>
          </Grid>
        </Paper>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              Companies
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={16}
          className="company-list-container">
          <Grid item>
            <List component="nav" className="company-list">
              <ListItem>
                <Button variant="contained" color="primary" fullWidth
                  onClick={this.openPlanDialog}>
                  Add Plan
                </Button>
              </ListItem>
              {
                _.map(companyList, (company, index) => (
                  <ListItem key={index} button divider
                    className="list-item"
                    selected={companyIndex === company.name}
                    onClick={this.loadCompanyPlans(company.name)}>
                    <ListItemText primary={company.name}></ListItemText>
                  </ListItem>
                ))
              }
            </List>
          </Grid>
          <Grid item xs sm md>
            {
              _.map(companyPlans, (plan) => (
                <ExpansionPanel key={plan.id}>
                  <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Grid container spacing={16}>
                      <Grid item>
                        <Avatar src={`${Config[environment].service}${plan.companyImage.path}`} />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2">
                          {plan.name}
                        </Typography>
                        <Typography variant="caption">
                          Type: {plan.type}
                        </Typography>
                      </Grid>
                      <Grid item xs sm md>
                        <Button color="primary"
                          onClick={() => this.openPlanDialog(plan)}>
                          Edit
                        </Button>
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography variant="subtitle2">
                      IDV: {plan.insuredDeclaredValue * 100}% of Standard IDV
                    </Typography>
                    <Typography variant="subtitle2">
                      Discount: {plan.discount * 100}%
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))
            }
          </Grid>
        </Grid>
        {
          openPlan &&
          <PlanDialog
            plan={editPlan}
            open={openPlan}
            handleClose={this.closePlanDialog} />
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyList);
