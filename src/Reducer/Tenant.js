import {Tenant} from "../Constants/ActionTypes";

const initialState = {
  loading: false,
  roles: [],
  roleList: [],
  users: [],
  userList: [],
  privileges: []
};

export default (state = initialState, action) => {
  switch(action.type) {
  case Tenant.START_LOADING: {
    return {
      ...state,
      loading: true
    };
  }
  case Tenant.STOP_LOADING: {
    return {
      ...state,
      loading: false
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
  case Tenant.LOAD_PRIVILEGES_LIST: {
    return {
      ...state,
      loading: false,
      privileges: action.data
    };
  }
  default: {
    return state;
  }
  }
};
