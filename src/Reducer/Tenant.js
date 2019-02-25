import {Tenant} from "../Constants/ActionTypes";

const initialState = {
  loading: false,
  tenant: {},
  roles: [],
  roleList: [],
  users: [],
  userList: []
};

export default (state = initialState, action) => {
  switch(action.type) {
  case Tenant.LOAD_TENANT: {
    return {
      ...state,
      loading: false,
      tenant: action.data
    };
  }
  case Tenant.LOAD_ROLES: {
    return {
      ...state,
      loading: false,
      roles: action.data
    };
  }
  case Tenant.LOAD_USERS: {
    return {
      ...state,
      loading: false,
      users: action.data
    };
  }
  case Tenant.LOAD_ROLE_LIST: {
    return {
      ...state,
      loading: false,
      roleList: action.data
    };
  }
  case Tenant.LOAD_USER_LIST: {
    return {
      ...state,
      loading: false,
      userList: action.data
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
