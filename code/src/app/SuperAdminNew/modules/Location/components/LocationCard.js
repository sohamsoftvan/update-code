import React, {useEffect, useState} from "react";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {Col, Row} from "reactstrap";
import CardHeader from "@mui/material/CardHeader";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";
import {LocationEditDialog} from "./location-details-edit-dialog/LocationEditDialog";
import ReactSelectDropDownCommon from "../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import LocationTable from "./location-details-table/LocationTable";
import {fireAlert} from "../../../../../utils/SuperAdmin/SweetAlert";
import {FireAlertMessage} from "../../../../../utils/SuperAdmin/enums/firAlert.enums";
import {AllCompanyOption, AllLocationOption} from "../../../../../utils/SuperAdmin/enums/CompanyOption";

export function LocationCard() {

    const [showModal, setShowModal] = useState(false);

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [loadingModalData, setLoadingModalData] = useState(false);

    const [editModalData, setEditModalData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const handleAddLocation = () => {
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
        setCurrentItems(AllLocationOption);
    },[AllLocationOption]);


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

    const handleDeleteLocation = row => {
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
                            <CardHeader title="Location Details"/>
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
                                        title={"Add Location Details"}
                                        flag={false}
                                        submit={handleAddLocation}
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
                            <LocationTable
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
                                deleteModalDataTable={handleDeleteLocation}
                            />
                            {/*      </div>*/}
                            {/*    </>*/}
                            {/*)}*/}
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            {showModal && <> <LocationEditDialog show={showModal} onHide={handleClose} selectedCompany={selectedCompany}
                                                 editModalData={editModalData} loadingModalData={loadingModalData}/></>}
        </>
    );
}

// const currentItems = [
//     {
//         "location_name": "Admin",
//         "company_id": 79,
//         "status": true,
//         "id": 84,
//         "created_date": "2024-04-04T07:19:49",
//         "updated_date": "2024-12-23T12:46:38"
//     },
//     {
//         "location_name": "Store",
//         "company_id": 79,
//         "status": true,
//         "id": 96,
//         "created_date": "2024-12-23T12:48:23",
//         "updated_date": "2024-12-23T12:48:23"
//     },
//     {
//         "location_name": "Gloves Production",
//         "company_id": 79,
//         "status": true,
//         "id": 97,
//         "created_date": "2024-12-23T12:48:35",
//         "updated_date": "2024-12-23T12:48:35"
//     },
//     {
//         "location_name": "GMDCA Production",
//         "company_id": 79,
//         "status": false,
//         "id": 98,
//         "created_date": "2024-12-23T12:48:48",
//         "updated_date": "2024-12-23T12:48:48"
//     },
//     {
//         "location_name": "Toolroom",
//         "company_id": 79,
//         "status": true,
//         "id": 99,
//         "created_date": "2024-12-23T12:49:10",
//         "updated_date": "2024-12-23T12:49:10"
//     },
//     {
//         "location_name": "Maintenance",
//         "company_id": 79,
//         "status": false,
//         "id": 100,
//         "created_date": "2024-12-23T12:49:19",
//         "updated_date": "2024-12-23T12:49:19"
//     }
// ]