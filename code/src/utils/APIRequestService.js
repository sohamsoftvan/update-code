import Cookies from "universal-cookie";
import { appConfigs } from "./AppConfigs";
import {performLogout} from "./performLogout";
import axiosInstance from "./CancelableAxios";

export function request(options) {
  let isStatus = false;
  let isSuccess = false;
  let failureStatus = false;
  // eslint-disable-next-line
  let unAthorizedStatus = false;

  const config = {
    headers: {
      // Required headers
      "Content-Type": options["headers"]?.["Content-Type"] || "application/json",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
      "X-Content-Type-Options": "nosniff",
      "x-frame-options": "DENY",
      "Referrer-Policy": "no-referrer",
      "Permissions-Policy": "geolocation=(), camera=(), microphone=()",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      
      // Apply cache control headers based on endpoint
      // ...applyCacheHeaders(options["endpoint"], options["headers"] || {}),

      // Cache Control Headers
      "Cache-Control": "no-store, no-cache, must-revalidate, private",
      "Pragma": "no-cache",
      "Expires": "0",

      // Merge with any custom headers passed in
      ...(options["headers"] || {}),
    },
    url: options["url"] || appConfigs.API_HOST + options["endpoint"],
    method: options["method"],
    data: options["body"],
  };

  const cookies = new Cookies();
  if (cookies.get("access_token") && cookies.get("token_type")) {
    config["headers"]["Authorization"] =
      cookies.get("token_type", { httpOnly: false }) +
      " " +
      cookies.get("access_token", { httpOnly: false });
  }
  if (options?.responseType){
    config['responseType']=options.responseType
  }

  return axiosInstance
    .request(config)
    .then((response) => {
      let data;
      if (response.request.status === 200) {
        isSuccess = true;
        data = response.data;
      } else {
        isSuccess = false;
        data = null;
      }
      return { data, isStatus, isSuccess, failureStatus };
    })
    .catch((error) => {
      if (error.response) {
        const { status, data: errorData } = error.response;
        if (status === 401 || status === 403) {
          const cookies = new Cookies();
          const accessToken = cookies.get("access_token");
          const tokenType = cookies.get("token_type");

          // Only logout and redirect if we have tokens (meaning they're invalid)
          // If no tokens exist, user is already logged out, don't redirect
          if (accessToken && tokenType) {
            if (options.endpoint !== "/api/v1/logout") {
              performLogout();
            }
            unAthorizedStatus = true;
            window.location.replace("/auth/login");
          } else {
            // No tokens found, user is already logged out
            console.log("No access tokens found, user already logged out");
          }
        }
        throw errorData ? errorData : error;
      }
      throw error;
    });
}
