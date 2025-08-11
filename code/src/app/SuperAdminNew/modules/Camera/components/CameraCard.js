import React, {useEffect, useState} from "react";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {Col, Row} from "reactstrap";
import {CardHeader} from "@mui/material";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";
import {CameraEditDialog} from "./camera-details-edit-dialog/CameraEditDialog";
import ReactSelectDropDownCommon from "../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import {AllCameraOption, AllCompanyOption} from "../../../../../utils/SuperAdmin/enums/CompanyOption";
import CameraTable from "./camera-details-table/CameraTable";
import {fireAlert} from "../../../../../utils/SuperAdmin/SweetAlert";
import {FireAlertMessage} from "../../../../../utils/SuperAdmin/enums/firAlert.enums";

export function CameraCard() {

    const [showModal, setShowModal] = useState(false);

    const [selectedCompany, setSelectedCompany] = useState(null);

    const [companyOptions, setCompanyOptions] = useState([]);
    const [loadingModalData, setLoadingModalData] = useState(false);

    const [editModalData, setEditModalData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const handleAddCamera = () => {
        setEditModalData([]);
        setShowModal(true)
    }
    const handleChangeCompany = (option) => {
        setSelectedCompany(option);
    }
    useEffect(() => {
        const allCompanyData = AllCompanyOption.map(user => ({
            value: user.id,
            company_id: user.company?.id,
            label: user.company?.company_name
        }))
        setCompanyOptions(allCompanyData);
        setSelectedCompany(allCompanyData[0]);
    }, [AllCompanyOption]);

    useEffect(() => {
      setCurrentItems(AllCameraOption);
    },[AllCameraOption]);


    const handleServiceAccessStatus = row => {
        // const newData = {
        //   status: !row?.status
        // };
        // dispatch(action.updateCameraStatuss(newData, row?.id)).then(() => {
        //   if(storedActiveOrganization){
        //     const org_id = JSON.parse(storedActiveOrganization)
        //     dispatch(action.getCameraByOrganizations(org_id?.id));;
        //   }
        // });
    };

    const handleDeleteCamera = row => {
        fireAlert(
            row,
            FireAlertMessage.delete
        );
    };
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

        // if (isDisabled) {
        //   setLoadingModalData(true);
        //   dispatch(action.getCameraByIds(row?.id))
        //       .then(() => {
        //         setLoadingModalData(false);
        //       })
        //       .catch(() => {
        //         setLoadingModalData(false);
        //       });
        setEditModalData(row)
        setShowModal(true);
        // }
    };

    return (
        <>
            <Card className="example example-compact" style={{minHeight: "300px"}}>
                <CardBody style={{minHeight: "300px", padding: "10px 10px"}}>
                    <Row>
                        <Col xl={8} xs={12} md={7}>
                            <CardHeader title="Camera Details"/>
                        </Col>
                        <Col xl={4} xs={12} md={5} style={{marginTop: "10px"}}>
                            <Row className="align-items-end">
                                <Col xs={12} md={7}>
                                    <ReactSelectDropDownCommon
                                        isSearchable={true}
                                        placeholder="Select Company"
                                        value={selectedCompany}
                                        onChange={handleChangeCompany}
                                        options={companyOptions}
                                    />
                                </Col>
                                <Col xs={12} md={5}>
                                    <CustomizedButtons
                                        size={"medium"}
                                        color={"primary"}
                                        title={"Add Camera Details"}
                                        flag={false}
                                        submit={handleAddCamera}
                                        style={{width: "100%"}}
                                    />
                                </Col>
                            </Row>
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
                            <CameraTable
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
                                // assignedUserData={editModalData}
                                deleteModalDataTable={handleDeleteCamera}
                            />
                            {/*      </div>*/}
                            {/*    </>*/}
                            {/*)}*/}
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            {showModal && <> <CameraEditDialog show={showModal} onHide={handleClose} selectedCompany={selectedCompany}
                                               editModalData={editModalData} loadingModalData={loadingModalData}/></>}
        </>
    );
}
