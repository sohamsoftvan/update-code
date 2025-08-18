/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
/* eslint-disable */
import React, { useState, useMemo, Fragment, useEffect } from "react";
import { Nav, Tab, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  addCameraNotification,
  getCameraNotification,
  updateCameraNotification,
} from "../../../../../app/Admin/modules/Notification/_redux/notification";
import { successToast, warningToast } from "../../../../../utils/ToastMessage";
import BlockUi from "react-block-ui";
import { Container } from "reactstrap";
import * as moment from "moment";
import {useNavigate} from "react-router-dom";
const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false,
};

export function UserNotificationsDropdown() {
  const [key, setKey] = useState("Alerts");
  const [data, setdata] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [blocking, setblocking] = useState(false);
  const [viewAllBtn, setShowViewALl] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const bgImage = toAbsoluteUrl("/media/misc/bg-1.jpg");
  let navigate = useNavigate();
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
          objectPath.get(uiService.config, "extras.notifications.layout") ===
          "offcanvas",
    };
  }, [uiService]);

  let bell;

  useEffect(() => {
    getAllNotifications1();
  }, []);

  // Add effect to handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.dropdown')) {
        setShowDropdown(false);
        // Mark notifications as read when closing
        let ids = viewData.map((item) => item.id);
        if (ids.length > 0) {
          readNotifications(ids);
        }
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown, viewData]);

  const getAllNotifications1 = (all) => {
    getCameraNotification()
        .then((response) => {
          if (response && response.isSuccess) {
            let data = response.data.filter((el) => el.is_unread);
            setCounter(data.length || 0);
            setdata(data);
            let view = data;
            if (!all) {
              view = (data && data.slice(0, 3)) || [];
              if (data.length > 3) {
                setShowViewALl(true);
              }
            } else {
              setShowViewALl(false);
            }
            setViewData(view);
          }
        })
        .catch((error) => {
          console.log("error", error);
          /*        if (error.detail) {
            warningToast(error.detail);
          } else {
            warningToast("Something went Wrong");
          }*/
        });
  };

  const getCounts = () => {
    getCameraNotification()
        .then((response) => {
          if (response && response.isSuccess) {
            let data = response.data.filter((el) => el.is_unread);
            setCounter(data.length || 0);
          }
        })
        .catch((error) => {
          /*        if (error.detail) {
            warningToast(error.detail);
          } else {
            warningToast("Something went Wrong");
          }*/
        });
  };

  const viewAllNotifications = () => {
    getAllNotifications1(true);
  };

  const toggleNotificationDropdown = () => {};

  const readNotifications = (ids) => {
    updateCameraNotification(ids).then((response) => {
      if (response && response.isSuccess) {
        getCounts();
      }
    });
  };

  // Replace toggleDropdown with a more reliable toggle function
  const handleToggleClick = () => {
    const newStatus = !showDropdown;
    setShowDropdown(newStatus);

    if (newStatus) {
      // Dropdown is opening, fetch fresh notifications
      getAllNotifications1();
    } else {
      // Dropdown is closing, mark notifications as read
      let ids = viewData.map((item) => item.id);
      if (ids.length > 0) {
        readNotifications(ids);
      }
    }
  };

  const handleViewAllClick = () => {
    setShowDropdown(false);
    navigate("/allNotification");
  };

  return (
      <>
        <Dropdown
            drop="down"
            alignRight
            show={showDropdown}
            className="dropdown"
        >
          <Dropdown.Toggle
              as={DropdownTopbarItemToggler}
              id="kt_quick_notifications_toggle"
              onClick={handleToggleClick}
          >
            <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="user-notification-tooltip">User Notifications</Tooltip>}
            >
              <div className="btn btn-icon btn-hover-transparent-white btn-dropdown btn-lg mr-1 pulse pulse-primary">
              <span className="svg-icon svg-icon-xl">
                <NotificationsNoneIcon color={"primary"} />
                {counter && counter > 0 ? (
                    <>
                      <span className={"notification-counter"}>{counter}</span>
                    </>
                ) : (
                    <span className="pulse-p1"></span>
                )}
              </span>
                {counter && counter > 0 ? <span className="pulse-ring" /> : ""}
              </div>
            </OverlayTrigger>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
            <form>
              {/** Head */}
              <BlockUi tag="div" blocking={blocking} color="#014f9f">
                <div
                    className="d-flex flex-column pt-10 bgi-size-cover bgi-no-repeat rounded-top"
                    style={{
                      backgroundImage:
                          "linear-gradient(to bottom right, #147b82, #147b82)",
                    }}
                >
                  <h4 className="d-flex flex-center rounded-top">
                    <span className="text-white ">Notifications</span>
                    <span className="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">
                      <a
                          className={"mt-2"}
                          style={{ cursor: 'pointer', color: 'white' }}
                          onClick={handleViewAllClick}
                      >
                        View All
                      </a>
                    </span>
                  </h4>

                  <Tab.Container defaultActiveKey={key}>
                    <Nav
                        as="ul"
                        className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
                        onSelect={(_key) => setKey(_key)}
                    ></Nav>
                    <Tab.Content className="tab-content">
                      {/* <span className="text-white d-flex  pr-3 flex-row-reverse">
                         </span>*/}
                      <Tab.Pane eventKey="Alerts" className="p-4">
                        <PerfectScrollbar
                            options={perfectScrollbarOptions}
                            className="scroll pr-4 mr-n4"
                            style={{
                              maxHeight: "400px",
                              position: "relative",
                              height: "auto",
                            }}
                        >
                          {viewData && viewData.length > 0 ? (
                              viewData.map((key, value) => (
                                  <div key={key.id || value} className="d-flex align-items-center mb-6">
                                    <div className="symbol symbol-40 symbol-light-primary mr-5">
                                  <span className="symbol-label">
                                    <SVG
                                        src={toAbsoluteUrl(
                                            "/media/svg/icons/Home/Library.svg"
                                        )}
                                        className="svg-icon-lg svg-icon-primary"
                                    ></SVG>
                                  </span>
                                    </div>
                                    <div className="d-flex flex-column font-weight-bold">
                                      <a
                                          href="#"
                                          className="text-dark text-hover-primary mb-1 font-size-lg"
                                      ></a>
                                      {key.notification_message}

                                      <span className="text-muted">
                                    {moment
                                        .utc(key.created_date)
                                        .local()
                                        .format("MMMM DD YYYY, h:mm:ss a")}
                                  </span>
                                    </div>
                                  </div>
                              ))
                          ) : (
                              <div className={"text-center"}>
                                No Notifications Available
                              </div>
                          )}
                        </PerfectScrollbar>

                        {viewAllBtn && (
                            <div
                                className="footer  text-center"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  viewAllNotifications();
                                  setShowDropdown(false);
                                }}
                            >
                              <div
                                  className="text-dark"
                                  style={{ fontWeight: "600" }}
                              >
                              <span className="svg-icon svg-icon-xl text-dark">
                                <SVG
                                    src={toAbsoluteUrl(
                                        "/media/svg/icons/Navigation/Angle-double-down.svg"
                                    )}
                                />
                              </span>
                              </div>
                            </div>
                        )}
                      </Tab.Pane>
                      <Tab.Pane
                          eventKey="Events"
                          id="topbar_notifications_events"
                      >
                        <PerfectScrollbar
                            options={perfectScrollbarOptions}
                            className="navi navi-hover scroll my-4"
                            style={{ maxHeight: "300px", position: "relative" }}
                        >
                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon2-line-chart text-success"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  New report has been received
                                </div>
                                <div className="text-muted">23 hrs ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon2-paper-plane text-danger"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  Finance report has been generated
                                </div>
                                <div className="text-muted">25 hrs ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon2-user flaticon2-line- text-success"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  New order has been received
                                </div>
                                <div className="text-muted">2 hrs ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon2-pin text-primary"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  New customer is registered
                                </div>
                                <div className="text-muted">3 hrs ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon2-sms text-danger"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  Application has been approved
                                </div>
                                <div className="text-muted">3 hrs ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon2-pie-chart-3 text-warning"></i>
                              </div>
                              <div className="navinavinavi-text">
                                <div className="font-weight-bold">
                                  New file has been uploaded
                                </div>
                                <div className="text-muted">5 hrs ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon-pie-chart-1 text-info"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  New user feedback received
                                </div>
                                <div className="text-muted">8 hrs ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon2-settings text-success"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  System reboot has been successfully completed
                                </div>
                                <div className="text-muted">12 hrs ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon-safe-shield-protection text-primary"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  New order has been placed
                                </div>
                                <div className="text-muted">15 hrs ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon2-notification text-primary"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  Company meeting canceled
                                </div>
                                <div className="text-muted">19 hrs ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon2-fax text-success"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  New report has been received
                                </div>
                                <div className="text-muted">23 hrs ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon2-download-1 text-danger"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  Finance report has been generated
                                </div>
                                <div className="text-muted">25 hrs ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon-security text-warning"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  New customer comment recieved
                                </div>
                                <div className="text-muted">2 days ago</div>
                              </div>
                            </div>
                          </a>

                          <a href="#" className="navi-item">
                            <div className="navi-link">
                              <div className="navi-icon mr-2">
                                <i className="flaticon2-analytics-1 text-success"></i>
                              </div>
                              <div className="navi-text">
                                <div className="font-weight-bold">
                                  New customer is registered
                                </div>
                                <div className="text-muted">3 days ago</div>
                              </div>
                            </div>
                          </a>
                        </PerfectScrollbar>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Logs" id="topbar_notifications_logs">
                        <div className="d-flex flex-center text-center text-muted min-h-200px">
                          All caught up!
                          <br />
                          No new notifications.
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </BlockUi>
            </form>
          </Dropdown.Menu>
        </Dropdown>
      </>
  );
}
