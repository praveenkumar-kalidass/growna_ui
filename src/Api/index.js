import axios from "axios";
import _ from "underscore";
import Cookies from "universal-cookie";

/**
 * Axios to register Base url of Service
 */
let api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000
});

/**
 * Method to refresh Access Token
 * @param  {String} refreshToken
 * @return {Promise}
 */
const refreshToken = (refreshToken) => {
  const data = new URLSearchParams();
  data.append("refresh_token", refreshToken);
  data.append("client_id", "11814a7e-53fd-49db-b9e5-69a4370b5827");
  data.append("client_secret", "gis_web_client");
  data.append("grant_type", "refresh_token");
  return api.post("/api/auth/authenticate", data);
};

/**
 * API request Interceptor
 *  - Appends Authorization in request header
 */
api.interceptors.request.use((config) => {
  const cookies = new Cookies();
  const gis = cookies.get("gis");
  if (gis && gis.accessToken) {
    config.headers.Authorization = `Bearer ${gis.accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * API response Interceptor
 *  - Refresh Access Token for UnAuthorized response
 */
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401 &&
    error.response.data.name === "invalid_token") {
    const cookies = new Cookies();
    const gis = cookies.get("gis");
    return refreshToken(gis.refreshToken).then((response) => {
      const route = _.findWhere(response.data.privileges, {
        type: "ROUTE"
      });
      cookies.set("gis", {
        ..._.pick(response.data.auth, "accessToken", "refreshToken", "userId"),
        role: response.data.name,
        route: route.description
      }, {
        expires: new Date(response.data.auth.refreshTokenExpiresAt)
      });
      return api.request(error.config);
    });
  }
  return Promise.reject(error);
});

export default api;
