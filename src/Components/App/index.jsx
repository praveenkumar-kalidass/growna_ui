import React, {Component} from "react";
import {Route} from "react-router-dom";
import Routes from "../../Utils/Routes";
import "./style.scss";

class App extends Component {
  render() {
    return (
      <div className="app">
        My App
        {this.props.children}
      </div>
    );
  }
}

export default App;
