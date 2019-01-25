import React, {Component} from "react";
import {
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import {
  Assessment,
  Build,
  Dashboard,
  Grade
} from "@material-ui/icons";
import _ from "underscore";
import "./style.scss";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statistics: [{
        icon: Assessment,
        color: "pink",
        value: 105,
        label: "New customers"
      }, {
        icon: Build,
        color: "purple",
        value: 67,
        label: "New Agents"
      }, {
        icon: Dashboard,
        color: "yellow",
        value: 80,
        label: "New claims"
      }, {
        icon: Grade,
        color: "green",
        value: 55,
        label: "Average Income"
      }]
    };
  }

  render() {
    const {statistics} = this.state;

    return (
      <Grid container className="gis-statistics" spacing={16}>
        {
          _.map(statistics, (stats, index) => (
            <Grid key={index} item
              xs={6} sm={6} md={3}>
              <Paper elevation={1} className={`statistics-card ${stats.color}`}>
                <Grid container className="card-container"
                  justify="space-around"
                  alignItems="flex-end"
                  spacing={8}>
                  <Grid item>
                    <Typography className="stats-info" variant="h5">
                      {stats.value}
                    </Typography>
                    <Typography className="stats-label" variant="h6">
                      {stats.label}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <stats.icon className="stats-icon" />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

export default Statistics;
