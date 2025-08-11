import React, {useEffect, useState} from "react";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {Col, Row} from "reactstrap";
import CardHeader from "@mui/material/CardHeader";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";
import {CameraLabelMappingEditDialog} from "./CameraLabelMappingEditDialog";
import CameraLabelMappingTable from "./CameraLabelMappingTable";
import {AllCameraLabelMappingOption} from "../../../../../utils/SuperAdmin/enums/CompanyOption";

export function CameraLabelMappingCard() {

    const [showModal, setShowModal] = useState(false);
    const [loadingModalData, setLoadingModalData] = useState(false);
    const [editModalData, setEditModalData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const handleAddCameraLabelMapping = () => {
        setEditModalData([]);
        setShowModal(true)
    }

    useEffect(() => {
        setCurrentItems(AllCameraLabelMappingOption);
    }, [AllCameraLabelMappingOption]);


    const handleServiceAccessStatus = row => {
        // const newData = {
        //   status: !row?.status
        // };
        // dispatch(action.updateLocationStatuss(newData, row?.id)).then(() => {
        //   if(storedActiveOrganization){
        //     const org_id = JSON.parse(storedActiveOrganization)
        //     dispatch(action.getLocationByOrganizations(org_id?.id));;
        //   }
        // });
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
        //   dispatch(action.getLocationByIds(row?.id))
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
                            <CardHeader title="Camera Lable Mapping Details"/>
                        </Col>
                        <Col xl={4} xs={12} md={5} style={{marginTop: "10px"}}>
                            <div className="d-flex justify-content-end align-items-end">
                                <CustomizedButtons
                                    size={"medium"}
                                    color={"primary"}
                                    title={"Add Label Mapping"}
                                    flag={false}
                                    submit={handleAddCameraLabelMapping}
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
                            <CameraLabelMappingTable
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
                            />
                            {/*      </div>*/}
                            {/*    </>*/}
                            {/*)}*/}
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            {showModal && <> <CameraLabelMappingEditDialog show={showModal} onHide={handleClose}
                                                           editModalData={editModalData}
                                                           loadingModalData={loadingModalData}/></>}
        </>
    );
}