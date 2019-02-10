import axios from "./index";

export default {
  registerTenant: (data) => (
    axios.post("/api/tenant/register", data)
  )
}
