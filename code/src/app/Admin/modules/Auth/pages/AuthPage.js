import React from "react";
import { Link, Outlet } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import "../../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import { connect, shallowEqual, useSelector } from "react-redux";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import Cookies from "universal-cookie";
import SVG from "react-inlinesvg";

function AuthPage(props) {
  const [path, setPath] = React.useState(window.location.pathname);
  // const user = useSelector((state) => state.auth.user, shallowEqual); //used to get roles
  const today = new Date().getFullYear();
  // eslint-disable-next-line

  const getToggledPath = () => {
    if (path === "/auth/login") return "/auth/registration";
    else if (path === "/auth/registration") return "/auth/login";
    else if (path === "/") setPath("/auth/login");
    else return "/auth/login";
  };

  const togglePath = () => {
    setPath(getToggledPath);
  };

  // eslint-disable-next-line
  const { isAuthorized = false, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user?.id && new Cookies().get("access_token"),
      user: auth.user
    }),
    shallowEqual
  );
  const handleClick = (event) => {
    event.preventDefault();
    if (window.location.host === "beta.tusker.ai") {
      window.location.href = "http://tusker.ai/";
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-md-row flex-lg-row flex-sm-row flex-row-fluid bg-white "
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className=" displays1 login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${toAbsoluteUrl(
                "/media/bg/main-banner.jpg"
              )})`
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}

              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <a href="#"  onClick={handleClick} target="_blank">
                  <h1
                    className={"d-flex justify-content-center"}
                    style={{
                      color: "#fff",
                      fontFamily: "Rubik, sans-serif",
                      fontSize: "60px",
                      lineHeight: "1.1",
                      fontWeight: "500",
                      textTransform: "uppercase"
                    }}
                  >
                    {window.location.host === "beta.tusker.ai" ? "TUSKER AI" :window.location.host === "vision.newra.ai" ?

                        <SVG
                            src={toAbsoluteUrl(
                                "/media/logos/Newra_Logo_White.svg"
                            )}
                            style={{ width: '200px', height: 'auto' }}

                        /> :window.location.host === 'demo.urhiro.com' ? <SVG
                            src={toAbsoluteUrl(
                                "/media/logos/HiRO_Logo_Full_White.svg"
                            )}
                            style={{ width: '200px', height: 'auto' }}

                        /> :"TUSKER AI" }
                    {/*Tusker AI*/}
                  </h1>
                </a>
                <h3 className="font-size-h1 mb-5 text-white d-flex justify-content-center">
                  No-Code AI Computer Vision Platform
                </h3>
                <h4 className="font-size-h1 mb-5 text-white d-flex justify-content-center">
                  Image and Video Analytics
                </h4>
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              {/*<div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">*/}
              <div className="mt-10 d-flex">
                <div className={"flex-column-fluid justify-content-left mr-2"}>
                  <span className="opacity-70 font-weight-bold	text-white">
                    &copy; 2021-{today}
                  </span>
                  <span className="opacity-70 font-weight-bold	text-white">
                    <a
                      href="#"
                      onClick={handleClick}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white ml-2 text-hover-primary"
                    >

                      {window.location.host === "beta.tusker.ai" ? "TuskerAi" :window.location.host === "vision.newra.ai" ?
                          "NewRA.AI" : window.location.host === 'demo.urhiro.com' ? "HiRO.AI" : "TuskerAi"}
                      {/*TuskerAi*/}
                    </a>
                  </span>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            <div className="delete_large mt-15">
              <a  href="#"
                  onClick={handleClick} target="_blank">
                <h1
                  className={"d-flex justify-content-center"}
                  style={{
                    fontFamily: "Rubik, sans-serif",
                    fontSize: "44px",
                    lineHeight: "1.1",
                    fontWeight: "500",
                    textTransform: "uppercase"
                  }}
                >
                  {window.location.host === "beta.tusker.ai" ? "TuskerAi" :window.location.host === "vision.newra.ai" ?
                      "NewRA.AI" : window.location.host === 'demo.urhiro.com' ? "HiRO.AI" : "TuskerAi"}
                  {/*Tusker AI*/}
                </h1>
              </a>
            </div>
            {/*begin::Aside*/}

            {/*begin::Content*/}

            {/*give the css for not scrolling autoserving and keep scrolling register page*/}

            {/*begin::Content header*/}

            <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
              {!isAuthorized && path !== "/auth/registration" ? (
                <>
                  <span className="font-weight-bold text-dark-50">
                    {" "}
                    Don't have an account yet?
                  </span>
                  <Link
                    to={`${getToggledPath()}`}
                    onClick={togglePath}
                    className="font-weight-bold ml-2"
                    id="kt_login_signup"
                  >
                    Sign Up!
                  </Link>
                </>
              ) : (
                <>
                  <span className="font-weight-bold text-dark-50">
                    Already have an account?
                  </span>
                  <Link
                    to={`${getToggledPath()}`}
                    onClick={togglePath}
                    className="font-weight-bold ml-2"
                    id="kt_login_signup"
                  >
                    Log In!
                  </Link>
                </>
              )}
            </div>

            <div className="d-flex flex-column-fluid flex-center mt-lg-0">
             <Outlet />
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="displays1 d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div>
                <span className="delete_large text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                  {" "}
                  &copy; 2021-{today}
                    <a
                        href={`${window.location.host} === "beta.tusker.ai" ? "http://tusker.ai/" : "" `}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 text-dark-75 font-weight-bold ml-2 text-hover-primary"
                    >

                    {window.location.host === "beta.tusker.ai" ? "TuskerAi" :window.location.host === "vision.newra.ai" ?
                        "NewRA.AI" : window.location.host === 'demo.urhiro.com' ? "HiRO.AI" : "TuskerAi"}

                  </a>
                </span>
              </div>
            </div>
            <div className="delete_large">
              <div className="d-flex">
                <span className="opacity-70 font-weight-bold  flex-column-fluid flex-left">
                  {" "}
                  &copy; 2021-{today}
                  <a
                      href={`${window.location.host} === "beta.tusker.ai" ? "http://tusker.ai/" : "" `}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-70 text-dark-75 font-weight-bold ml-2 text-hover-primary"
                  >
                     {window.location.host === "beta.tusker.ai" ? "TuskerAi" :window.location.host === "vision.newra.ai" ?
                         "NewRA.AI" : window.location.host === 'demo.urhiro.com' ? "HiRO.AI" : "TuskerAi"}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default injectIntl(connect(null, auth.actions)(AuthPage));
