import _ from "underscore";
import {User} from "../Constants/ActionTypes";

const initialState = {
  auth: {},
  role: {},
  privileges: []
};

export default (state = initialState, action) => {
  switch(action.type) {
    case User.LOAD_PRIVILEGES:
      const {
        auth,
        privileges,
        id,
        name
      } = action.data;
      return {
        ...state,
        auth,
        privileges,
        role: {id, name}
      };
    default:
      return state;
  }
};
