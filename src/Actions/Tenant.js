import Api from "../Api/Tenant";
import {Tenant} from "../Constants/ActionTypes";

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
  Api.getManagersByRole(roleId).then((response) => {
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

export {
  getRoles,
  registerTenant,
  getManagersByRole
};
