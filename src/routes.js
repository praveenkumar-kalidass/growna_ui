import React from "react";
import Loadable from "react-loadable";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Routes from "./Utils/Routes";
import Admin from "./Components/Admin";
import App from "./Components/App";
import Login from "./Components/Login";
import User from "./Components/User";
import Loader from "./Components/Loader";

const LoadableHome = Loadable({
  loader: () => import("./Components/Home"),
  loading: Loader
});

const AppRouter = () => (
  <Router basename="/">
    <div className="ui-route">
      <Switch>
        <Route exact path={Routes.HOME} component={LoadableHome}></Route>
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
