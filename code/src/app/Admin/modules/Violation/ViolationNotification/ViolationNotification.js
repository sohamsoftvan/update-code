import React, {useEffect, useState} from "react";
import {warningToast} from "../../../../../utils/ToastMessage";
import BlockUi from "react-block-ui";
import {shallowEqual, useSelector} from "react-redux";
import {headerSortingClasses, sortCaret, toAbsoluteUrl} from "../../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import {ViolationNotificationEditDialog} from "./ViolationNotificationEditDialog";
import {IconButton} from "@mui/material";
import {
  getNotificationServiceSubscribeByUserId,
  updateNotificationServiceUserSubscribeStatus
} from "../../../../SuperAdmin/modules/CompanyService/_redux";
import Cookies from "universal-cookie";
import {CommonBoootstrapTable} from "../../../../../utils/CommonBoootstrapTable";
import {
  CompanyServiceAccessModal
} from "../../../../SuperAdmin/modules/CompanyService/components/company-service-details-table/CompanyServiceAccessModal";
import CustomizedSwitch from "../../../../../utils/SuperAdmin/CustomizedSwitch";

function ViolationNotification({ violationNotification }) {
  const [notificationData, setNotificationData] = React.useState([]);
  const [notificationModalShow, setNotificationModalShow] = React.useState(
    false
  );
  const [pageSize, setPageSize] = useState(5);
  const [pageNo, setPageNo] = useState(1);
  const [serviceSubcribeLoader, setServiceSubcribeLoader] = React.useState(
    false
  );
  const [notificationSubscribeData, setNotificationSubscribeData] = useState(
    []
  );
  const [
    notificationSubscribeDataTotal,
    setNotificationSubscribeDatatotal
  ] = useState(null);
  const [serviceAccess, setServiceAccess] = useState(false);
  const [serviceAccessData, setServiceAccessData] = useState([]);
  const [successIcon, setSuccessIcon] = useState(false);
  const [toggleTitle, setToggleTitle] = useState(
    "Are you sure? to change status"
  );
  const [userStatusLoader, setUserStatusLoader] = useState(false);
  const [serviceUserId, setServiceUserId] = useState(null);

  const { user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user?.id && new Cookies().get("access_token"),
      user: auth.user
    }),
    shallowEqual
  );

  const columns = [
    {
      dataField: "#",
      text: "Index",
      formatter: (cell, row, rowIndex) => {
        return <span>{(pageNo - 1) * pageSize + (rowIndex + 1)}</span>;
      }
    },
    {
      dataField: "vendor_details.name",
      text: "Service Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: "due_date",
      text: "Due Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <>
            <CustomizedSwitch
                checked={row?.service_status}
                onChange={() => handleService(row)}
                color={"primary"}
                className={"cursor-pointer"}
            />

            <IconButton
              aria-label="upload picture"
              component="label"
              className={"btn-hover-primary btn-hover-light-inverse"}
              onClick={() => handleUpdateService(row)}
            >
              <span className="svg-icon svg-icon-md svg-icon-primary">
                <SVG
                  title="Add Config"
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Write.svg"
                  )}
                />
              </span>
            </IconButton>
          </>
        );
      }
    }
  ];

  useEffect(() => {
    setServiceUserId(user?.id);
    getNotificationServiceAllSubscribeByUserId(user?.id, pageNo, pageSize);
  }, []);

  const getNotificationServiceAllSubscribeByUserId = (
    serviceUserId,
    pageNo,
    pageSize
  ) => {
    setServiceSubcribeLoader(true);
    getNotificationServiceSubscribeByUserId(serviceUserId, pageNo, pageSize)
      .then(response => {
        if (response && response.isSuccess) {
          setNotificationSubscribeData(response?.data?.items);
          setPageSize(response?.data?.size);
          setPageNo(response?.data?.page);
          setNotificationSubscribeDatatotal(response?.data?.total);
          setServiceSubcribeLoader(false);
        }
      })
      .catch(e => {
        setServiceSubcribeLoader(false);
        if (e.detail) {
          warningToast(e.detail);
        } else {
          warningToast("Something went wrong");
        }
      });
  };

  const handleService = row => {
    setServiceAccess(true);
    setServiceAccessData(row);
  };

  const handleUpdateService = row => {
    if (row) {
      setNotificationData(row);
      setNotificationModalShow(true);
    }
  };

  const handleServiceAccessClose = () => {
    setServiceAccess(false);
    setSuccessIcon(false);
  };

  const onPageChange = (page, sizePerPage) => {
    setPageNo(page);
    setPageSize(sizePerPage);
  };

  const onSizePerPageChange = (page, sizePerPage) => {
    setPageNo(1);
    setPageSize(sizePerPage);
  };

  const handleServiceAccessStatus = (id, status) => {
    UpdateUserStatusById(id, status);
  };

  const UpdateUserStatusById = (id, status) => {
    setUserStatusLoader(true);
    updateNotificationServiceUserSubscribeStatus(id, !status)
      .then(response => {
        if (response && response.isSuccess) {
          setUserStatusLoader(false);
          setSuccessIcon(true);
          setTimeout(function() {
            handleServiceAccessClose();
            getNotificationServiceAllSubscribeByUserId(
              serviceUserId,
              pageNo,
              pageSize
            );
          }, 1000);
        }
      })
      .catch(e => {
        setUserStatusLoader(false);
        warningToast("Something went wrong");
      });
  };

  const handleback = () => {
    violationNotification();
  };

  return (
    <>
      <div>
        <IconButton
          aria-label="upload picture"
          component="label"
          className={"btn-hover-primary btn-hover-light-inverse"}
          onClick={() => handleback()}
        >
          <span className="svg-icon svg-icon-lg svg-icon-primary">
            <SVG
              title="Attendance Info"
              src={toAbsoluteUrl("/media/svg/icons/Navigation/Arrow-left.svg")}
            />
          </span>
        </IconButton>
      </div>

      <BlockUi tag="div" blocking={serviceSubcribeLoader} color="#147b82">
        {notificationSubscribeData.length > 0 ? (
          <>
            <CommonBoootstrapTable
              sizePerPageList={[{ text: "5", value: 5 }]}
              hideSizePerPage={false}
              showTotal={true}
              alwaysShowAllBtns={true}
              hidePageListOnlyOnePage={true}
              columns={columns}
              data={notificationSubscribeData}
              sizePerPage={pageSize}
              page={pageNo}
              totalSize={notificationSubscribeDataTotal}
              onTableChange={onPageChange}
              sizePerPageChange={onSizePerPageChange}
            />
          </>
        ) : (
          <>
            {" "}
            <h5 style={{ textAlign: "center" }}>No Data Found</h5>
          </>
        )}
      </BlockUi>

      <CompanyServiceAccessModal
        showAlert={serviceAccess}
        handleAccessUserClose={handleServiceAccessClose}
        handleUserStatus={(id, status) => handleServiceAccessStatus(id, status)}
        id={serviceAccessData?.id}
        status={serviceAccessData?.service_status}
        userStatusLoader={userStatusLoader}
        successIcon={successIcon}
      />

      <ViolationNotificationEditDialog
        show={notificationModalShow}
        data={notificationData}
        getApiCallId={notificationData.id}
        onHide={() => setNotificationModalShow(false)}
        disable={true}
        // serviceUserId={serviceUserId}
      />
    </>
  );
}

export default ViolationNotification;
