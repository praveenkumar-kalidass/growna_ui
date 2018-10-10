import React from "react";
import "./App.scss";

class AppContainer extends React.Component {
  render() {
    return (
      <div className="app">
        My App
        {this.props.children}
      </div>
    );
  }
}

export default AppContainer;
