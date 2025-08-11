import React, { useEffect, useState } from "react";
import {Row} from "react-bootstrap";
import {
  headerSortingClasses,
  sortCaret,
  toAbsoluteUrl
} from "../../../../../../_metronic/_helpers";
import ServiceAdd from "./ServiceAdd";
import SVG from "react-inlinesvg";
import { IconButton } from "@mui/material";
import { ViolationNotificationEditDialog } from "../../../../../Admin/modules/Violation/ViolationNotification/ViolationNotificationEditDialog";
import { warningToast } from "../../../../../../utils/ToastMessage";
import {
  getNotificationServiceSubscribeByUserId,
  updateNotificationServiceUserSubscribeStatus
} from "../../_redux";
import BlockUi from "react-block-ui";
import { CommonBoootstrapTable } from "../../../../../../utils/CommonBoootstrapTable";
import { CompanyServiceAccessModal } from "./CompanyServiceAccessModal";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import CustomizedSwitch from "../../../../../../utils/SuperAdmin/CustomizedSwitch";

function CompanyServiceModal({
  serviceModalShow,
  handleServiceClose,
  serviceUserId
}) {
  const [showAddSerivceModal, setShowAddSerivceModal] = useState(false);
  const [notificationSubscribeData, setNotificationSubscribeData] = useState(
    []
  );
  const [pageSize, setPageSize] = useState(5);
  const [pageNo, setPageNo] = useState(1);
  const [
    notificationSubscribeDataTotal,
    setNotificationSubscribeDatatotal
  ] = useState(null);
  const [notificationData, setNotificationData] = React.useState([]);
  const [notificationModalShow, setNotificationModalShow] = React.useState(
    false
  );
  const [serviceSubcribeLoader, setServiceSubcribeLoader] = React.useState(
    false
  );
  const [serviceAccess, setServiceAccess] = useState(false);
  const [serviceAccessData, setServiceAccessData] = useState([]);
  const [successIcon, setSuccessIcon] = useState(false);
  const [userStatusLoader, setUserStatusLoader] = useState(false);

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

  const handleUpdateService = row => {
    if (row) {
      setNotificationData(row);
      setNotificationModalShow(true);
    }
  };

  useEffect(() => {
    if (serviceModalShow) {
      getNotificationServiceAllSubscribeByUserId(
        serviceUserId,
        pageNo,
        pageSize
      );
    }
  }, [serviceModalShow]);

  const handleService = row => {
    setServiceAccess(true);
    setServiceAccessData(row);
  };

  const handleServiceAccessClose = () => {
    setServiceAccess(false);
    setSuccessIcon(false);
  };

  const onHideAddServiceModal = () => {
    setShowAddSerivceModal(false);
  };

  const addServiceModal = () => {
    setShowAddSerivceModal(true);
  };

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

  const onPageChange = (page, sizePerPage) => {
    setPageNo(page);
    setPageSize(sizePerPage);
  };

  const onSizePerPageChange = (page, sizePerPage) => {
    setPageNo(1);
    setPageSize(sizePerPage);
  };

  useEffect(() => {
    if (serviceUserId && pageNo && pageSize) {
      getNotificationServiceAllSubscribeByUserId(
        serviceUserId,
        pageNo,
        pageSize
      );
    }
  }, [pageNo, pageSize]);

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

  return (
    <>
      <CommonModal
          size="xl"
          show={serviceModalShow}
          handleClose={handleServiceClose}
          arialabelledby="contained-modal-title-vcenter"
          title={"Services"}
          style={{ background: "#00000080" }}
          closeButtonFlag={true}
          applyButton={false}
          content={
            <>
              <Row>
                <div className={"col-12 d-flex mb-5"}>
                  <div className={"col-xl-3"}>
                    <input
                        style={{ width: "auto" }}
                        type="text"
                        className="form-control"
                        name="searchText"
                        placeholder="Search For Name"
                        // onChange={onChangeHandler}
                        // ref={reference}
                    />
                  </div>
                  <div className={"col-xl-9"}>
                    <button
                        type="submit"
                        onClick={() => addServiceModal()}
                        className="btn btn-primary btn-elevate float-right "
                    >
                      Add Service
                    </button>
                  </div>
                </div>
              </Row>

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

            </>
          }
      />


      <ServiceAdd
        addSerivceModalShow={showAddSerivceModal}
        onHideAddServiceModal={onHideAddServiceModal}
        serviceUserId={serviceUserId}
        getNotificationServiceAllSubscribeByUserId={
          getNotificationServiceAllSubscribeByUserId
        }
      />

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
        disable={false}
        serviceUserId={serviceUserId}
      />
    </>
  );
}

export default CompanyServiceModal;
