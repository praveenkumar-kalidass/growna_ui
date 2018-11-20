import _ from "underscore";
import {User} from "../Constants/ActionTypes";

const initialState = {
  route: ""
};

const friendsReducer = (state = initialState, action) => {
  switch(action.type) {
    case User.LOAD_USER_PRIVILEGES:
      return {
        ...state,
        route: _.findWhere(action.privileges, {
          type: "ROUTE"
        }).description
      };
    default:
      return state;
  }
};

export default friendsReducer;
