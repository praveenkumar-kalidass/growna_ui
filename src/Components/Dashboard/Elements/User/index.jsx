import React, {Component} from "react";
import {
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import Feed from "../Feed";
import "./style.scss";

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

class User extends Component {
  render() {
    return (
      <div className="gis-user-dashboard">
        <Grid container spacing={16} wrap>
          <Grid item xs={12} sm={12} md={6}>
            <Paper className="performance-paper">
              <Grid container>
                <Grid item xs sm md>
                  <Typography color="primary" variant="body2" gutterBottom>
                    Performance History
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Best performance
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    +45.2%
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Worst performance
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    -27.5%
                  </Typography>
                </Grid>
                <Grid item xs sm md>
                  <ResponsiveContainer>
                    <BarChart width={150} height={40} data={data}>
                      <Bar dataKey="pv" fill="#4caf4f" />
                      <Bar dataKey="uv" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Feed />
          </Grid>
        </Grid>
        <Paper className="performance-chart">
          <ResponsiveContainer>
            <BarChart
              width={800}
              height={450}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#3f51b5" />
              <Bar dataKey="uv" fill="#f50057" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </div>
    );
  }
}

export default User;
