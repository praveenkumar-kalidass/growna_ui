import {User} from "../Constants/ActionTypes";
import _ from "underscore";

const initialState = {
  auth: {},
  role: {},
  privileges: []
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
  default: {
    return state;
  }
  }
};
