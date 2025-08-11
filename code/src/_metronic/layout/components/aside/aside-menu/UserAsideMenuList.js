/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {useLocation} from "react-router-dom";
import {NavLink} from "react-router-dom";
import SVG from "react-inlinesvg";
import {checkIsActive, toAbsoluteUrl} from "../../../../_helpers";
import {ADMIN_URL} from "../../../../../enums/constant";
import {Event} from "@mui/icons-material";
import {shallowEqual, useSelector} from "react-redux";
import {emailNotValid} from "../../../../../utils/UIHelpers";


export function UserAsideMenuList({layoutProps}) {
    const location = useLocation();

    const {user} = useSelector(
        ({auth}) => ({
            user: auth.user
        }),
        shallowEqual
    );
    const getMenuItemActive = (url, hasSubmenu = false) => {
        return checkIsActive(location, url)
            ? ` ${
                !hasSubmenu && "menu-item-active"
            } menu-item-open menu-item-not-hightlighted`
            : "";
    };

    return (
        <>
            {/* begin::Menu Nav */}
            <ul className={`menu-nav ${layoutProps.ulClasses}`}>
                {user?.user_email === 'topspin_supervisor@tusker.ai' &&
                    <>
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
                    </>}

                {user?.user_email !== 'topspin_supervisor@tusker.ai' &&

                    <>
                        {/*begin::1 Level*/}
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


                        <li
                            className={`menu-item menu-item-rel ${getMenuItemActive(
                                "/my-results"
                            )}`}
                        >
                            <NavLink className="menu-link" to={"/my-results"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="Add Results"
                  src={toAbsoluteUrl("/media/svg/icons/Files/Folder-check.svg")}
              />
            </span>
                                <span className="menu-text">Results</span>
                            </NavLink>
                        </li>

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

                        {!emailNotValid.includes(user?.user_email) && (

                            <li
                                className={`menu-item menu-item-rel ${getMenuItemActive(
                                    "/attendance"
                                )}`}
                            >
                                <NavLink className="menu-link" to={"/attendance"}>
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
                                "/violation"
                            )}`}
                        >
                            <NavLink className="menu-link" to={"/violation"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="View Violation"
                  src={toAbsoluteUrl("/media/svg/icons/Code/Warning-2.svg")}
              />
            </span>
                                <span className="menu-text">Violation</span>
                            </NavLink>
                        </li>)}

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
                            <NavLink className="menu-link" to={ADMIN_URL + "/camera-status"}>
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
                            <NavLink className="menu-link" to={ADMIN_URL + "/camera-logs"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="Camera Logs"
                  src={toAbsoluteUrl("/media/svg/icons/Code/Time-schedule.svg")}
              />
            </span>
                                <span className="menu-text">Camera Logs</span>
                            </NavLink>
                        </li>
                    </>
                }
            </ul>
        </>
    );
}
