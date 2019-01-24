import React, {Component} from "react";
import {
  Grid,
  Paper
} from "@material-ui/core";
import Header from "./Elements/Header";
import Menu from "./Elements/Menu";
import "./style.scss";

class App extends Component {
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
            <Paper elevation={1} className="app-container">
              {this.props.children}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
