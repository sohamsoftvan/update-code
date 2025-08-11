import React, {useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";
import ReactSelectDropDownCommon from "../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {
    AllCameraData,
    AllCameraOption,
    AllCompanyOption,
    AllLocationOption,
    AllModalOption
} from "../../../../../utils/SuperAdmin/enums/CompanyOption";
import CardHeader from "@mui/material/CardHeader";
import AllCameraTable from "./AllCameraTable";
import {CommonCSVDownloader} from "../../../../../utils/SuperAdmin/CommonCSVDownloader";

function AllCameraCard() {

    const [selectedLocation, setSelectedLocation] = useState({
        label: "All Location",
        value: "-1"
    });
    const [locationOptions, setLocationOptions] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState({
        label: "All Camera",
        value: "-1"
    });
    const [cameraOptions, setCameraOptions] = useState([]);
    const [selectedModel, setSelectedModel] = useState({
        label: "All Model",
        value: "-1"
    });
    const [modelOptions, setModelOptions] = useState([]);

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10)
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
        setLocationOptions(AllLocationOption.map(user => ({
            value: user.id,
            label: user.location_name
        })))
    }, [AllLocationOption]);

    useEffect(() => {
        setCameraOptions(AllCameraOption.map(user => ({
            value: user.id,
            label: user.camera_name
        })))
    }, [AllCameraOption]);
    useEffect(() => {
        setModelOptions(AllModalOption.map(user => ({
            value: user.id,
            label: user.model_name
        })))
    }, [AllModalOption]);

    const handleChangeLocation = (select) => {
        setSelectedLocation(select);
    }
    const handleChangeCamera = (select) => {
        setSelectedCamera(select);
    }
    const handleChangeModel = (select) => {
        setSelectedModel(select);
    }
    const applyFilter = () => {

    }
    const clearFilter = () => {
        setSelectedCamera({label: "All Camera", value: "-1"});
        setSelectedLocation({label: "All Location", value: "-1"});
        setSelectedModel({label: "All Modal", value: "-1"});
    }


    useEffect(() => {
        setCurrentItems(AllCameraData);
    }, [AllCameraData]);


    const handleChangePage = (event, newPage) => {
        setPageNo(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNo(0);
    }
    const csvFields = {
        index: "#",
        location_name: "Location Name",
        camera_name: "Camera Name",
        modal_name: "Modal Name"
    };
    const getCsvData = data => {
        return data?.map((d, idx) => ({
            index: idx + 1,
            camera_name: d.camera_name,
            location_name: d.location_details.location_name,
            modal_name: d.ai_model_details.model_details.model_name
        }));
    };

    return (

        <Card className="example example-compact" style={{minHeight: "300px"}}>
            <CardBody style={{minHeight: "300px", padding: "10px 10px"}}>
                <Row>
                    <Col xl={9} xs={12} md={7}>
                        <CardHeader title="All Camera"/>
                    </Col>
                    <Col xl={3} xs={12} md={5} style={{marginTop: "10px", justifyContent: "flex-end"}}>
                        <ReactSelectDropDownCommon
                            isSearchable={true}
                            placeholder="Select Company"
                            value={selectedCompany}
                            onChange={handleChangeCompany}
                            options={companyOptions}
                        />

                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xl={3} xs={12} md={6} sm={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="mb-4">Select Location</Form.Label>
                            <ReactSelectDropDownCommon
                                placeholder="Select Location"
                                value={selectedLocation}
                                onChange={handleChangeLocation}
                                options={locationOptions}
                                isMulti={true}
                                isSearchable={true}
                            />
                        </Form.Group>
                    </Col>
                    <Col xl={3} xs={12} md={6} sm={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="mb-4">Select Camera</Form.Label>
                            <ReactSelectDropDownCommon
                                placeholder="Select Camera"
                                value={selectedCamera}
                                onChange={handleChangeCamera}
                                options={cameraOptions}
                                isMulti={true}
                                isSearchable={true}
                            />
                        </Form.Group>
                    </Col>
                    <Col xl={3} xs={12} md={6} sm={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="mb-4">Select Model</Form.Label>
                            <ReactSelectDropDownCommon
                                placeholder="Select Model"
                                value={selectedModel}
                                onChange={handleChangeModel}
                                options={modelOptions}
                                isMulti={true}
                                isSearchable={true}
                            />
                        </Form.Group>
                    </Col>
                    <Col xl={3} xs={12} md={12} sm={12}>
                        <div className={"d-flex mr-2 mt-9"}>
                            <CustomizedButtons
                                size={"medium"}
                                color={"primary"}
                                title={"Apply Filter"}
                                flag={false}
                                submit={applyFilter}
                                style={{width: "100%"}}
                                className={"mr-2"}
                            />
                            <CustomizedButtons
                                size={"medium"}
                                color={"secondary"}
                                title={"Reset filter"}
                                flag={false}
                                submit={clearFilter}
                                style={{width: "100%"}}
                            />
                        </div>
                    </Col>
                    <Col xl={12} style={{padding: "10px 20px", minWidth: "300px"}}>
                        {/*{false ? (*/}
                        {/*    <TableLoader />*/}
                        {/*) : (*/}
                        {/*    <>*/}
                        {/*      <div>*/}

                        <div className={"mb-3 d-flex justify-content-end"}>
                            <CommonCSVDownloader
                                className="mt-3 text-right"
                                data={getCsvData(currentItems)}
                                filename={"RequestedAllCameraDetails"}
                                fields={csvFields}
                                buttonName={"Download All Camera Details As XLS"}
                            />
                        </div>
                        <AllCameraTable
                            currentItems={currentItems}
                            pageNo={pageNo}
                            pageSize={pageSize}
                            handleChangePage={(event, newPage) =>
                                handleChangePage(event, newPage)
                            }
                            handleChangeRowsPerPage={event =>
                                handleChangeRowsPerPage(event)
                            }
                        />
                        {/*      </div>*/}
                        {/*    </>*/}
                        {/*)}*/}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default AllCameraCard;
