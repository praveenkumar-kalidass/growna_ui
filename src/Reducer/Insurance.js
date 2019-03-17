import {Insurance} from "../Constants/ActionTypes";

const initialState = {
  loading: false,
  brands: [],
  models: [],
  variants: []
};

export default (state = initialState, action) => {
  switch(action.type) {
  case Insurance.START_INSURANCE_LOADING: {
    return {
      ...state,
      loading: true
    };
  }
  case Insurance.LOAD_BRANDS: {
    return {
      ...state,
      loading: false,
      brands: action.data
    };
  }
  case Insurance.LOAD_MODELS: {
    return {
      ...state,
      loading: false,
      models: action.data
    };
  }
  case Insurance.LOAD_VARIANTS: {
    return {
      ...state,
      loading: false,
      variants: action.data
    };
  }
  default: {
    return state;
  }
  }
};
