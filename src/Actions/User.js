import Api from "../Api/User";
import {User} from "../Constants/ActionTypes";

const login = (credentials) => (dispatch) => {
  Api.authLogin(credentials).then((response) => {
    dispatch(loadAuth(response.data));
  });
};

const loadAuth = (data) => ({
  type: User.LOAD_AUTH,
  data
});

const getPrivileges = (role) => (dispatch) => {
  Api.getRolePrivileges(role).then((response) => {
    dispatch(loadPrivileges(response.data));
  });
};

const loadPrivileges = (data) => ({
  type: User.LOAD_PRIVILEGES,
  data
});

const getUserDetails = (userId) => (dispatch) => {
  Api.getUser(userId).then((response) => {
    dispatch(loadUser(response.data));
  });
};

const loadUser = (data) => ({
  type: User.LOAD_USER,
  data
});

const validateRoute = (role, privilege) => (dispatch) => {
  Api.validateRoute(role, privilege).then((response) => {
    dispatch(setRouteValidity(response.data));
  });
};

const setRouteValidity = (data) => ({
  type: User.SET_ROUTE_VALIDITY,
  data
});

export {
  login,
  getPrivileges,
  getUserDetails,
  validateRoute,
  setRouteValidity
};
