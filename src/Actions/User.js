import Api from "../Api/User";
import {User} from "../Constants/ActionTypes";

const getUserPrivileges = (userId) => (dispatch) => {
  Api.getUserPrivileges(userId).then((response) => {
    dispatch(loadUserPrivileges(response.data.privileges));
  });
};

const loadUserPrivileges = (privileges) => ({
  type: User.LOAD_USER_PRIVILEGES,
  privileges
});

export {
  getUserPrivileges,
  loadUserPrivileges
};
