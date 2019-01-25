import React, {Component} from "react";
import Cookies from "universal-cookie";

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
      <div className="gis-dashboard" style={{"height": "200vh"}}>
        {role === "GIS_ADMIN" && <span>ADMIN</span>}
        {role === "GIS_USER" && <span>USER</span>}
      </div>
    );
  }
}

export default Dashboard;
