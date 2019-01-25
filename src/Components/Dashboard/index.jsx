import React, {Component} from "react";
import {BarChart} from "recharts";
import Cookies from "universal-cookie";
import Admin from "./Elements/Admin";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: ""
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    this.setState({
      role: cookies.get("gis").role
    });
  }

  render() {
    const {role} = this.state;

    return (
      <div className="gis-dashboard">
        {role === "GIS_ADMIN" && <Admin />}
        {role === "GIS_USER" && <span>USER</span>}
      </div>
    );
  }
}

export default Dashboard;
