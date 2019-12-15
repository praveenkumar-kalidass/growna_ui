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

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [{
        icon: Assessment,
        color: "pink",
        value: 10,
        label: "Quotations"
      }, {
        icon: Build,
        color: "purple",
        value: 6,
        label: "New Orders"
      }, {
        icon: Dashboard,
        color: "yellow",
        value: 2,
        label: "Service years"
      }, {
        icon: Grade,
        color: "green",
        value: "50%",
        label: "Average savings"
      }]
    };
  }

  render() {
    const {feed} = this.state;

    return (
      <Grid container className="gis-feed" spacing={4} wrap>
        {
          _.map(feed, (stats, index) => (
            <Grid key={index} item xs={6} sm={6} md={6}>
              <Paper elevation={1} className={`feed-card ${stats.color}`}>
                <Grid container className="card-container"
                  justify="space-around"
                  alignItems="flex-end"
                  spacing={2}>
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

export default Feed;
