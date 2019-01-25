import React from "react";
import Loadable from "react-loadable";
import {
  HashRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Cookies from "universal-cookie";
import Routes from "./Utils/Routes";
import Dashboard from "./Components/Dashboard";
import App from "./Components/App";
import Login from "./Components/Login";
import Loader from "./Components/Loader";

const LoadableHome = Loadable({
  loader: () => import("./Components/Home"),
  loading: Loader
});

const AppRouter = (rest) => {
  const cookies = new Cookies();
  const gis = cookies.get("gis");
  return (
    <Route
      {...rest}
      render={() => (
        gis && gis.accessToken ?
          (
            <App>
              <Route exact path={Routes.APP} component={Dashboard} />
            </App>
          ) :
          (
            <Redirect
              to={{
                pathname: Routes.LOGIN
              }}
            />
          )
      )}
    />
  );
};

const LoginRouter = (rest) => {
  const cookies = new Cookies();
  const gis = cookies.get("gis");
  return (
    <Route
      {...rest}
      render={() => (
        !gis || !gis.accessToken ?
          (
            <Login />
          ) :
          (
            <Redirect
              to={{
                pathname: Routes.APP
              }}
            />
          )
      )}
    />
  );
};

const routes = () => (
  <Router basename="/">
    <div className="ui-route">
      <Route exact path={Routes.HOME} component={LoadableHome}></Route>
      <LoginRouter path={Routes.LOGIN}></LoginRouter>
      <AppRouter path={Routes.APP}></AppRouter>
    </div>
  </Router>
);

export default routes;
