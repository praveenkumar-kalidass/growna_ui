import {App} from "../Constants/ActionTypes";

const initialState = {
  success: false,
  error: false,
  message: ""
};

export default (state = initialState, action) => {
  switch(action.type) {
  case App.ENABLE_APP_SUCCESS: {
    const {message} = action;

    return {
      ...state,
      success: true,
      message
    };
  }
  case App.DISABLE_APP_SUCCESS: {
    const {message} = action;

    return {
      ...state,
      success: false,
      message: ""
    };
  }
  case App.ENABLE_APP_ERROR: {
    const {message} = action;

    return {
      ...state,
      error: true,
      message
    };
  }
  case App.DISABLE_APP_ERROR: {
    const {message} = action;

    return {
      ...state,
      error: false,
      message: ""
    };
  }
  default: {
    return state;
  }
  }
};
