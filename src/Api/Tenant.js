import axios from "./index";
import _ from "underscore";

export default {
  registerTenant: (data) => (
    axios.post("/api/tenant/register", data)
  ),
  getCompanyList: () => (
    axios.get("/api/company/list")
  ),
  getCompanies: (type, data) => (
    axios.get(`/api/company/${type}/${data}`)
  ),
  saveCompany: (data) => {
    const payload = new FormData();
    _.mapObject(data, (value, key) => {
      payload.append(key, data[key]);
    });
    return axios.post("/api/company", payload);
  },
  getRoles: (tenantId) => (
    axios.get(`/api/role/tenant/${tenantId}`)
  ),
  getRoleDetails: (tenantId) => (
    axios.get(`/api/role/detail/${tenantId}`)
  ),
  getUsersByRole: (roleId) => (
    axios.get(`/api/user/role/${roleId}`)
  ),
  getUsersByTenant: (tenantId) => (
    axios.get(`/api/user/tenant/${tenantId}`)
  ),
  addUser: (user) => (
    axios.post("/api/user", user)
  ),
  addRole: (role) => (
    axios.post("/api/role", role)
  ),
  getRoleById: (id) => (
    axios.get(`/api/role/${id}`)
  ),
  getAllPrivileges: (scope) => (
    axios.get(`/api/privilege/scope/${scope}`)
  ),
  getRolePrivileges: (roleId, type) => (
    axios.get(`/api/permission/${type}/${roleId}`)
  )
};
