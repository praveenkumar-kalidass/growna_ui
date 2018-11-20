import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Routes from "./Utils/Routes";
import Admin from "./Components/Admin";
import App from "./Components/App";
import Home from "./Components/Home";
import Login from "./Components/Login";
import User from "./Components/User";

const AppRouter = () => (
  <Router basename="/">
    <div className="ui-route">
      <Switch>
        <Route exact path={Routes.HOME} component={Home}></Route>
        <Route path={Routes.LOGIN} component={Login}></Route>
        <App>
          <Route exact path={Routes.ADMIN} component={Admin}></Route>
          <Route exact path={Routes.USER} component={User}></Route>
        </App>
      </Switch>
    </div>
  </Router>
);
export default AppRouter;
