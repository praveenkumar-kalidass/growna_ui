import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import {
  AccountBalance,
  ExpandLess,
  ExpandMore,
  Fingerprint,
  Home,
  Inbox,
  KeyboardArrowDown,
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
import DemoAdmin from "../../../../Assets/demo-admin.jpg";
import DemoUser from "../../../../Assets/demo-user.png";
import "./style.scss";

const mapStateToProps = (state) => ({
  privileges: state.user.privileges,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => ({
  getPrivileges: (roleId) => { dispatch(getPrivileges(roleId)) },
  getUserDetails: (userId) => { dispatch(getUserDetails(userId)) }
});

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privileges: [],
      role: "",
      user: {},
      categories: [{
        name: "Tenant",
        label: "Tenants",
        path: Routes.ADD_TENANT.path,
        icon: AccountBalance
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
      }],
      categoryIndex: ""
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const gis = cookies.get("gis");
    this.props.getUserDetails(gis.userId);
    this.props.getPrivileges(gis.roleId);
    this.setState({
      role: gis.role
    });
  }

  componentWillReceiveProps(nextProps) {
    const privileges = _.groupBy(_.map(nextProps.privileges, (privilege) => (
      Routes[privilege.description]
    )), "category");
    this.setState({
      privileges: _.compact(_.map(this.state.categories, (category) => {
        if (privileges[category.name]) {
          category.routes = privileges[category.name];
          return category;
        }
        return null;
      })),
      user: nextProps.user
    });
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
      privileges,
      role,
      user,
      categoryIndex
    } = this.state;
    const {location} = this.props;

    return (
      <div className="gis-app-menu">
        <List component="nav" disablePadding>
          <ListItem className="app-name-container">
            <ListItemText className="app-name" primary="Growna Insurance" />
          </ListItem>
          <ListItem className="menu-user-content">
            <Avatar className="user-picture"
              src={role === "GIS_ADMIN" ? DemoAdmin : DemoUser} />
            <ListItemText className="user-name"
              primary={`${user.firstName} ${user.lastName}`}
              secondary={role} />
          </ListItem>
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
