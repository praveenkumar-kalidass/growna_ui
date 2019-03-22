import {Insurance} from "../Constants/ActionTypes";
import _ from "underscore";

const initialState = {
  loading: false,
  brands: [],
  models: [],
  variants: [],
  quotation: {},
  plans: [],
  cart: {}
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
  case Insurance.LOAD_QUOTATION_PLANS: {
    return {
      ...state,
      loading: false,
      plans: action.data.plans,
      quotation: _.omit(action.data, "plans")
    };
  }
  case Insurance.LOAD_CART_DETAILS: {
    return {
      ...state,
      loading: false,
      quotation: action.data.cartQuotation,
      cart: _.omit(action.data, "cartQuotation")
    }
  }
  default: {
    return state;
  }
  }
};
