import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Grid,
  IconButton,
  Paper,
  Snackbar,
  SnackbarContent
} from "@material-ui/core";
import {
  Close
} from "@material-ui/icons";
import Cookies from "universal-cookie";
import Header from "./Elements/Header";
import Menu from "./Elements/Menu";
import {getPrivileges} from "../../Actions/User";
import {disableAppSuccess} from "../../Actions/App";
import "./style.scss";

const mapDispatchToProps = (dispatch) => ({
  getPrivileges: (role) => { dispatch(getPrivileges(role)) },
  disableAppSuccess: () => { dispatch(disableAppSuccess()) }
});

const mapStateToProps = (state) => ({
  message: state.app.message,
  success: state.app.success
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      success: false
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    this.props.getPrivileges(cookies.get("gis").role);
  }

  componentWillReceiveProps(nextProps) {
    const {
      message,
      success
    } = nextProps;

    this.setState({
      message,
      success
    });
  }

  handleSuccessClose = () => {
    this.props.disableAppSuccess();
  }

  render() {
    const {
      message,
      success
    } = this.state;

    return (
      <div className="ui-app">
        <div className="app-base-background" />
        <Grid container>
          <Grid item md={2}>
            <Menu />
          </Grid>
          <Grid item xs={12} sm={12} md={10} className="app-item">
            <Header />
            <div className="app-container">
              {this.props.children}
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
