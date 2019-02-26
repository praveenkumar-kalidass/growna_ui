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
    axios.post("/api/user/add", user)
  ),
  addRole: (role) => (
    axios.post("/api/role/add", role)
  ),
  getAllPrivileges: () => (
    axios.get("/api/privilege/all")
  )
};
