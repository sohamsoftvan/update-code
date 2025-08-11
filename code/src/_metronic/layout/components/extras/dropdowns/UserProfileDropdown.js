/* eslint-disable */
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import {shallowEqual, useSelector} from "react-redux";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";
import {Col, Row} from "react-bootstrap";

export function UserProfileDropdown() {
  const { user } = useSelector((state) => state.auth);
  const uiService = useHtmlClassService();
  const regexImage = /\.(gif|jpe?g|tiff?|png|webp|bmp|ico|svg)$/i
  const layoutProps = useMemo(() => {
    return {
      light:
        objectPath.get(uiService.config, "extras.user.dropdown.style") !==
        "light",
    };
  }, [uiService]);
  const {userRole} = useSelector(
      ({auth}) => ({
        userRole: auth.user?.roles?.length && auth.user.roles[0]?.role
      }),
      shallowEqual
  );

  return (
      <Dropdown drop="down" alignRight>
        <Dropdown.Toggle
            as={DropdownTopbarItemToggler}
            id="dropdown-toggle-user-profile"
        >
          {userRole !== "superadmin" && userRole !== "resultmanager" ?
          <div
          >
          <span>
            Hi,
          </span>{" "}
{/*
            <span className="opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4">
*/}
            <span className="font-weight-bolder">
            {user?.company?.company_name}
            </span>{" "}
            <span className="symbol symbol-35">
              <span className="text-white symbol-label font-size-h5 font-weight-bold cursor-pointer" style={{backgroundColor : "#147b82"}}>
              {user?.company?.company_name[0]}
            </span>
          </span>
          </div> :
              <div className="navi-footer px-8 py-5 text-right">
                <Link
                    to="/logout"
                    className="btn btn-light-primary font-weight-bold"
                >
                  Sign Out
                </Link>
              </div>}
        </Dropdown.Toggle>
        <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
          <>
            {/** ClassName should be 'dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */}
            {layoutProps.light && (
                <>
                  <div className="d-flex align-items-center p-8 rounded-top" style={{height : '100px'}}>
                    <Row>
                      <Col xl={4} xs={12} md={12} lg={12} sm={12} >
                        <div className="">
                          <img
                              className=""
                              style={{
                                width: window.location.host === "demo.urhiro.com" ? '95px' : '95px',
                                height: window.location.host === "demo.urhiro.com" ? '50px' : '100px'
                              }}
                              alt="Logo"
                              src={userRole !== "superadmin" && userRole !== "resultmanager" && (regexImage).test(user?.company?.company_description) ?
                                  user?.company?.company_description : window.location.host === "beta.tusker.ai" ? toAbsoluteUrl("/media/logos/logo-letter-1.png") :
                                      window.location.host === "vision.newra.ai" ? toAbsoluteUrl("/media/logos/Newra_Logo_Blue.svg"):window.location.host === "demo.urhiro.com" ? toAbsoluteUrl("/media/logos/HiRO_logo_black.png") : toAbsoluteUrl("/media/logos/logo-letter-1.png")   }
                          />
                        </div>
                      </Col>
                      <Col xl={6} xs={12} md={12} lg={12} sm={12}
                        className={`${window.location.host === "demo.urhiro.com" ? "mt-2 ml-2" : "user-profile-name ml-2"}`} >
                        <div className="font-weight-bolder">
                          {userRole !== "superadmin" && userRole !== "resultmanager" && user.company.company_name}
                        </div>
                        <div className="email-wrap">
                          {userRole !== "superadmin" && userRole !== "resultmanager" && user.user_email}
                        </div>

                      </Col>
                    </Row>
                  </div>

                </>
            )}
          </>
          <hr className="m-0" />

          {/*<div className="navi navi-spacer-x-0 pt-5">
          <Link to="/user-profile" className="navi-item px-8 cursor-pointer">
            <div className="navi-link">
              <div className="navi-icon mr-2">
                <i className="flaticon2-calendar-3 text-success" />
              </div>
              <div className="navi-text">
                <div className="font-weight-bold cursor-pointer">
                  My Profile
                </div>
              </div>
            </div>
          </Link>
        </div>*/}
          {/*<div className="navi navi-spacer-x-0 pt-5 user-profile-line">*/}
          {/*  <div className="separator separator-solid"></div>*/}
          {/*  <Link to="/feedbacks" className="navi-item px-8 cursor-pointer">*/}
          {/*    <div className="navi-link">*/}
          {/*      <div className="navi-icon mr-2">*/}
          {/*        <i className="flaticon-chat text-primary" />*/}
          {/*      </div>*/}
          {/*      <div className="navi-text">*/}
          {/*        <div className="font-weight-bold cursor-pointer">*/}
          {/*          Feedback*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Link>*/}
          {/*</div>*/}

          {/*<div className="navi navi-spacer-x-0 pt-5">*/}
          {/*  <Link to="/complaints" className="navi-item px-8 cursor-pointer">*/}
          {/*    <div className="navi-link">*/}
          {/*      <div className="navi-icon mr-2">*/}
          {/*        <i className="flaticon2-speaker text-danger" />*/}
          {/*      </div>*/}
          {/*      <div className="navi-text">*/}
          {/*        <div className="font-weight-bold cursor-pointer">*/}
          {/*          Complaint*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Link>*/}
          {/*</div>*/}

          <div className="navi-footer px-8 mt-3 mb-3 text-right">
            <Link
                to="/logout"
                className="btn btn-light-primary font-weight-bold"
            >
              Sign Out
            </Link>
          </div>
        </Dropdown.Menu>
      </Dropdown>
  );
}
