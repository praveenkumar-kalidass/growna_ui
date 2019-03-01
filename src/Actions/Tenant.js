import Api from "../Api/Tenant";
import {Tenant} from "../Constants/ActionTypes";
import {enableAppSuccess} from "./App";

const registerTenant = (data) => (dispatch) => {
  dispatch(startLoading());
  Api.registerTenant(data).then(() => {
    dispatch(stopLoading());
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
  type: Tenant.START_LOADING
});

const stopLoading = () => ({
  type: Tenant.STOP_LOADING
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
  type: Tenant.LOAD_PRIVILEGES_LIST,
  data
});

export {
  getRoles,
  getRoleDetails,
  registerTenant,
  getUsersByRole,
  getUsersByTenant,
  addUser,
  addRole,
  getAllPrivileges
};
