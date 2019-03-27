import {Insurance} from "../Constants/ActionTypes";
import _ from "underscore";

const initialState = {
  loading: false,
  brands: [],
  models: [],
  variants: [],
  quotation: {},
  company: {},
  plan: {},
  plans: [],
  companies: [],
  cart: {},
  vehicleOwner: {},
  address: {},
  vehicleDetail: {},
  pastPolicy: {}
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
      company: action.data.insurer,
      plan: action.data.plan,
      vehicleOwner: action.data.vehicleOwner || {},
      address: action.data.communicationAddress || {},
      vehicle: action.data.vehicleDetail || {},
      pastPolicy: action.data.pastPolicy || {},
      cart: _.omit(
        action.data,
        "cartQuotation",
        "insurer",
        "plan",
        "vehicleOwner",
        "communicationAddress",
        "vehicleDetail",
        "pastPolicy"
      )
    };
  }
  case Insurance.LOAD_VEHICLE_OWNER: {
    return {
      ...state,
      loading: false,
      vehicleOwner: action.data
    };
  }
  case Insurance.LOAD_ADDRESS: {
    return {
      ...state,
      loading: false,
      address: action.data
    };
  }
  case Insurance.LOAD_VEHICLE_DETAIL: {
    return {
      ...state,
      loading: false,
      vehicle: action.data
    };
  }
  case Insurance.LOAD_PAST_POLICY: {
    return {
      ...state,
      loading: false,
      pastPolicy: action.data
    };
  }
  case Insurance.LOAD_COMPANIES: {
    return {
      ...state,
      companies: action.data
    };
  }
  default: {
    return state;
  }
  }
};
