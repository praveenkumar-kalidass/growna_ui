import React, {Component} from "react";
import {connect} from "react-redux";
import {
  AppBar,
  Avatar,
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  PowerSettingsNew
} from "@material-ui/icons";
import PropTypes from "prop-types";
import {
  Link,
  withRouter
} from "react-router-dom";
import Cookies from "universal-cookie";
import {logout} from "../../../../Actions/User";
import Routes from "../../../../Utils/Routes";
import GifLoader from "../../../../Assets/loader.gif";
import Config from "../../../../../config/config";
import "./style.scss";

const environment = process.env.NODE_ENV || "development";

const mapStateToProps = (state) => ({
  loading: !!state.user.loading,
  image: state.user.image
});

const mapDispatchToProps = (dispatch) => ({
  logout: (accessToken, callback) => { dispatch(logout(accessToken, callback)) }
});

class Header extends Component {
  static propTypes = {
    toggleMenu: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      menuEl: null,
      image: {}
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      loading: props.loading,
      image: props.image
    };
  }

  openMenu = (event) => {
    this.setState({
      menuEl: event.currentTarget,
      menu: true
    });
  }

  closeMenu = () => {
    this.setState({
      menu: false
    });
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
    this.props.logout({data}, () => {
      cookies.remove("gis");
      this.props.history.push("/login");
    });
  }

  render() {
    const {
      menu,
      menuEl,
      image,
      loading
    } = this.state;

    return (
      <AppBar className="gis-app-header" position="sticky">
        <Toolbar variant="dense">
          <Grid container justify="space-between">
            <Grid item>
              <Hidden mdUp>
                <IconButton color="inherit" onClick={this.props.toggleMenu}>
                  <MenuIcon />
                </IconButton>
              </Hidden>
            </Grid>
            <Grid item>
              {
                loading ?
                <Avatar className="user-header-image" src={GifLoader} /> :
                <Avatar
                  className="user-header-image"
                  src={`${Config[environment].service}${image.path}?${new Date().getTime()}`}
                  onClick={this.openMenu} />
              }
              <Menu
                anchorEl={menuEl}
                open={menu}
                onClose={this.closeMenu}>
                <MenuItem component={Link} to={Routes.USER_PROFILE.path}>
                  <Routes.USER_PROFILE.icon />
                  {Routes.USER_PROFILE.name}
                </MenuItem>
                <MenuItem onClick={this.logout}>
                  <PowerSettingsNew />
                  Logout
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
