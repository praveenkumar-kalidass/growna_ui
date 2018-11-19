import React, {Component} from "react";
import ChildHeader from "./Elements/ChildHeader";
import ParentHeader from "./Elements/ParentHeader";
import Services from "./Elements/Services";
import "./style.scss";
import HomeHeader from "./Assets/home-header.png";

class Home extends Component {
  render() {
    return (
      <div className="ui-home">
        <ParentHeader />
        <ChildHeader />
        <img className="home-image" src={HomeHeader} />
        <Services />
      </div>
    );
  }
}

export default Home;
