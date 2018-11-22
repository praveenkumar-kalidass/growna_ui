import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import Header from "./Elements/Header";
import Quote from "./Elements/Quote";
import Service from "./Elements/Service";
import "./style.scss";

class Home extends Component {
  render() {
    return (
      <div className="gis-home">
        <Grid container justify="center">
          <Grid item md={10} sm={10} xs={12}>
            <Header />
          </Grid>
          <Grid item md={10} sm={10} xs={12}>
            <Quote />
          </Grid>
          <Grid item md={10} sm={10} xs={12}>
            {/*<Service />*/}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Home;
