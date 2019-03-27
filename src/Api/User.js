import axios from "./index";
import _ from "underscore";

export default {
  authLogin: (credentials) => {
    credentials = {
      ...credentials,
      client_id: "11814a7e-53fd-49db-b9e5-69a4370b5827",
      client_secret: "gis_web_client",
      response_type: "code",
      grant_type: "password"
    };
    const data = new URLSearchParams();
    _.each(_.keys(credentials), (key) => {
      data.append(key, credentials[key]);
    });
    return axios.post("/api/auth/login", data);
  },
  authLogout: (data) => {
    return axios.delete("/api/auth/logout", data);
  },
  getRolePrivileges: (roleId, type) => (
    axios.get(`/api/permission/${type}/${roleId}`)
  ),
  getUser: (userId) => (
    axios.get(`/api/user/${userId}`)
  ),
  validateRoute: (roleId, privilege) => (
    axios.get(`/api/permission/validate/${roleId}/${privilege}`)
  ),
  updateUser: (user) => (
    axios.put("/api/user", user)
  ),
  updateUserImage: (userId, image) => {
    const data = new FormData();
    data.append("image", image);
    data.append("userId", userId);
    return axios.put("/api/user/image", data);
  }
};
