import React, { useEffect, useState } from "react";
import { ViolationNotificationEditForm } from "./ViolationNotificationEditForm";

import {
  getAllNotificationServiceConfigByUserID,
  updateNotificationServiceUserConfigStatus
} from "../../../../SuperAdmin/modules/CompanyService/_redux";
import { warningToast } from "../../../../../utils/ToastMessage";
import { CompanyServiceAccessModal } from "../../../../SuperAdmin/modules/CompanyService/components/company-service-details-table/CompanyServiceAccessModal";
import WhatsappEdit from "./WhatsappEdit";
import CommonModal from "../../../../../utils/SuperAdmin/CommonModal";

export function ViolationNotificationEditDialog({
  getApiCallId,
  data,
  show,
  onHide,
  disable,
}) {
  const [pageSize, setPageSize] = useState(5);
  const [pageNo, setPageNo] = useState(1);
  const [totalData, setTotalData] = useState(null);
  const [serviceConfigData, setServiceConfigData] = useState([]);
  const [serviceConfigLoader, setServiceConfigLoader] = useState(false);

  const [successIcon, setSuccessIcon] = useState(false);
  const [userAccess, setUserAccess] = useState(false);
  const [userAccessData, setUserAccessData] = useState([]);
  const [userStatusLoader, setUserStatusLoader] = useState(false);

  const [userEditAccess, setUserEditAccess] = useState(false);
  const [userAccessEditData, setUserAccessEditData] = useState("");

  useEffect(() => {
    if (show) {
      getNotificationServiceConfigByUserID(getApiCallId, pageNo, pageSize);
    }
  }, [show, pageNo, pageSize]);

  const getNotificationServiceConfigByUserID = (id, pageNo, pageSize) => {
    setServiceConfigLoader(true);
    getAllNotificationServiceConfigByUserID(id, pageNo, pageSize)
      .then(response => {
        if (response && response.isSuccess) {
          setPageSize(response?.data?.size);
          setPageNo(response?.data?.page);
          setTotalData(response?.data?.total);
          setServiceConfigData(response?.data?.items);
          setServiceConfigLoader(false);
        }
      })
      .catch(e => {
        setServiceConfigLoader(false);
        if (e.detail) {
          warningToast(e.detail);
        } else {
          warningToast("Something went wrong");
        }
      });
  };

  const handleUserEdit = (cellContent, row) => {
    setUserEditAccess(true);
    setUserAccessEditData(row);
  };

  const handleUserEditClose = () => {
    setUserEditAccess(false);
  };

  const handleService = row => {
    setUserAccess(true);
    setUserAccessData(row);
  };

  const handleUserAccessClose = () => {
    setUserAccess(false);
    setSuccessIcon(false);
  };

  const handleUserAccessStatus = (id, status) => {
    UpdateUserStatusById(id, status);
  };

  const handleServiceAccessClose = () => {
    setUserAccess(false);
    setSuccessIcon(false);
  };

  const UpdateUserStatusById = (id, status) => {
    setUserStatusLoader(true);
    updateNotificationServiceUserConfigStatus(id, !status)
      .then(response => {
        if (response && response.isSuccess) {
          setUserStatusLoader(false);
          setSuccessIcon(true);
          setTimeout(function() {
            handleServiceAccessClose();
            getNotificationServiceConfigByUserID(
              getApiCallId,
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
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={data?.vendor_details?.name}
          closeButtonFlag={true}
          applyButton={false}
          keyboard={false}
          style={{ background: "#00000080" }}
          content={
            <>
              <ViolationNotificationEditForm
                  getNotificationServiceConfigByUserID={
                    getNotificationServiceConfigByUserID
                  }
                  onHide={onHide}
                  disabled={disable}
                  data={data}
                  pageNo={pageNo}
                  setPageNo={setPageNo}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  totalData={totalData}
                  serviceConfigData={serviceConfigData}
                  serviceConfigLoader={serviceConfigLoader}
                  handleUserEdit={(cellContent, row) =>
                      handleUserEdit(cellContent, row)
                  }
                  id={getApiCallId}
                  handleService={handleService}
              />

            </>
          }
      />

      <CompanyServiceAccessModal
        showAlert={userAccess}
        handleAccessUserClose={handleUserAccessClose}
        handleUserStatus={(id, status) => handleUserAccessStatus(id, status)}
        id={userAccessData?.id}
        status={userAccessData?.service_status}
        userStatusLoader={userStatusLoader}
        successIcon={successIcon}
      />


      <WhatsappEdit
        show={userEditAccess}
        onHide={handleUserEditClose}
        disabled={disable}
        userAccessEditData={userAccessEditData}
        id={getApiCallId}
        getNotificationServiceConfigByUserID={
          getNotificationServiceConfigByUserID
        }
      />
    </>
  );
}
