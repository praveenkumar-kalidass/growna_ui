import Api from "../Api/Tenant";
import {Tenant} from "../Constants/ActionTypes";
import {enableAppSuccess} from "./App";

const registerTenant = (data) => (dispatch) => {
  dispatch(loadingTenant());
  Api.registerTenant(data).then((response) => {
    dispatch(loadTenant(response.data));
  });
};

const loadTenant = (data) => ({
  type: Tenant.LOAD_TENANT,
  data
});

const getRoles = (tenantId) => (dispatch) => {
  dispatch(loadingTenant());
  Api.getRoles(tenantId).then((response) => {
    dispatch(loadRoles(response.data));
  });
};

const loadRoles = (data) => ({
  type: Tenant.LOAD_ROLES,
  data
});

const getManagersByRole = (roleId) => (dispatch) => {
  dispatch(loadingTenant());
  Api.getUsersByRole(roleId).then((response) => {
    dispatch(loadManagers(response.data));
  });
};

const loadManagers = (data) => ({
  type: Tenant.LOAD_MANAGERS,
  data
});

const loadingTenant = () => ({
  type: Tenant.LOADING_TENANT
});

const addUser = (user) => (dispatch) => {
  Api.addUser(user).then(() => {
    dispatch(enableAppSuccess("User added successfully"));
  });
};

const addRole = (role) => (dispatch) => {
  Api.addRole(role).then(() => {
    dispatch(enableAppSuccess("Role added successfully"));
  });
};

const getUsers = (tenantId) => (dispatch) => {
  dispatch(loadingTenant());
  Api.getUsersByTenant(tenantId).then((response) => {
    dispatch(loadUsers(response.data));
  });
};

const loadUsers = (data) => ({
  type: Tenant.LOAD_USERS,
  data
});

export {
  getRoles,
  registerTenant,
  getManagersByRole,
  addUser,
  addRole,
  getUsers
};
