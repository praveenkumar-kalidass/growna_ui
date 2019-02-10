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

const loadingTenant = () => ({
  type: Tenant.LOADING_TENANT
});

export {
  registerTenant
};
