import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import {  toAbsoluteUrl } from "../../../../_helpers";

export function SuperAdminMenuList({ layoutProps }) {
  const location = useLocation();


  const getMenuItemActive = (paths, hasSubmenu = false, exactMatch = false) => {
    const pathsArray = Array.isArray(paths) ? paths : [paths];

    const isActive = exactMatch
        ? pathsArray.some(path => location.pathname === path)
        : pathsArray.some(path => location.pathname.startsWith(path));

    if (isActive) {
      if (hasSubmenu) {
        return "menu-item-open";
      } else {
        return "menu-item-active menu-item-open";
      }
    }
    return "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
            className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>

        <li
            className={`menu-item ${getMenuItemActive("/users/userPage", false)}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/users/userPage">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
            </span>
            <span className="menu-text">Users</span>
          </NavLink>
        </li>

        <li
            className={`menu-item ${getMenuItemActive("/device", false)}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/device">
            <span className="svg-icon menu-icon">
              <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Devices/Display1.svg")}
              />
            </span>
            <span className="menu-text">Device</span>
          </NavLink>
        </li>

        <li
            className={`menu-item ${getMenuItemActive("/modelType", false)}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/modelType">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Polygon.svg")} />
            </span>
            <span className="menu-text">Model Type</span>
          </NavLink>
        </li>
        <li
            className={`menu-item ${getMenuItemActive(
                "/frameworkDetails",
                false
            )}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/frameworkDetails">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Target.svg")} />
            </span>
            <span className="menu-text">Framework Details</span>
          </NavLink>
        </li>
        <li
            className={`menu-item ${getMenuItemActive("/deploymentType", false)}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/deploymentType">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Devices/Server.svg")} />
            </span>
            <span className="menu-text">Deployment Type</span>
          </NavLink>
        </li>

        <li
            className={`menu-item ${getMenuItemActive("/inferJobs", false)}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/inferJobs">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Join-1.svg")} />
            </span>
            <span className="menu-text">Infer Jobs</span>
          </NavLink>
        </li>

        <li
            className={`menu-item ${getMenuItemActive(
                "/deploymentDetails",
                false
            )}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/deploymentDetails">
            <span className="svg-icon menu-icon">
              <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Navigation/Sign-in.svg")}
              />
            </span>
            <span className="menu-text">Deployment Details</span>
          </NavLink>
        </li>

        <li
            className={`menu-item ${getMenuItemActive(
                "/deployedDetails",
                false
            )}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/deployedDetails">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Weather/Cloud1.svg")} />
            </span>
            <span className="menu-text">Deployed Details</span>
          </NavLink>
        </li>


        <li
            className={`menu-item ${getMenuItemActive(
                "/NotificationSend",
                false
            )}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/NotificationSend">
              <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Notifications1.svg")} />
            </span>
            <span className="menu-text">Notifcaiton Send</span>
          </NavLink>
        </li>

        {/*<li
                    className={`menu-item ${getMenuItemActive("/myResult", false)}`}
                    aria-haspopup="true"
                >
                    <NavLink className="menu-link" to="/myResult">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
                        <span className="menu-text">My Result</span>
                    </NavLink>
                </li>*/}
        {/*custom end*/}





        <li
            className={`menu-item ${getMenuItemActive("/locations", false)}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/locations">
            <span className="svg-icon menu-icon">
              <SVG title="Add Locations" src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")} />
            </span>
            <span className="menu-text">Locations</span>
          </NavLink>
        </li>

        <li
            className={`menu-item ${getMenuItemActive("/cameras", false)}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/cameras">
            <span className="svg-icon menu-icon">
              <SVG title="Add cameras" src={toAbsoluteUrl("/media/svg/icons/Devices/Video-camera.svg")} />
            </span>
            <span className="menu-text">Cameras</span>
          </NavLink>
        </li>

        <li
            className={`menu-item ${getMenuItemActive("/addSupervisor", false)}`}
            aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/addSupervisor">
            <span className="svg-icon menu-icon">
              <SVG title="Add Supervisor" src={toAbsoluteUrl("/media/svg/icons/Communication/Shield-user.svg")} />
            </span>
            <span className="menu-text">Supervisor</span>
          </NavLink>
        </li>



        <li
            className={`menu-item menu-item-rel ${getMenuItemActive(
                "/subscriptions"
            )}`}
        >
          <NavLink className="menu-link" to={"/subscriptions"}>
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
                "/allCamera"
            )}`}
        >
          <NavLink className="menu-link" to={"/allCamera"}>
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
                "/camera-status"
            )}`}
        >
          <NavLink className="menu-link" to={"/camera-status"}>
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
                "/camera-logs"
            )}`}
        >
          <NavLink className="menu-link" to={"/camera-logs"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="Camera Logs"
                  src={toAbsoluteUrl("/media/svg/icons/Code/Time-schedule.svg")}
              />
            </span>
            <span className="menu-text">Camera Logs</span>
          </NavLink>
        </li>


        <li
            className={`menu-item menu-item-submenu ${getMenuItemActive(
                "/company",
                true
            )}`}
            data-menu-toggle="hover"
        >
          <NavLink className="menu-link menu-toggle" to={"/company"}>
            <span className="svg-icon menu-icon">
              <SVG
                  title="UserFlow"
                  src={toAbsoluteUrl("/media/svg/icons/Communication/Group.svg")}
              />
            </span>
            <span className="menu-text">UserFlow</span>
            <i className="menu-arrow"/>
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow"/>
            <ul className="menu-subnav">
              <li
                  className={`menu-item menu-item-submenu ${getMenuItemActive(
                      "/company/company-user",
                      true
                  )}`}
                  data-menu-toggle="hover"
              >
                <NavLink
                    className="menu-link menu-toggle"
                    to={"/company/company-user"}
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span/>
                  </i>
                  <span className="menu-text">Company User</span>
                </NavLink>
              </li>

              <li
                  className={`menu-item menu-item-submenu ${getMenuItemActive(
                      "/company/subscription-model",
                      true
                  )}`}
                  data-menu-toggle="hover"
              >
                <NavLink
                    className="menu-link menu-toggle"
                    to={"/company/subscription-model"}
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span/>
                  </i>
                  <span className="menu-text">Subscription Model</span>
                </NavLink>
              </li>


              <li
                  className={`menu-item menu-item-submenu ${getMenuItemActive(
                      "/company/camera-label-mapping",
                      true
                  )}`}
                  data-menu-toggle="hover"
              >
                <NavLink
                    className="menu-link menu-toggle"
                    to={"/company/camera-label-mapping"}
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span/>
                  </i>
                  <span className="menu-text">Camera Label Mapping</span>
                </NavLink>
              </li>
              <li
                  className={`menu-item menu-item-submenu ${getMenuItemActive(
                      "/company/frame-uploader",
                      true
                  )}`}
                  data-menu-toggle="hover"
              >
                <NavLink
                    className="menu-link menu-toggle"
                    to={"/company/frame-uploader"}
                >
                  <i className="menu-bullet menu-bullet-dot">
                    <span/>
                  </i>
                  <span className="menu-text">Frame Uploader</span>
                </NavLink>
              </li>

            </ul>
          </div>
        </li>


      </ul>
    </>
  );
}
