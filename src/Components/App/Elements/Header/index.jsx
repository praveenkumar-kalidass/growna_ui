import React, {Component} from "react";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  PowerSettingsNew
} from "@material-ui/icons";
import {withRouter} from "react-router-dom";
import Cookies from "universal-cookie";
import "./style.scss";

class Header extends Component {
  logout = () => {
    const cookies = new Cookies();
    cookies.set("gis", {});
    this.props.history.push("/login");
  }

  render() {
    return (
      <AppBar className="gis-app-header" position="sticky">
        <Toolbar variant="dense">
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" color="inherit">
                GIS
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton color="inherit" onClick={this.logout}>
              <PowerSettingsNew />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(Header);
