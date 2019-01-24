import React, {Component} from "react";
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
import _ from "underscore";
import "./style.scss";

class Menu extends Component {
  render() {
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
          {
            _.times(6, (index) => (
              <ListItem key={index} button>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary={`Menu-Item-${index}`} />
                <ListItemSecondaryAction>
                  <KeyboardArrowDown />
                </ListItemSecondaryAction>
              </ListItem>
            ))
          }
        </List>
      </div>
    );
  }
}

export default Menu;
