import React, {Component} from "react";
import {
  Grid,
  LinearProgress,
  Typography
} from "@material-ui/core";
import _ from "underscore";
import "./style.scss";

class PerformanceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      performances: [{
        color: "blue",
        value: 40,
        label: "Quality"
      }, {
        color: "pink",
        value: 75,
        label: "Speed"
      }, {
        color: "purple",
        value: 60,
        label: "Ticket"
      }, {
        color: "yellow",
        value: 80,
        label: "Assessment"
      }, {
        color: "green",
        value: 80,
        label: "Performance"
      }]
    };
  }

  render() {
    const {performances} = this.state;

    return (
      <div className="gis-performance-list">
        <Typography className="list-header" variant="button" gutterBottom>
          Performance List
        </Typography>
        <Grid container direction="column" justify="space-around"
          className="performance-list">
          {
            _.map(performances, (performance, index) => (
              <Grid key={index} item className="performance-badge">
                <Typography className="badge-label" variant="body2">
                  {performance.label}
                </Typography>
                <LinearProgress className={`badge-pipe ${performance.color}`}
                  variant="determinate" value={performance.value} />
              </Grid>
            ))
          }
        </Grid>
      </div>
    );
  }
}

export default PerformanceList;
