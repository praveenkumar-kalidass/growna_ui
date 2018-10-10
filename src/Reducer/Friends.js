import {LOAD_FRIENDS_LIST} from "../Constants/ActionTypes";

const initialState = {
  friends: []
};

const friendsReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_FRIENDS_LIST:
      return {
        ...state,
        friends: action.data
      };
    default:
      return state;
  }
};

export default friendsReducer;
