import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { warningToast } from "../../../../../utils/ToastMessage";
import {
  headerSortingClasses,
  toAbsoluteUrl
} from "../../../../../_metronic/_helpers";
import { Input } from "reactstrap";
import { addNotificationServiceUserConfig } from "../../../../SuperAdmin/modules/CompanyService/_redux";
import BlockUi from "react-block-ui";
import { CommonBoootstrapTable } from "../../../../../utils/CommonBoootstrapTable";
import SVG from "react-inlinesvg";
import CustomizedSwitch from "../../../../../utils/SuperAdmin/CustomizedSwitch";

export function ViolationNotificationEditForm({
  getNotificationServiceConfigByUserID,
  onHide,
  disabled,
  id,
  data,
  pageNo,
  setPageNo,
  pageSize,
  setPageSize,
  totalData,
  serviceConfigData,
  serviceConfigLoader,
  handleUserEdit,
  handleService
}) {
  const [dataEnter, setDataEnter] = useState("");

  const columns = [
    {
      dataField: "#",
      text: "Index",
      formatter: (cell, row, rowIndex) => {
        return <span>{(pageNo - 1) * pageSize + (rowIndex + 1)}</span>;
      }
    },
    {
      dataField: "config",
      text: "Whatsapp  Number",
      sort: true,
      headerSortingClasses
    },
    {
      dataField: "Actions",
      text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <>
            <CustomizedSwitch
                checked={row.service_status}
                onChange={() => handleService(row)}
                color={"primary"}
                className={"cursor-pointer"}
            />

            <div
              className="btn btn-icon mr-4 btn-light btn-hover-primary btn-hover-light-inverse btn-sm mx-3"
              onClick={() => handleUserEdit(cellContent, row)}
            >
              <span className="svg-icon svg-icon-md svg-icon-primary">
                <SVG
                  title="Assign locations"
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Write.svg"
                  )}
                />
              </span>
            </div>
          </>
        );
      }
    }
  ];

  const onPageChange = (page, sizePerPage) => {
    setPageNo(page);
    setPageSize(sizePerPage);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      setDataEnter(event.target.value);
      event.target.value = "";
    }
  };

  useEffect(() => {
    if (dataEnter !== undefined && dataEnter !== null) {
      if (serviceConfigData.length === 0) {
        addNotificationServiceUserByConfig(dataEnter);
      } else {
        const existingValues = serviceConfigData.map(data => data.config);
        if (!existingValues.includes(dataEnter.toString())) {
          addNotificationServiceUserByConfig(dataEnter);
        } else {
          warningToast(dataEnter + " Number Already Stated Service");
        }
      }
    }
  }, [dataEnter]);

  const addNotificationServiceUserByConfig = config => {
    if (data && config) {
      let body = {
        user_vendor_id: data?.id,
        config: config
      };
      addNotificationServiceUserConfig(body)
        .then(response => {
          if (response && response.isSuccess) {
            getNotificationServiceConfigByUserID(id, 1, 5);
          }
        })
        .catch(e => {
          if (e.detail) {
            warningToast(e.detail);
          } else {
            warningToast("Something went wrong");
          }
        });
    }
  };

  return (
    <>
        <Form.Group controlId="number" as={Row}>
          <Form.Label column sm={4}>
            {data?.vendor_details?.name}
          </Form.Label>
          <Col sm={8}>
            <Input
              type="text"
              name="number"
              placeholder={`Enter ${data?.vendor_details?.name}`}
              onKeyPress={e => handleKeyPress(e)}
              disabled={disabled ? true : false}
            />
          </Col>
        </Form.Group>

        <BlockUi tag="div" blocking={serviceConfigLoader} color="#147b82">
          {serviceConfigData.length > 0 && totalData && pageNo && pageSize ? (
            <>
              <CommonBoootstrapTable
                sizePerPageList={[{ text: "5", value: 5 }]}
                hideSizePerPage={true}
                showTotal={true}
                alwaysShowAllBtns={true}
                hidePageListOnlyOnePage={true}
                columns={columns}
                data={serviceConfigData}
                sizePerPage={pageSize}
                page={pageNo}
                totalSize={totalData}
                onTableChange={onPageChange}
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
  );
}
