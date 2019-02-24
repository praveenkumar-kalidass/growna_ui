import {User} from "../Constants/ActionTypes";

const initialState = {
  auth: {},
  role: {},
  privileges: [],
  user: {},
  validRoute: true,
  logout: false
};

export default (state = initialState, action) => {
  switch(action.type) {
  case User.LOAD_AUTH: {
    const {
      auth,
      role
    } = action.data;
    return {
      ...state,
      auth,
      role
    };
  }
  case User.LOG_OUT: {
    return {
      ...state,
      logout: action.data
    };
  }
  case User.LOAD_PRIVILEGES: {
    return {
      ...state,
      privileges: action.data
    };
  }
  case User.LOAD_USER: {
    return {
      ...state,
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
