import React, {Component} from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import "./style.scss";

class Header extends Component {
  render() {
    return (
      <AppBar className="gis-app-header" position="sticky">
        <Toolbar variant="dense">
          <IconButton color="inherit">
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit">
            GIS
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
