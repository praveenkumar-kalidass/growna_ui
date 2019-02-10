import {Tenant} from "../Constants/ActionTypes";

const initialState = {
  loading: false,
  tenant: {}
};

export default (state = initialState, action) => {
  switch(action.type) {
  case Tenant.LOAD_TENANT: {
    return {
      ...state,
      loading: false,
      tenant: state.data
    };
  }
  case Tenant.LOADING_TENANT: {
    return {
      ...state,
      loading: true
    };
  }
  default: {
    return state;
  }
  }
};
