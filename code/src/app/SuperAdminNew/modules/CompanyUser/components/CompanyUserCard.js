import React, {useEffect, useState} from "react";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {Col, Row} from "reactstrap";
import {CardHeader} from "@mui/material";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";
import {CompanyUserEditDialog} from "./companyUser-details-edit-dialog/CompanyUserEditDialog";
import CompanyUserTable from "./companyUser-details-table/CompanyUserTable";
import {AllCompanyData} from "../../../../../utils/SuperAdmin/enums/CompanyOption";
import {CompanyUserInfoDialog} from "./companyUser-details-edit-dialog/CompanyUserInfoDialog";
import {useNavigate} from "react-router-dom";

export function CompanyUserCard() {

  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [loadingModalData, setLoadingModalData] = useState(false);
  const [infoData, setInfoData] = useState([]);
  const [editModalData, setEditModalData] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();
  const handleAddCompany = () => {
    navigate("/company/company-user/add-company-user");
  }

  useEffect(() => {
    setCurrentItems(AllCompanyData);
  }, [AllCompanyData]);


  const handleServiceAccessStatus = row => {
  };

  const handleInfoCompanyUser = row => {
    setShowInfoModal(true)
    setInfoData(row)
  };
  const handleInfoClose = () => {
    setShowInfoModal(false);
  }
  const handleChangePage = (event, newPage) => {
    setPageNo(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNo(0);
  }
  const handleClose = () => {
    setEditModalData([]);
    setShowModal(false);
  };
  const editModalDataTable = row => {
    setEditModalData(row)
    setShowModal(true);
  };
  const configuredModalDataTable = row => {
    navigate("/company/company-user/configure-user");
  }

  return (
      <>
        <Card className="example example-compact" style={{minHeight: "300px"}}>
          <CardBody style={{minHeight: "300px", padding: "10px 10px"}}>
            <Row>
              <Col xl={8} xs={12} md={7}>
                <CardHeader title="Company User Details"/>
              </Col>
              <Col xl={4} xs={12} md={5} style={{marginTop: "10px"}}>
                <div className="d-flex justify-content-end">
                  <CustomizedButtons
                      size={"medium"}
                      color={"primary"}
                      title={"Add Company"}
                      flag={false}
                      submit={handleAddCompany}
                      style={{width: "100%"}}
                  />
                </div>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col xl={12} style={{padding: "10px 20px", minWidth: "300px"}}>
                {/*{false ? (*/}
                {/*    <TableLoader />*/}
                {/*) : (*/}
                {/*    <>*/}
                {/*      <div>*/}
                <CompanyUserTable
                    currentItems={currentItems}
                    pageNo={pageNo}
                    pageSize={pageSize}
                    onChangeSwitch={handleServiceAccessStatus}
                    handleChangePage={(event, newPage) =>
                        handleChangePage(event, newPage)
                    }
                    handleChangeRowsPerPage={event =>
                        handleChangeRowsPerPage(event)
                    }
                    editModalDataTable={editModalDataTable}
                    configuredModalDataTable={configuredModalDataTable}
                    infoModalDataTable={handleInfoCompanyUser}
                />
                {/*      </div>*/}
                {/*    </>*/}
                {/*)}*/}
              </Col>
            </Row>
          </CardBody>
        </Card>

        {showModal && <> <CompanyUserEditDialog show={showModal} onHide={handleClose}
                                                editModalData={editModalData}
                                                loadingModalData={loadingModalData}/></>}
        {showInfoModal && <> <CompanyUserInfoDialog show={showInfoModal} onHide={handleInfoClose}
                                                    infoData={infoData}/></>}
      </>
  );
}
