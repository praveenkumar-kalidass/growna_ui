import React, {Component} from "react";
import {
  Breadcrumbs,
  Link
} from "@material-ui/core";
import {
  NavLink,
  withRouter
} from "react-router-dom";
import Routes from "../../../../Utils/Routes";
import _ from "underscore";
import "./style.scss";

class Pagecrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: []
    };
  }

  componentDidMount() {
    this.updateCrumbs(this.props.location.pathname);
  }

  static getDerivedStateFromProps(props) {
    return {
      routes: _.filter(Routes, (route) => {
        return route.path !== "/" &&
          new RegExp(route.path.replace("/:id", "")).test(props.location.pathname);
      })
    };
  }

  updateCrumbs = (pathname) => {
    this.setState({
      routes: _.filter(Routes, (route) => {
        return route.path !== "/" &&
          new RegExp(route.path.replace("/:id", "")).test(pathname);
      })
    });
  }

  render() {
    const {
      routes
    } = this.state;

    return (
      <Breadcrumbs separator=">" className="gis-pagecrumb">
        {
          _.map(routes, (route, index) => (
            <Link key={route.path}
              className="pagecrumb-link"
              exact
              component={NavLink}
              to={route.path}>
              <route.icon className="pagecrumb-icon" />
              {route.name}
            </Link>
          ))
        }
      </Breadcrumbs>
    );
  }
}

export default withRouter(Pagecrumb);
