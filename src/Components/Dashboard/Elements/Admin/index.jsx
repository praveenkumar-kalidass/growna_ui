import React, {Component} from "react";
import {
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import Statistics from "../Statistics";
import SalesBar from "../SalesBar";
import PerformanceList from "../PerformanceList";
import "./style.scss";

class Admin extends Component {
  render() {
    return (
      <div className="gis-admin-dashboard">
        <Statistics />
        <Paper elevation={1}>
          <Typography className="sales-header"
            variant="h5" gutterBottom>
            Top Sales
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={12} md={8}>
              <SalesBar />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PerformanceList />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default Admin;
