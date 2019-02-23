import AddRole from "../Components/AddRole";
import AddUser from "../Components/AddUser";
import AddTenant from "../Components/AddTenant";
import Dashboard from "../Components/Dashboard";

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
  ADD_ROLE: {
    name: "Add Role",
    path: "/app/add-role",
    component: AddRole
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
