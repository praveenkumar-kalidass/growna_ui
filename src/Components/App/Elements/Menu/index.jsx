import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from "@material-ui/core";
import {
  Inbox,
  KeyboardArrowDown
} from "@material-ui/icons";
import Cookies from "universal-cookie";
import {withRouter} from "react-router-dom";
import _ from "underscore";
import Routes from "../../../../Utils/Routes";
import DemoAdmin from "../../../../Assets/demo-admin.jpg";
import DemoUser from "../../../../Assets/demo-user.png";
import "./style.scss";

const mapStateToProps = (state) => ({
  privileges: state.user.privileges,
  user: state.user.user
});

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privileges: [],
      role: "",
      user: {}
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    this.setState({
      role: cookies.get("gis").role
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      privileges: _.map(nextProps.privileges, (privilege) => (
        Routes[privilege.description]
      )),
      user: nextProps.user
    });
  }

  handleChange = (path) => {
    this.props.history.push(path);
  }

  render() {
    const {
      privileges,
      role,
      user
    } = this.state;
    const {location} = this.props;
    const roleName = {
      GIS_ADMIN: "Administrator",
      GIS_USER: "User"
    };

    return (
      <div className="gis-app-menu">
        <List component="nav">
          <ListItem>
            <ListItemText className="app-name" primary="Growna Insurance" />
          </ListItem>
          <ListItem className="menu-user-content">
            <Avatar className="user-picture"
              src={role === "GIS_ADMIN" ? DemoAdmin : DemoUser} />
            <ListItemText className="user-name"
              primary={`${user.firstName} ${user.lastName}`}
              secondary={roleName[role]} />
          </ListItem>
          <ListItem className="menu-item"
            selected={location.pathname === Routes.APP}
            onClick={(event) => this.handleChange(Routes.APP)}>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          {
            _.map(privileges, (privilege, index) => (
              <ListItem key={index} className="menu-item"
                selected={location.pathname === privilege.path}
                onClick={(event) => this.handleChange(privilege.path)}>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary={privilege.name} />
              </ListItem>
            ))
          }
        </List>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Menu));
