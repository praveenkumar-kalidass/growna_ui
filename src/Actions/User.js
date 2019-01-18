import Api from "../Api/User";
import {User} from "../Constants/ActionTypes";

const login = (credentials) => (dispatch) => {
  Api.authLogin(credentials).then((response) => {
    dispatch(loadAuthorization(response.data));
  });
};

const loadAuthorization = (data) => ({
  type: User.LOAD_PRIVILEGES,
  data
});

export {
  login
};
