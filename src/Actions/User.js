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

const logout = (accessToken) => (dispatch) => {
  Api.authLogout(accessToken).then(() => {
    dispatch(logoutUser(true));
  });
};

const logoutUser = (data) => ({
  type: User.LOG_OUT,
  data
});

const getPrivileges = (roleId, type) => (dispatch) => {
  Api.getRolePrivileges(roleId, type).then((response) => {
    dispatch(loadPrivileges(response.data));
  });
};

const loadPrivileges = (data) => ({
  type: User.LOAD_USER_PRIVILEGES,
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

const validateRoute = (roleId, privilege) => (dispatch) => {
  Api.validateRoute(roleId, privilege).then((response) => {
    dispatch(setRouteValidity(response.data));
  });
};

const setRouteValidity = (data) => ({
  type: User.SET_ROUTE_VALIDITY,
  data
});

export {
  login,
  logout,
  getPrivileges,
  getUserDetails,
  validateRoute,
  setRouteValidity
};
