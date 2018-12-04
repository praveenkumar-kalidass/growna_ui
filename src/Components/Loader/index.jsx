import React, {Component} from "react";
import {Avatar, CircularProgress, Grid} from "@material-ui/core";
import GisLogo from "../../Assets/growna-logo.png";
import "./style.scss";

class Loader extends Component {
  render() {
    return (
      <Grid className="gis-loader" container
        justify="center" alignItems="center">
        <Grid item>
          <div className="logo" src={GisLogo}>
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
          </div>
          <CircularProgress size={68} />
        </Grid>
      </Grid>
    );
  }
}

export default Loader;
