import React, {Component} from "react";
import {connect} from "react-redux";
import {
  AppBar,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  Menu,
  PowerSettingsNew
} from "@material-ui/icons";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import Cookies from "universal-cookie";
import {logout} from "../../../../Actions/User";
import "./style.scss";

const mapStateToProps = (state) => ({
  logout: state.user.logout
});

const mapDispatchToProps = (dispatch) => ({
  logout: (accessToken) => { dispatch(logout(accessToken)) }
});

class Header extends Component {
  static propTypes = {
    toggleMenu: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const cookies = new Cookies();
    if (nextProps.logout) {
      this.props.history.push("/login");
    }
  }

  logout = () => {
    const cookies = new Cookies();
    const gis = cookies.get("gis");
    const data = {
      refreshToken: gis.refreshToken,
      user: {
        id: gis.userId
      },
      client: {
        id: "11814a7e-53fd-49db-b9e5-69a4370b5827"
      }
    };
    this.props.logout({data});
    cookies.remove("gis");
  }

  render() {
    return (
      <AppBar className="gis-app-header" position="sticky">
        <Toolbar variant="dense">
          <Grid container justify="space-between">
            <Grid item>
              <Hidden mdUp>
                <IconButton color="inherit" onClick={this.props.toggleMenu}>
                  <Menu />
                </IconButton>
              </Hidden>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
