import React, { Component } from "react";
import { connect } from "react-redux";
import { LayoutSplashScreen } from "../../../../../_metronic/layout";
import * as auth from "../_redux/authRedux";
import { performLogout } from "../../../../../utils/performLogout.js";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const tokenType = cookies.get("token_type");

    console.log("User is logging out. performLogout 15");
    // Only call logout API if we have tokens to logout
    if (accessToken && tokenType) {
      performLogout(this.props.logout);
    } else {
      // No tokens found, user is already logged out, just redirect
      this.props.logout();
      <Navigate to="/auth/login" replace />
    }
  }

  render() {
    const { hasAuthToken } = this.props;
    return hasAuthToken ? <LayoutSplashScreen /> : <Navigate to="/auth/login" replace />;
  }
}

export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) }),
  auth.actions
)(Logout);
