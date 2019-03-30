import Api from "../Api/User";
import {User} from "../Constants/ActionTypes";
import {enableAppSuccess} from "./App";

const login = (credentials, callback) => () => {
  Api.authLogin(credentials).then((response) => (
    callback(response.data)
  ));
};

const logout = (accessToken, callback) => () => {
  Api.authLogout(accessToken).then((response) => (
    callback(response.data)
  ));
};

const signupUser = (data, callback) => () => {
  Api.signupUser(data).then((response) => (
    callback(response.data)
  ));
};

const getPrivileges = (roleId, type) => (dispatch) => {
  dispatch(startLoading());
  Api.getRolePrivileges(roleId, type).then((response) => {
    dispatch(loadPrivileges(response.data));
  });
};

const loadPrivileges = (data) => ({
  type: User.LOAD_USER_PRIVILEGES,
  data
});

const getUserDetails = (userId) => (dispatch) => {
  dispatch(startLoading());
  Api.getUser(userId).then((response) => {
    dispatch(loadUserDetails(response.data));
  });
};

const loadUserDetails = (data) => ({
  type: User.LOAD_USER_DETAILS,
  data
});

const validateRoute = (roleId, privilege, callback) => () => {
  Api.validateRoute(roleId, privilege).then((response) => (
    callback(response.data.valid)
  ));
};

const startLoading = () => ({
  type: User.START_USER_LOADING
});

const updateUser = (user) => (dispatch) => {
  dispatch(startLoading());
  Api.updateUser(user).then((response) => {
    dispatch(enableAppSuccess("User updated successfully"));
    dispatch(loadUser(response.data));
  });
};

const loadUser = (data) => ({
  type: User.LOAD_USER,
  data
});

const updateUserImage = (userId, image) => (dispatch) => {
  dispatch(startLoading());
  Api.updateUserImage(userId, image).then((response) => {
    dispatch(loadUserImage(response.data));
  });
};

const loadUserImage = (data) => ({
  type: User.LOAD_USER_IMAGE,
  data
});

export {
  login,
  logout,
  signupUser,
  getPrivileges,
  getUserDetails,
  validateRoute,
  updateUser,
  updateUserImage
};
