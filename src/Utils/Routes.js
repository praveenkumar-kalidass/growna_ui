import {
  AddAlarm,
  BorderColor,
  Description,
  DirectionsBike,
  GroupAdd,
  Home,
  ListAlt,
  Person,
  PersonAdd,
  ShoppingCart,
  SupervisedUserCircle,
  Work
} from "@material-ui/icons";
import UserProfile from "../Components/UserProfile";
import AddRole from "../Components/AddRole";
import AddUser from "../Components/AddUser";
import AddTenant from "../Components/AddTenant";
import CompanyList from "../Components/CompanyList";
import Dashboard from "../Components/Dashboard";
import UserList from "../Components/UserList";
import RoleList from "../Components/RoleList";
import EditRole from "../Components/EditRole";
import BikeInsurance from "../Components/BikeInsurance";
import Quotation from "../Components/Quotation";
import Cart from "../Components/Cart";

export default {
  HOME: {
    name: "Home",
    path: "/"
  },
  LOGIN: {
    name: "Login",
    path: "/login"
  },
  SIGNUP: {
    name: "Signup",
    path: "/signup"
  },
  APP: {
    name: "Home",
    path: "/app",
    component: Dashboard,
    icon: Home
  },
  USER_PROFILE: {
    name: "Profile",
    path: "/app/user-profile",
    component: UserProfile,
    icon: Person
  },
  QUOTATION: {
    name: "Quotation",
    path: "/app/quotation/:id",
    component: Quotation,
    icon: Description
  },
  CART: {
    name: "Cart",
    path: "/app/cart/:id",
    component: Cart,
    icon: ShoppingCart
  },
  ADD_TENANT: {
    name: "Add Tenant",
    path: "/app/add-tenant",
    component: AddTenant,
    category: "Tenant",
    icon: GroupAdd
  },
  COMPANY_LIST: {
    name: "Company List",
    path: "/app/company-list",
    component: CompanyList,
    category: "Company",
    icon: Work
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
  ROLE_LIST: {
    name: "Role List",
    path: "/app/role-list",
    component: RoleList,
    category: "Role",
    icon: ListAlt,
    children: ["EDIT_ROLE"]
  },
  EDIT_ROLE: {
    name: "Edit Role",
    path: "/app/edit-role/:id",
    component: EditRole,
    category: "Role",
    icon: BorderColor
  },
  BIKE_INSURANCE: {
    name: "Bike Insurance",
    path: "/app/bike-insurance",
    component: BikeInsurance,
    category: "Insurance",
    icon: DirectionsBike,
    children: ["QUOTATION"]
  }
};
