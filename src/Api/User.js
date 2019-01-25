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
  getRolePrivileges: (role) => {
    return axios.get(`/api/role/privileges/${role}`);
  }
};
