import Api from "../Api/Tenant";
import {Tenant} from "../Constants/ActionTypes";
import {enableAppSuccess} from "./App";

const registerTenant = (data) => (dispatch) => {
  dispatch(startLoading());
  Api.registerTenant(data).then(() => {
    dispatch(stopLoading());
  });
};

const getCompanyList = () => (dispatch) => {
  dispatch(startLoading());
  Api.getCompanyList().then((response) => {
    dispatch(loadCompanyList(response.data));
  });
};

const loadCompanyList = (data) => ({
  type: Tenant.LOAD_COMPANY_LIST,
  data
});

const getCompanies = (name, callback) => (dispatch) => {
  Api.getCompanies("name", name).then((response) => {
    dispatch(loadCompanyPlans(response.data));
    return callback();
  });
};

const loadCompanyPlans = (data) => ({
  type: Tenant.LOAD_COMPANY_PLANS,
  data
});

const saveCompany = (data, callback) => () => {
  Api.saveCompany(data).then((response) => {
    return callback(response.data);
  });
};

const getRoles = (tenantId) => (dispatch) => {
  dispatch(startLoading());
  Api.getRoles(tenantId).then((response) => {
    dispatch(loadRoles(response.data));
  });
};

const loadRoles = (data) => ({
  type: Tenant.LOAD_ROLES,
  data
});

const getRoleDetails = (tenantId) => (dispatch) => {
  dispatch(startLoading());
  Api.getRoleDetails(tenantId).then((response) => {
    dispatch(loadRoleList(response.data));
  });
};

const loadRoleList = (data) => ({
  type: Tenant.LOAD_ROLE_LIST,
  data
});

const getUsersByRole = (roleId) => (dispatch) => {
  dispatch(startLoading());
  Api.getUsersByRole(roleId).then((response) => {
    dispatch(loadUsers(response.data));
  });
};

const loadUsers = (data) => ({
  type: Tenant.LOAD_USERS,
  data
});

const startLoading = () => ({
  type: Tenant.START_TENANT_LOADING
});

const stopLoading = () => ({
  type: Tenant.STOP_TENANT_LOADING
});

const addUser = (user) => (dispatch) => {
  Api.addUser(user).then(() => {
    dispatch(enableAppSuccess("User added successfully"));
  });
};

const addRole = (role) => (dispatch) => {
  dispatch(startLoading());
  Api.addRole(role).then(() => {
    dispatch(stopLoading());
  });
};

const getUsersByTenant = (tenantId) => (dispatch) => {
  dispatch(startLoading());
  Api.getUsersByTenant(tenantId).then((response) => {
    dispatch(loadUserList(response.data));
  });
};

const loadUserList = (data) => ({
  type: Tenant.LOAD_USER_LIST,
  data
});

const getAllPrivileges = (scope) => (dispatch) => {
  dispatch(startLoading());
  Api.getAllPrivileges(scope).then((response) => {
    dispatch(loadPrivileges(response.data));
  });
};

const loadPrivileges = (data) => ({
  type: Tenant.LOAD_PRIVILEGES,
  data
});

const getRole = (id) => (dispatch) => {
  dispatch(startLoading());
  Api.getRoleById(id).then((response) => {
    dispatch(loadRole(response.data));
  });
};

const loadRole = (data) => ({
  type: Tenant.LOAD_ROLE,
  data
});

const getPrivilegesByRole = (roleId, type) => (dispatch) => {
  dispatch(startLoading());
  Api.getRolePrivileges(roleId, type).then((response) => {
    dispatch(loadPrivileges(response.data));
  });
};

export {
  getRole,
  getRoles,
  getRoleDetails,
  registerTenant,
  getUsersByRole,
  getUsersByTenant,
  addUser,
  addRole,
  getAllPrivileges,
  getPrivilegesByRole,
  getCompanyList,
  getCompanies,
  saveCompany
};
