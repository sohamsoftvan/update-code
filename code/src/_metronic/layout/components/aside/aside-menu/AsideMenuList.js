/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { checkIsActive, toAbsoluteUrl } from "../../../../_helpers";
import { ADMIN_URL } from "../../../../../enums/constant";
import {shallowEqual, useSelector} from "react-redux";
import {Event} from "@mui/icons-material";
import {emailNotValid} from "../../../../../utils/UIHelpers";


export function AsideMenuList({ layoutProps }) {
  const location = useLocation();

  const getMenuItemActive = (url) => {
     return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  const subscriptions = useSelector((state) => {
    return state.subscription.subscriptions;
  });

  const {user} = useSelector(
      ({auth}) => ({
        user: auth.user
      }),
      shallowEqual
  );


  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        {subscriptions && (
            <li
                className={`menu-item menu-item-rel ${getMenuItemActive(
                    ADMIN_URL + "/dashboard"
                )}`}
            >
              <NavLink className="menu-link" to={ADMIN_URL + "/dashboard"}>
              <span className="svg-icon menu-icon">
                <SVG
                    title="View Dashboard"
                    src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
                <span className="menu-text">Dashboard</span>
              </NavLink>
            </li>
        )}
        {subscriptions && (
            <li
                className={`menu-item menu-item-rel ${getMenuItemActive(
                    ADMIN_URL + "/cameras"
                )}`}
            >
              <NavLink className="menu-link" to={ADMIN_URL + "/cameras"}>
              <span className="svg-icon menu-icon">
                <SVG
                    title="Live Preview"
                    src={toAbsoluteUrl(
                        "/media/svg/icons/Devices/Video-camera.svg"
                    )}
                />
              </span>
                <span className="menu-text">Live Preview</span>
              </NavLink>
            </li>
        )}

        {!emailNotValid.includes(user?.user_email) && (
        <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
                ADMIN_URL + "/violation"
            )}`}
        >
          <NavLink className="menu-link" to={ADMIN_URL + "/violation"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="View Violation"
                  src={toAbsoluteUrl("/media/svg/icons/Code/Warning-2.svg")}
              />
            </span>
            <span className="menu-text">Violation</span>
          </NavLink>
        </li>)}
        {subscriptions && (
            <li
                className={`menu-item menu-item-rel ${getMenuItemActive(
                    "/my-results"
                )}`}
            >
              <NavLink className="menu-link" to={"/my-results"}>
              <span className="svg-icon menu-icon">
                <SVG
                    title="Add Vioaltions"
                    src={toAbsoluteUrl("/media/svg/icons/Files/Folder-check.svg")}
                />
              </span>
                <span className="menu-text">Results</span>
              </NavLink>
            </li>
        )}
        {/*event started*/}

        {!emailNotValid.includes(user?.user_email) && (
        <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
                "/my-events"
            )}`}
        >
          <NavLink className="menu-link" to={"/my-events"}>
            <span className="svg-icon menu-icon">
              <Event/>
            </span>
            <span className="menu-text">Events</span>
          </NavLink>
        </li>)}

        {/*end::1 Level*/}
        <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
                ADMIN_URL + "/locations"
            )}`}
        >
          <NavLink className="menu-link" to={ADMIN_URL + "/locations"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="Add Locations"
                  src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")}
              />
            </span>
            <span className="menu-text">Locations</span>
          </NavLink>
        </li>
        <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
                ADMIN_URL + "/addSupervisor"
            )}`}
        >
          <NavLink className="menu-link" to={ADMIN_URL + "/addSupervisor"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="Add Supervisor"
                  src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Shield-user.svg"
                  )}
              />
            </span>
            <span className="menu-text">Supervisor</span>
          </NavLink>
        </li>

        {!emailNotValid.includes(user?.user_email) && (

            <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
                ADMIN_URL + "/employee"
            )}`}
        >
          <NavLink className="menu-link" to={ADMIN_URL + "/employee"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="Add Employee"
                  src={toAbsoluteUrl("/media/svg/icons/General/User.svg")}
              />
            </span>
            <span className="menu-text">Employees</span>
          </NavLink>
        </li>)}

        {!emailNotValid.includes(user?.user_email) && (
          <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
                ADMIN_URL + "/attendance"
            )}`}
        >
          <NavLink className="menu-link" to={ADMIN_URL + "/attendance"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="View Attendance"
                  src={toAbsoluteUrl(
                      "/media/svg/icons/Navigation/Double-check.svg"
                  )}
              />
            </span>
            <span className="menu-text">Attendance</span>
          </NavLink>
        </li>)}

        {!emailNotValid.includes(user?.user_email) && (
        <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
                ADMIN_URL + "/model-categories/view"
            )}`}
        >
          <NavLink className="menu-link" to={ADMIN_URL + "/model-categories/view"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="View Model Catalogues"
                  src={toAbsoluteUrl("/media/svg/icons/Devices/Server.svg")}
              />
            </span>
            <span className="menu-text">Marketplace</span>
          </NavLink>
        </li> )}

        <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
                ADMIN_URL + "/subscriptions/deployedJobsPage"
            )}`}
        >
          {/*<NavLink className="menu-link" from={ADMIN_URL+"/subscriptions"} to={ADMIN_URL+"/subscriptions/deployedJobsPage"}>*/}
          <NavLink className="menu-link" to={ADMIN_URL + "/subscriptions/deployedJobsPage"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="View Subscriptions"
                  src={toAbsoluteUrl("/media/svg/icons/General/Settings-1.svg")}
              />
            </span>
            <span className="menu-text">Subscriptions</span>
          </NavLink>
        </li>

        <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
                ADMIN_URL + "/allCamera"
            )}`}
        >
          {/*<NavLink className="menu-link" from={ADMIN_URL+"/subscriptions"} to={ADMIN_URL+"/subscriptions/deployedJobsPage"}>*/}
          <NavLink className="menu-link" to={ADMIN_URL + "/allCamera"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="All Camera"
                  src={toAbsoluteUrl("/media/svg/icons/Devices/Camera.svg")}
              />
            </span>
            <span className="menu-text">All Camera</span>
          </NavLink>
        </li>
        <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
                ADMIN_URL + "/camera-status"
            )}`}
        >
          <NavLink className="menu-link" to={ADMIN_URL+ "/camera-status"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="Camera Status"
                  src={toAbsoluteUrl("/media/svg/icons/General/Update.svg")}
              />
            </span>
            <span className="menu-text">Camera Status</span>
          </NavLink>
        </li>
        <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
                ADMIN_URL + "/camera-logs"
            )}`}
        >
          <NavLink className="menu-link" to={ADMIN_URL+ "/camera-logs"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="Camera Logs"
                  src={toAbsoluteUrl("/media/svg/icons/Code/Time-schedule.svg")}
              />
            </span>
            <span className="menu-text">Camera Logs</span>
          </NavLink>
        </li>


        {/*custom end*/}
      </ul>
      {/*</BlockUi>*/}
    </>

  );
}
