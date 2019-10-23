import React, {Component} from "react";
import Cookies from "universal-cookie";
import Admin from "./Elements/Admin";
import User from "./Elements/User";

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
        {(role === "GIS_ADMIN" || role === "GIS_SUPER_ADMIN") && <Admin />}
        {role === "GIS_USER" && <User />}
      </div>
    );
  }
}

export default Dashboard;
