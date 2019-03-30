import React from "react";
import Loadable from "react-loadable";
import {
  HashRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Cookies from "universal-cookie";
import _ from "underscore";
import Routes from "./Utils/Routes";
import App from "./Components/App";
import Loader from "./Components/Loader";

const LoadableHome = Loadable({
  loader: () => import("./Components/Home"),
  loading: Loader
});

const LoadableLogin = Loadable({
  loader: () => import("./Components/Login"),
  loading: Loader
});

const LoadableSignup = Loadable({
  loader: () => import("./Components/Signup"),
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
              {
                _.compact(_.map(Routes, (route, key) => {
                  if (new RegExp("app").test(route.path)) {
                    return (
                      <Route
                        key={key}
                        exact
                        path={route.path}
                        component={route.component} />
                    );
                  }
                }))
              }
            </App>
          ) :
          (
            <Redirect
              to={{
                pathname: Routes.LOGIN.path
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
            <LoadableLogin />
          ) :
          (
            <Redirect
              to={{
                pathname: Routes.APP.path
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
      <Route exact path={Routes.HOME.path} component={LoadableHome}></Route>
      <LoginRouter path={Routes.LOGIN.path}></LoginRouter>
      <Route path={Routes.SIGNUP.path} component={LoadableSignup}></Route>
      <AppRouter path={Routes.APP.path}></AppRouter>
    </div>
  </Router>
);

export default routes;
