import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from "./Components/App/App.react";
import Friends from "./Components/Friends/Friends.react";

const AppRouter = () => (
  <Router basename="/">
    <Route path="/">
      <App>
        <Route path="/friends" component={Friends}></Route>
      </App>
    </Route>
  </Router>
);
export default AppRouter;
