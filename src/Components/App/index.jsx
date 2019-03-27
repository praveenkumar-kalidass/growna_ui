import React, {Component} from "react";
import {connect} from "react-redux";
import {
  CircularProgress,
  Grid,
  Hidden,
  IconButton,
  Paper,
  Snackbar,
  SnackbarContent,
  SwipeableDrawer
} from "@material-ui/core";
import {
  Close
} from "@material-ui/icons";
import {withRouter, matchPath} from "react-router-dom";
import Cookies from "universal-cookie";
import _ from "underscore";
import Header from "./Elements/Header";
import Menu from "./Elements/Menu";
import Pagecrumb from "./Elements/Pagecrumb";
import {
  validateRoute,
  setRouteValidity
} from "../../Actions/User";
import {
  disableAppSuccess,
  disableAppError
} from "../../Actions/App";
import Routes from "../../Utils/Routes";
import "./style.scss";

const mapDispatchToProps = (dispatch) => ({
  disableAppSuccess: () => { dispatch(disableAppSuccess()) },
  disableAppError: () => { dispatch(disableAppError()) },
  getUserDetails: (userId) => { dispatch(getUserDetails(userId)) },
  validateRoute: (roleId, privilege, callback) => { dispatch(validateRoute(roleId, privilege, callback)) },
});

const mapStateToProps = (state) => ({
  message: state.app.message,
  error: state.app.error,
  success: state.app.success
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      error: false,
      success: false,
      menu: false,
      valid: true
    };
  }

  componentDidMount() {
    this.checkRouteValidity();
  }

  componentWillReceiveProps(nextProps) {
    const {
      message,
      error,
      success
    } = nextProps;

    this.setState({
      message,
      error,
      success
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.checkRouteValidity();
    }
  }

  checkRouteValidity = () => {
    const privilege = _.findKey(Routes, (route) => {
      return matchPath(this.props.location.pathname, {
        path: route.path,
        exact: true
      });
    });
    if (privilege !== "APP") {
      const cookies = new Cookies();
      this.setState({valid: false}, () => {
        this.props.validateRoute(
          cookies.get("gis").roleId,
          privilege,
          (valid) => {
            this.setState({valid});
            if (!valid) {
              this.props.history.goBack();
            }
          }
        );
      });
    }
  }

  handleSuccessClose = () => {
    this.props.disableAppSuccess();
  }

  handleErrorClose = () => {
    this.props.disableAppError();
  }

  toggleMenu = () => {
    this.setState({
      menu: !this.state.menu
    });
  }

  render() {
    const {
      message,
      error,
      success,
      menu,
      valid
    } = this.state;

    return (
      <div className="ui-app">
        <div className="app-base-background" />
        <Grid container>
          <Hidden smDown>
            <Grid item md={2}>
              <Menu />
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <SwipeableDrawer open={menu}
              onOpen={this.toggleMenu}
              onClose={this.toggleMenu}
              ModalProps={{
                keepMounted: true
              }}>
              <Menu />
            </SwipeableDrawer>
          </Hidden>
          <Grid item xs={12} sm={12} md={10} className="app-item">
            <Header toggleMenu={this.toggleMenu} />
            <Pagecrumb />
            <div className="app-container">
              {
                valid ?
                this.props.children :
                <Grid container justify="center">
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid>
              }
            </div>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={success}
          autoHideDuration={5000}
          onClose={this.handleSuccessClose}>
          <SnackbarContent
            className="app-success-bar"
            message={<span className="message">{message}</span>}
            action={
              <IconButton
                color="inherit"
                onClick={this.handleSuccessClose}>
                <Close />
              </IconButton>
            } />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={error}
          autoHideDuration={5000}
          onClose={this.handleErrorClose}>
          <SnackbarContent
            className="app-error-bar"
            message={<span className="message">{message}</span>}
            action={
              <IconButton
                color="inherit"
                onClick={this.handleErrorClose}>
                <Close />
              </IconButton>
            } />
        </Snackbar>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
