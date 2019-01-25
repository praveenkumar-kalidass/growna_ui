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
  Image,
  Inbox,
  KeyboardArrowDown
} from "@material-ui/icons";
import {withRouter} from "react-router-dom";
import _ from "underscore";
import Routes from "../../../../Utils/Routes";
import "./style.scss";

const mapStateToProps = (state) => ({
  privileges: state.user.privileges
});

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privileges: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      privileges: _.map(nextProps.privileges, (privilege) => (
        Routes[privilege.description]
      ))
    });
  }

  handleChange = (path) => {
    this.props.history.push(path);
  }

  render() {
    const {privileges} = this.state;
    const {location} = this.props;

    return (
      <div className="gis-app-menu">
        <List component="nav">
          <ListItem>
            <ListItemText primary="Growna" />
          </ListItem>
          <ListItem className="menu-user-content">
            <Avatar className="user-picture">
              <Image />
            </Avatar>
            <ListItemText primary="Demo Admin" secondary="Administrator" />
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
