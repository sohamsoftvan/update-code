import Cookies from "universal-cookie";
import { ACCESS_TOKEN, TOKEN_TYPE } from "../enums/auth.enums";
import { logout } from "../app/Admin/modules/Auth/_redux/authCrud";
import { successToast } from "./ToastMessage";
import { cancelAllRequests } from "./CancelableAxios";

let isLoggingOut = false;

export function performLogout(reduxLogoutCallback) {
  if (isLoggingOut) return;
  isLoggingOut = true;
  cancelAllRequests(); // Cancel all in-flight API calls immediately
  const cookies = new Cookies();

  return logout()
    .then((response) => {
      // Remove cookies
      cookies.remove(ACCESS_TOKEN, { path: "/" });
      cookies.remove(TOKEN_TYPE, { path: "/" });

      // Call Redux logout action if provided
      if (reduxLogoutCallback) {
        reduxLogoutCallback();
      }
      successToast("Logged out successfully");
    })
    .catch((error) => {
      console.error("Logout API Error:", error);
      console.log("Logout failed");
      cookies.remove(ACCESS_TOKEN, { httpOnly: false });
      cookies.remove(TOKEN_TYPE, { httpOnly: false });
      if (reduxLogoutCallback) {
        reduxLogoutCallback();
      }
    })
    .finally(() => {
      isLoggingOut = false;
    });
} 