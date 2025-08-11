import React, {useEffect, useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";
import ReactSelectDropDownCommon from "../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {
    AllCameraLogStatusData,
    AllCameraOption,
    AllCompanyOption,
    AllLocationOption
} from "../../../../../utils/SuperAdmin/enums/CompanyOption";
import CardHeader from "@mui/material/CardHeader";
import AllCameraLogTable from "./AllCameraLogTable";
import FormDateRangePicker from "../../../../../utils/dateRangePicker/FormDateRangePicker";
import moment from "moment/moment";
import {getCurrentEndDate, getCurrentStartDate} from "../../../../../utils/TimeZone";
import getSelectedDateTimeDefaultValue from "../../../../../utils/dateRangePicker/dateFunctions";
import getSelectedDateTimeDefaultValueForRange from "../../../../../utils/dateRangePicker/dateRangeFunctions";

function AllCameraLogCard() {

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
    const [selectedCameraStatus, setSelectedCameraStatus] = useState({
        label: "All",
        value: "-1"
    });

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10)
    const [selectedIndex, setSelectedIndex] = useState(12);
    const [startDate, setStartDate] = useState(
        moment.utc(getCurrentStartDate()).format()
    );
    const [endDate, setEndDate] = useState(
        moment.utc(getCurrentEndDate()).format()
    );
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
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


    const handleChangeLocation = (select) => {
        setSelectedLocation(select);
    }
    const handleChangeCamera = (select) => {
        setSelectedCamera(select);
    }
    const handleChangeCameraStatus = (select) => {
        setSelectedCameraStatus(select);
    }
    const applyFilter = () => {

    }


    useEffect(() => {
        setCurrentItems(AllCameraLogStatusData);
    }, [AllCameraLogStatusData]);


    const handleChangePage = (event, newPage) => {
        setPageNo(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNo(0);
    }

    const dateTimeRangeChangeHandler = (startDate, endDate) => {
        setStartDate(moment.utc(startDate).format());
        setEndDate(moment.utc(endDate).format());
    };

    const dateTimeRangeIndexChangeHandler = (rangeIndex, value) => {
        let dateVal = getSelectedDateTimeDefaultValue(value);
        let index = getSelectedDateTimeDefaultValueForRange(parseInt(dateVal, 10));
        let min = startDate;
        let max = endDate;
        let minDateNew = minDate;
        let maxDateNew = maxDate;
        if (parseInt(dateVal) === 12) {
            min = parseInt("defaultMin", 0);
            max = parseInt("defaultMax", 0);

            minDateNew = ["min"];
            maxDateNew = ["max"];
        }

        setSelectedIndex(index);
        setStartDate(min);
        setEndDate(max);
        setMinDate(minDateNew);
        setMaxDate(maxDateNew);
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
                    <Col xl={2} xs={12} md={6} sm={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="mb-4">Select Location</Form.Label>
                            <ReactSelectDropDownCommon
                                isSearchable={true}
                                placeholder="Select Location"
                                value={selectedLocation}
                                onChange={handleChangeLocation}
                                options={locationOptions}
                                isMulti={true}
                            />
                        </Form.Group>
                    </Col>
                    <Col xl={2} xs={12} md={6} sm={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="mb-4">Select Camera</Form.Label>
                            <ReactSelectDropDownCommon
                                isSearchable={true}
                                placeholder="Select Camera"
                                value={selectedCamera}
                                onChange={handleChangeCamera}
                                options={cameraOptions}
                                isMulti={true}
                            />
                        </Form.Group>
                    </Col>
                    <Col xl={2} xs={12} md={6} sm={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="mb-4">Select Status</Form.Label>
                            <ReactSelectDropDownCommon
                                isSearchable={true}
                                placeholder="Select Model"
                                value={selectedCameraStatus}
                                onChange={handleChangeCameraStatus}
                                options={statusOptions}
                                isMulti={false}
                            />
                        </Form.Group>
                    </Col>
                    <Col xl={4} xs={12} md={12} sm={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="mb-4">Select Date Range</Form.Label>
                            <FormDateRangePicker
                                rangeIndex={selectedIndex}
                                minDate={minDate}
                                maxDate={maxDate}
                                startDate={startDate}
                                endDate={endDate}
                                changeDateTimeRange={dateTimeRangeChangeHandler}
                                changeDateTimeRangeIndex={dateTimeRangeIndexChangeHandler}
                            />
                        </Form.Group>
                    </Col>
                    <Col xl={2} xs={12} md={12} sm={12}>
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
                        </div>
                    </Col>
                    <Col xl={12} style={{padding: "10px 20px", minWidth: "300px"}}>
                        {/*{false ? (*/}
                        {/*    <TableLoader />*/}
                        {/*) : (*/}
                        {/*    <>*/}
                        {/*      <div>*/}

                        <AllCameraLogTable
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

export default AllCameraLogCard;

const statusOptions = [
    {
        label : 'All',
        value : -1
    },
    {
        label : 'Active',
        value : 1
    },
    {
        label : 'Inactive',
        value : 0
    }
]