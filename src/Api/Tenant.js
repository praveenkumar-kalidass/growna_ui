import axios from "./index";

export default {
  registerTenant: (data) => (
    axios.post("/api/tenant/register", data)
  ),
  getRoles: (tenantId) => (
    axios.get(`/api/role/all/${tenantId}`)
  ),
  getManagersByRole: (roleId) => (
    axios.get(`/api/user/all/${roleId}`)
  ),
  addUser: (user) => (
    axios.post("/api/user/add", user)
  ),
  addRole: (role) => (
    axios.post("/api/role/add", role)
  )
};
