import React from "react";
import Loadable from "react-loadable";
import AddUser from "../Components/AddUser";
import AddTenant from "../Components/AddTenant";
import Dashboard from "../Components/Dashboard";
import Loader from "../Components/Loader";

export default {
  HOME: {
    name: "Home",
    path: "/"
  },
  LOGIN: {
    name: "Login",
    path: "/login"
  },
  APP: {
    name: "App",
    path: "/app",
    component: Dashboard
  },
  ADD_TENANT: {
    name: "Add Tenant",
    path: "/app/add-tenant",
    component: AddTenant
  },
  ADD_USER: {
    name: "Add User",
    path: "/app/add-user",
    component: AddUser
  },
  INSURANCE: {
    name: "Insurance",
    path: "/app/insurance",
    component: AddUser
  }
};
