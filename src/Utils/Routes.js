import {
  AddAlarm,
  GroupAdd,
  PersonAdd,
  SupervisedUserCircle
} from "@material-ui/icons";
import AddRole from "../Components/AddRole";
import AddUser from "../Components/AddUser";
import AddTenant from "../Components/AddTenant";
import Dashboard from "../Components/Dashboard";
import UserList from "../Components/UserList";

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
    component: AddTenant,
    category: "Tenant",
    icon: GroupAdd
  },
  ADD_ROLE: {
    name: "Add Role",
    path: "/app/add-role",
    component: AddRole,
    category: "Role",
    icon: AddAlarm
  },
  ADD_USER: {
    name: "Add User",
    path: "/app/add-user",
    component: AddUser,
    category: "User",
    icon: PersonAdd
  },
  USER_LIST: {
    name: "User List",
    path: "/app/user-list",
    component: UserList,
    category: "User",
    icon: SupervisedUserCircle
  },
  INSURANCE: {
    name: "Insurance",
    path: "/app/insurance",
    component: AddUser,
    category: "User",
    icon: PersonAdd
  }
};
