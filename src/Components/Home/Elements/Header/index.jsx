import React, {Component} from "react";
import {AppBar, Button, Grid, Toolbar} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import GisLogo from "../../Assets/gis-logo.png";
import "./style.scss";

class Header extends Component {
  render() {
    return (
      <AppBar className="gis-home-header" position="fixed">
        <Toolbar className="home-toolbar" variant="dense">
          <Grid container justify="space-around" alignItems="center">
            <Grid item>
              <img src={GisLogo} className="gis-logo" />
            </Grid>
            <Grid item>
              <Grid container justify="flex-end" spacing={16}>
                <NavLink to="/" className="home-link">
                  <Button className="home-link-button">
                    Clients
                  </Button>
                </NavLink>
                <NavLink to="/" className="home-link">
                  <Button className="home-link-button">
                    Insurance
                  </Button>
                </NavLink>
                <NavLink to="/" className="home-link">
                  <Button className="home-link-button">
                    Contact Us
                  </Button>
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
