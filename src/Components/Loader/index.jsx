import React, {Component} from "react";
import {CircularProgress} from "@material-ui/core";

class User extends Component {
  render() {
    return (
      <div className="gis-loader">
        <CircularProgress color="secondary" />
      </div>
    );
  }
}

export default User;
