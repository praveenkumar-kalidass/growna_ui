import Api from "../Api/User";
import {enableAppSuccess} from "./App";
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

const addUser = (user) => (dispatch) => {
  Api.addUser(user).then((response) => {
    dispatch(enableAppSuccess("User added successfully"));
  });
};

const getUserDetails = (userId) => (dispatch) => {
  Api.getUser(userId).then((response) => {
    dispatch(loadUser(response.data));
  });
};

const loadUser = (data) => ({
  type: User.LOAD_USER,
  data
});

export {
  login,
  getPrivileges,
  addUser,
  getUserDetails
};
