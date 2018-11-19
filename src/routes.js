import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Components/Home";
import App from "./Components/App/App.react";
import Friends from "./Components/Friends/Friends.react";

const AppRouter = () => (
  <Router basename="/">
    <div className="ui-route">
      <Route path="/" component={Home}></Route>
      <Route path="/app" component={App}></Route>
      <Route path="/friends" component={Friends}></Route>
    </div>
  </Router>
);
export default AppRouter;
