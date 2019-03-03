import axios from "./index";

export default {
  registerTenant: (data) => (
    axios.post("/api/tenant/register", data)
  ),
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
