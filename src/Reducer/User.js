import _ from "underscore";
import {User} from "../Constants/ActionTypes";

const initialState = {
  loading: 0,
  auth: {},
  role: {},
  privileges: [],
  user: {},
  image: {},
  validRoute: true,
  logout: false
};

export default (state = initialState, action) => {
  switch(action.type) {
  case User.START_USER_LOADING: {
    return {
      ...state,
      loading: state.loading + 1
    };
  }
  case User.STOP_USER_LOADING: {
    return {
      ...state,
      loading: state.loading - 1
    };
  }
  case User.LOAD_AUTH: {
    const {
      auth,
      role,
      userImage
    } = action.data;
    return {
      ...state,
      user: _.omit(action.data, ["auth", "role", "userImage"]),
      auth,
      role,
      image: userImage,
      logout: false
    };
  }
  case User.LOG_OUT: {
    return {
      ...state,
      logout: action.data
    };
  }
  case User.LOAD_USER_PRIVILEGES: {
    return {
      ...state,
      loading: state.loading - 1,
      privileges: action.data
    };
  }
  case User.LOAD_USER_DETAILS: {
    const {
      role,
      userImage
    } = action.data;
    return {
      ...state,
      loading: state.loading - 1,
      user: _.omit(action.data, ["auth", "role", "userImage"]),
      role,
      image: userImage
    };
  }
  case User.LOAD_USER: {
    return {
      ...state,
      loading: state.loading - 1,
      user: action.data
    };
  }
  case User.SET_ROUTE_VALIDITY: {
    return {
      ...state,
      validRoute: action.data.valid
    };
  }
  default: {
    return state;
  }
  }
};
