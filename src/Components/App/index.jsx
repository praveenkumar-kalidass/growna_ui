import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Grid,
  Paper
} from "@material-ui/core";
import Cookies from "universal-cookie";
import Header from "./Elements/Header";
import Menu from "./Elements/Menu";
import {getPrivileges} from "../../Actions/User";
import "./style.scss";

const mapDispatchToProps = (dispatch) => ({
  getPrivileges: (role) => { dispatch(getPrivileges(role)) }
});

class App extends Component {
  componentDidMount() {
    const cookies = new Cookies();
    this.props.getPrivileges(cookies.get("gis").role);
  }

  render() {
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
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
