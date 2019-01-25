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

export {
  login,
  getPrivileges
};
