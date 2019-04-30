import {Tenant} from "../Constants/ActionTypes";

const initialState = {
  loading: 0,
  role: {},
  roles: [],
  roleList: [],
  users: [],
  userList: [],
  privileges: [],
  companyList: [],
  companyPlans: []
};

export default (state = initialState, action) => {
  switch(action.type) {
  case Tenant.START_TENANT_LOADING: {
    return {
      ...state,
      loading: state.loading + 1
    };
  }
  case Tenant.STOP_TENANT_LOADING: {
    return {
      ...state,
      loading: state.loading - 1
    };
  }
  case Tenant.LOAD_COMPANY_LIST: {
    return {
      ...state,
      loading: state.loading - 1,
      companyList: action.data
    };
  }
  case Tenant.LOAD_COMPANY_PLANS: {
    return {
      ...state,
      companyPlans: action.data
    };
  }
  case Tenant.LOAD_ROLE: {
    return {
      ...state,
      loading: state.loading - 1,
      role: action.data
    };
  }
  case Tenant.LOAD_ROLES: {
    return {
      ...state,
      loading: state.loading - 1,
      roles: action.data
    };
  }
  case Tenant.LOAD_USERS: {
    return {
      ...state,
      loading: state.loading - 1,
      users: action.data
    };
  }
  case Tenant.LOAD_ROLE_LIST: {
    return {
      ...state,
      loading: state.loading - 1,
      roleList: action.data
    };
  }
  case Tenant.LOAD_USER_LIST: {
    return {
      ...state,
      loading: state.loading - 1,
      userList: action.data
    };
  }
  case Tenant.LOAD_PRIVILEGES: {
    return {
      ...state,
      loading: state.loading - 1,
      privileges: action.data
    };
  }
  default: {
    return state;
  }
  }
};
