import axios from "axios";
import _ from "underscore";
import Cookies from "universal-cookie";
import {enableAppError} from "../Actions/App";
import Store from "../Store/store";
import Config from "../../config/config";

const environment = process.env.NODE_ENV || "development";

/**
 * Axios to register Base url of Service
 */
let api = axios.create({
  baseURL: Config[environment].service,
  timeout: 10000
});

/**
 * Interceptor blocker to prevent multiple refresh token request
 */
let authRefresh;

/**
 * Method to refresh Access Token
 * @param  {String} refreshToken
 * @return {Promise}
 */
const refreshToken = (refreshToken) => {
  if (!authRefresh) {
    const data = new URLSearchParams();
    data.append("refresh_token", refreshToken);
    data.append("client_id", "11814a7e-53fd-49db-b9e5-69a4370b5827");
    data.append("client_secret", "gis_web_client");
    data.append("grant_type", "refresh_token");
    authRefresh = api.post("/api/auth/authorize", data);
    authRefresh.then(
      () => { authRefresh = null; },
      () => { authRefresh = null; }
    );
  }
  return authRefresh;
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
      cookies.set("gis", {
        ..._.pick(response.data.auth,
          "accessToken",
          "refreshToken",
          "userId"
        ),
        tenantId: response.data.role.tenantId,
        roleId: response.data.role.id,
        role: response.data.role.name,
        type: response.data.role.type
      }, {
        expires: new Date(response.data.auth.refreshTokenExpiresAt)
      });
      return api.request(error.config);
    });
  }
  Store.dispatch(
    enableAppError(
      error.response.data.message ||
      error.response.data.name
    )
  );
  return Promise.reject(error);
});

export default api;
