import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Avatar,
  CircularProgress,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import {
  AccountBalance,
  BusinessCenter,
  ExpandLess,
  ExpandMore,
  Fingerprint,
  Home,
  Inbox,
  KeyboardArrowDown,
  Money,
  Person
} from "@material-ui/icons";
import Cookies from "universal-cookie";
import {withRouter} from "react-router-dom";
import _ from "underscore";
import {
  getPrivileges,
  getUserDetails
} from "../../../../Actions/User";
import Routes from "../../../../Utils/Routes";
import GifLoader from "../../../../Assets/loader.gif";
import Config from "../../../../../config/config";
import "./style.scss";

const environment = process.env.NODE_ENV || "development";

const mapStateToProps = (state) => ({
  loading: !!state.user.loading,
  privileges: state.user.privileges,
  user: state.user.user,
  role: state.user.role,
  image: state.user.image
});

const mapDispatchToProps = (dispatch) => ({
  getPrivileges: (roleId, type) => { dispatch(getPrivileges(roleId, type)) },
  getUserDetails: (userId) => { dispatch(getUserDetails(userId)) }
});

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      privileges: [],
      user: {},
      role: {},
      image: {},
      categories: [{
        name: "Tenant",
        label: "Tenants",
        path: Routes.ADD_TENANT.path,
        icon: AccountBalance
      }, {
        name: "Company",
        label: "Companies",
        path: Routes.COMPANY_LIST.path,
        icon: BusinessCenter
      }, {
        name: "Role",
        label: "Roles",
        path: Routes.ROLE_LIST.path,
        icon: Fingerprint
      }, {
        name: "User",
        label: "Users",
        path: Routes.USER_LIST.path,
        icon: Person
      }, {
        name: "Insurance",
        label: "Insurances",
        path: Routes.BIKE_INSURANCE.path,
        icon: Money
      }],
      categoryIndex: ""
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const gis = cookies.get("gis");
    this.props.getUserDetails(gis.userId);
    this.props.getPrivileges(gis.roleId, "VIEW");
  }

  static getDerivedStateFromProps(props, state) {
    const privileges = _.groupBy(_.map(props.privileges, (privilege) => (
      Routes[privilege.description]
    )), "category");
    return {
      loading: props.location.pathname === Routes.USER_PROFILE.path ?
        false : props.loading,
      privileges: _.compact(_.map(state.categories, (category) => {
        if (privileges[category.name]) {
          category.routes = privileges[category.name];
          return category;
        }
        return null;
      })),
      user: props.user,
      role: props.role,
      image: props.image
    };
  }

  handleChange = (path) => {
    this.props.history.push(path);
  }

  handleIndex = (category, path) => {
    if (this.state.categoryIndex === category) {
      category = "";
    } else {
      this.handleChange(path);
    }
    this.setState({
      categoryIndex: category
    });
  }

  render() {
    const {
      loading,
      privileges,
      user,
      role,
      image,
      categoryIndex
    } = this.state;
    const {location} = this.props;

    return (
      <div className="gis-app-menu">
        <List component="nav" disablePadding>
          <ListItem className="app-name-container">
            <ListItemText className="app-name" primary="No.1 Insurance" />
          </ListItem>
          {
            loading ?
            <ListItem className="menu-user-content">
              <Grid container justify="center">
                <CircularProgress size={20} />
              </Grid>
            </ListItem> :
            <ListItem className="menu-user-content">
              <ListItemAvatar>
                {
                  loading ?
                  <Avatar className="user-image" src={GifLoader} /> :
                  <Avatar
                    src={`${Config[environment].service}${image.path}?${new Date().getTime()}`}></Avatar>
                }
              </ListItemAvatar>
              <ListItemText className="user-name"
                primary={`${user.firstName} ${user.lastName}`}
                secondary={role.name} />
            </ListItem>
          }
          <ListItem className="menu-item"
            selected={location.pathname === Routes.APP.path}
            onClick={(event) => this.handleChange(Routes.APP.path)}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        {
          loading ?
          <List component="nav" disablePadding>
            <ListItem>
              <Grid container justify="center">
                <CircularProgress size={30} />
              </Grid>
            </ListItem>
          </List> :
          _.map(privileges, (privilege, index) => (
            <List key={index} component="nav" disablePadding>
              <ListItem className="menu-item"
                onClick={(event) => this.handleIndex(privilege.name, privilege.path)}>
                <ListItemIcon>
                  <privilege.icon />
                </ListItemIcon>
                <ListItemText primary={privilege.label} />
                {
                  categoryIndex === privilege.name
                    ? <ExpandLess />
                    : <ExpandMore />
                }
              </ListItem>
              {
                _.map(privilege.routes, (route, routeIndex) => (
                  <Collapse key={routeIndex}
                    in={categoryIndex === privilege.name}>
                    <ListItem className="menu-item collapse-item"
                      selected={location.pathname === route.path}
                      onClick={(event) => this.handleChange(route.path)}>
                      <ListItemIcon>
                        <route.icon />
                      </ListItemIcon>
                      <ListItemText primary={route.name} />
                    </ListItem>
                  </Collapse>
                ))
              }
            </List>
          ))
        }
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
