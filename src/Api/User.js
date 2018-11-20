import axios from "axios";
const api = "http://localhost:3000";

export default {
  getUserPrivileges: (userId) => {
    return axios.get(`${api}/api/user/privileges/${userId}`);
  }
};
