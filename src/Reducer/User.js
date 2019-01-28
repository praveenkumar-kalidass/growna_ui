import {User} from "../Constants/ActionTypes";

const initialState = {
  auth: {},
  role: {},
  privileges: [],
  user: {}
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
  default: {
    return state;
  }
  }
};
