import React, {Component} from "react";
import {
  Avatar,
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
import {
  Area,
  Bar,
  ComposedChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import _ from "underscore";
import "./style.scss";

class SalesBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barChart: [
        {name: "Agent A", uv: 4000, pv: 2400, amt: 2400},
        {name: "Agent B", uv: 3000, pv: 1398, amt: 2210},
        {name: "Agent C", uv: 2000, pv: 6800, amt: 2290},
        {name: "Agent D", uv: 2780, pv: 3908, amt: 2000},
        {name: "Agent E", uv: 1890, pv: 4800, amt: 2181},
        {name: "Agent F", uv: 2390, pv: 3800, amt: 2500},
        {name: "Agent G", uv: 3490, pv: 4300, amt: 2100},
      ],
      badges: [{
        color: "pink",
        icon: Assessment,
        value: 1234,
        label: "Monitors"
      }, {
        color: "purple",
        icon: Build,
        value: 1234,
        label: "Monitors"
      }, {
        color: "blue",
        icon: Dashboard,
        value: 1234,
        label: "Monitors"
      }, {
        color: "green",
        icon: Grade,
        value: 1234,
        label: "Monitors"
      }]
    }
  }

  render() {
    const {
      barChart,
      badges
    } = this.state;

    return (
      <div className="gis-sales-bar">
        <Grid container justify="space-around">
          {
            _.map(badges, (badge, index) => (
              <Grid key={index} item xs={6} sm={3} md={3}>
                <Grid className="sales-badge" container
                  justify="center" alignItems="center"
                  spacing={8}>
                  <Grid item>
                    <Avatar className={`badge-icon ${badge.color}`}>
                      <badge.icon />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography className="badge-info" variant="h6">
                      {badge.value}
                    </Typography>
                    <Typography className="badge-label" variant="subtitle1">
                      {badge.label}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))
          }
        </Grid>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={barChart}
            margin={{top: 50, right: 20, left: 20, bottom: 10}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="amt" fill="#b9db92" stroke="#b9db92"/>
            <Bar dataKey="pv" barSize={20} fill="#009688" />
            <Line type="monotone" dataKey="uv" stroke="#ec407a" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default SalesBar;
