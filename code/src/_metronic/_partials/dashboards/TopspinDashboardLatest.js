import React, {useEffect, useState} from 'react';
import DrilldownChart from "./newGrph/Tospinchart";
import {Card, CardBody, Col, Row} from "reactstrap";
import {Form, OverlayTrigger, Tooltip} from "react-bootstrap";
import FormDateRangePicker from "../../../utils/dateRangePicker/FormDateRangePicker";
import moment from "moment/moment";
import {getCurrentEndDate, getCurrentStartDate} from "../../../utils/TimeZone";
import getSelectedDateTimeDefaultValue from "../../../utils/dateRangePicker/dateFunctions";
import getSelectedDateTimeDefaultValueForRange from "../../../utils/dateRangePicker/dateRangeFunctions";
import { CardHeader } from "@mui/material";
import {
    getFilterResultOfAdminPercentage, getFilterResultOfTopspinPersonCount,
    getFilterResultTotalCount, getOneTableDataFromBar, getTotalCamerasByLocationId
} from "../../../app/Admin/modules/DashboardGraph/_redux";
import {warningToast} from "../../../utils/ToastMessage";
import TopspinPersonDashboard from "./TopspinPersonDashboard";
import TopspinPieChart from "./newGrph/PieChart";
import CustomizedButtons from "../../../utils/SuperAdmin/CustomizedButtons";


function TopspinDashboardLatest() {
    const [showModal, setShowModal] = React.useState(false);
    const [chartFilter, setChartFilter] = React.useState(null);
    const [chartTypes, setChartTypes] = React.useState({
        histogramChartType: "column"
    });
    const [selectedIndex, setSelectedIndex] = useState(12);
    const [startDate, setStartDate] = useState(
        moment.utc(getCurrentStartDate()).format()
    );
    const [endDate, setEndDate] = useState(
        moment.utc(getCurrentEndDate()).format()
    );
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
    const [chairData, setChairData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [loadInitialGraphFlag, setLoadInitialGraphFlag] = useState(false);
    const [chairHistogram, setChairHistogram] = useState([]);
    const [tableHistogram, setTableHistogram] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [cameraList, setCameraList] = useState([]);
    const [chairLoading, setChairLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [topspinHighchartDataPerson, setTopspinHighchartDataPerson] = useState([]);
    const [showGraphPerson, setShowGraphPerson] = useState(false);
    const [graphMessagePerson, setGraphMessagePerson] = useState("No Data Found");

    useEffect( () => {
        getTotalCamerasByLocationId([-1])
            .then(response => {
                if(response){
                    setCameraList(response?.data)
                }
            }).catch(error =>{
                console.log("error:::",error)
            })

        const requestChairData = {
            start_date: startDate,
            end_date: endDate,
            selected_model_labels_list: 'chair_occupied,chair_not_occupied',
            get_percentage: true,
            duration_type: 'day',
        };
        const requestTableData = {
            start_date: startDate,
            end_date: endDate,
            selected_model_labels_list: 'table_occupied,table_not_occupied',
            duration_type: 'day',
            get_percentage: true,
        };
        fetchDataChair(requestChairData);
        fetchDataTable(requestTableData);

        setLoadInitialGraphFlag(false);


        const chairData = {
            start_date: startDate,
            end_date: endDate,
            duration_type: "average",
            selected_model_labels_list: "chair_occupied,chair_not_occupied",
        };

        const tableData = {
            start_date: startDate,
            end_date: endDate,
            duration_type: "average",
            selected_model_labels_list: "table_occupied,table_not_occupied",
        };
        fetchHistogramData(chairData ,tableData)

        setFIlterTopspinPersonCount(
            {
                start_date: startDate,
                end_date: endDate,
                initial_graph: true,
                location_id: ['-1'],
                camera_id:  ['-1'],
                selected_model_labels_list: 'in_count',
            },
            "Today's Person Data Analysis",
            false
        );

    }, []);

    const onDrilldown = async (e) => {
        const duration_type = generateDateKeys(startDate, endDate)
        const newData = DateGenerator(e.point.name)

        if(e.point.name){
            if(e.point.name === "Morning(9-12)" || e.point.name === "Afternoon(12-15)" || e.point.name === "Evening(15-18)" || e.point.name === "Night(18-23)"){
                const datanew = {
                    "start_date": loadInitialGraphFlag ?  "2023-12-01T18:30:00Z"   :startDate,
                    "end_date": endDate,
                    "selected_model_labels_list": e.point.occupiedKey,
                    "day_time": e.point.name,
                    "get_average": true,
                    "duration_type": loadInitialGraphFlag ? 'month' : duration_type[0],
                };
                const response = await getFilterResultOfAdminPercentage(datanew);
                if(response){
                    const result = convertToChartFormat(response.data, e ,duration_type[0]);
                    return [result];
                }

            }
            if(newData?.duration_type === "day"){
                const newDataDay = DateGenerator(e.point.name)
                const datanew = {
                    "start_date": newDataDay?.start_date,
                    "end_date": newDataDay?.end_date,
                    "selected_model_labels_list": e.point.series?.chart?.drilldownLevels[0]?.pointOptions?.occupiedKey,
                    "day_time": e.point.series.name,
                    "get_average": true,
                    "duration_type": "day",
                };
                const response = await getFilterResultOfAdminPercentage(datanew);
                if(response){
                    const result = convertToChartFormatDay(response.data, e ,e.point.series?.chart?.drilldownLevels[0]?.pointOptions?.occupiedKey , "day");
                    return [result];
                }
            }
            if(newData?.duration_type === "hour"){
                const newDataHours = DateGenerator(e.point.name)
                const datanew = {
                    "start_date": newDataHours?.start_date,
                    "end_date": newDataHours?.end_date,
                    "selected_model_labels_list": e.point.series?.chart?.drilldownLevels[0]?.pointOptions?.occupiedKey,
                    "day_time": e.point.series?.chart?.drilldownLevels[0]?.pointOptions.name,
                    "get_average": true,
                    "duration_type": "hour",
                };

                const response = await getFilterResultOfAdminPercentage(datanew);
                if(response){
                    const result = convertToChartFormatMin(response.data, e ,e.point.series?.chart?.drilldownLevels[0]?.pointOptions?.occupiedKey ,"hour");
                    return [result];
                }
            }
            if(newData?.duration_type === "minute"){
                const dataId =  e.point?.dataId[0];
                const label =  e.point.series?.chart?.drilldownLevels[0]?.pointOptions?.occupiedKey
               const response = await getOneTableDataFromBar(dataId ,label ,"Label" );
                if(response){
                    setShowModal(true)
                    setModalData(response?.data)
                }
            }
        }
        return [];
    };

    const convertToChartFormat = (data, e, duration_type) => {
        const occupiedKey = e.point.occupiedKey === 'chair_occupied' ? 'chair_occupied' : 'table_occupied';
        const notOccupiedKey = e.point.occupiedKey === 'chair_not_occupied' ? 'chair_not_occupied' : 'table_not_occupied';

        return {
            type: "column",
            name: `${e.point.name}`,
            id: `${e.point.name}_${e.point.occupiedKey}`,
            data: data.map(item => ({
                name: item._id, // Name as per your data, typically the time slot like "Morning(9-12)"
                y: e.point.occupiedKey === occupiedKey
                    ? item[occupiedKey] // For "chair_occupied" or "table_occupied"
                    : item[notOccupiedKey], // For "chair_not_occupied" or "table_not_occupied"
                drilldown: duration_type,
                occupiedKey: e.point.occupiedKey === occupiedKey
                    ? item[occupiedKey] // For "chair_occupied" or "table_occupied"
                    : item[notOccupiedKey]
            }))
        };
    };


    const convertToChartFormatDay = (data, e,occupiedKeyname , duration_type) => {
        return {
            type: "column",
            name: `${e.point.name}`,
            id: `${e.point.name}_${e.point.occupiedKey}`,
            data: data.map(item => ({
                name: item._id, // Name as per your data, typically the time slot like "Morning(9-12)"
                y:  item[occupiedKeyname], // For "chair_not_occupied" or "table_not_occupied"
                drilldown: duration_type,
                occupiedKey: item[occupiedKeyname]
            }))
        };

    };

    const convertToChartFormatMin = (data, e,occupiedKeyname , duration_type) => {
        return {
            type: "column",
            name: `${e.point.name}`,
            id: `${e.point.name}_${e.point.occupiedKey}`,
            data: data.map(item => ({
                name: item._id, // Name as per your data, typically the time slot like "Morning(9-12)"
                y:  item[occupiedKeyname], // For "chair_not_occupied" or "table_not_occupied"
                drilldown: duration_type,
                occupiedKey: item[occupiedKeyname],
                dataId: item?.id
            }))
        };

    };

    const handleChangeChartFilter = value => {
        setChartFilter(value);
    };

    const handleChartTypeChange = (chart, value) => {
        setChartTypes(prevState => ({
            ...prevState,
            [chart]: value
        }));
    };

    const closeModalcloseModal = () => {
        setShowModal(false);
        setModalData([]);
        // Any other cleanup or side effects you want to happen when closing the modal
    };


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

    const applyFilter = () => {
        const requestChairData = {
            start_date: startDate,
            end_date: endDate,
            selected_model_labels_list: 'chair_occupied,chair_not_occupied',
            get_percentage: true,
            duration_type: 'day',
        };
        const requestTableData = {
                start_date: startDate,
                end_date: endDate,
            selected_model_labels_list: 'table_occupied,table_not_occupied',
            duration_type: 'day',
            get_percentage: true,
        };
        fetchDataChair(requestChairData);
        fetchDataTable(requestTableData);
        setLoadInitialGraphFlag(false);

        const chairData = {
            start_date: startDate,
            end_date: endDate,
            duration_type: "average",
            selected_model_labels_list: "chair_occupied,chair_not_occupied",
        };

        const tableData = {
            start_date: startDate,
            end_date: endDate,
            duration_type: "average",
            selected_model_labels_list: "table_occupied,table_not_occupied",
        };
        fetchHistogramData(chairData ,tableData)

        setFIlterTopspinPersonCount(
            {
                start_date: startDate,
                end_date: endDate,
                initial_graph: true,
                location_id: ['-1'],
                camera_id:  ['-1'],
                selected_model_labels_list: 'in_count',
            },
            "Today's Person Data Analysis",
            false
        );
    }

    const clearFilter = () => {
        const requestChairData = {
            start_date: moment.utc(getCurrentStartDate()).format(),
            end_date: moment.utc(getCurrentEndDate()).format(),
            selected_model_labels_list: 'chair_occupied,chair_not_occupied',
            get_percentage: true
        };
        const requestTableData = {
            start_date: moment.utc(getCurrentStartDate()).format(),
            end_date: moment.utc(getCurrentEndDate()).format(),
            selected_model_labels_list: 'table_occupied,table_not_occupied',
            get_percentage: true
        };
        fetchDataChair(requestChairData);
        fetchDataTable(requestTableData);
        setLoadInitialGraphFlag(false);

        const chairData = {
            start_date: moment.utc(getCurrentStartDate()).format(),
            end_date: moment.utc(getCurrentEndDate()).format(),
            duration_type: "average",
            selected_model_labels_list: "chair_occupied,chair_not_occupied",
        };

        const tableData = {
            start_date: moment.utc(getCurrentStartDate()).format(),
            end_date: moment.utc(getCurrentEndDate()).format(),
            duration_type: "average",
            selected_model_labels_list: "table_occupied,table_not_occupied",
        };

        fetchHistogramData(chairData,tableData)


        setFIlterTopspinPersonCount(
            {
                start_date: moment.utc(getCurrentStartDate()).format(),
                end_date: moment.utc(getCurrentEndDate()).format(),
                initial_graph: true,
                location_id: ['-1'],
                camera_id:  ['-1'],
                selected_model_labels_list: 'in_count',
            },
            "Today's Person Data Analysis",
            false
        );

    }

    const loadInitialGraph = () => {
        setStartDate(moment.utc(getCurrentStartDate()).format());
        setEndDate(moment.utc(getCurrentEndDate()).format());

        const requestChairData = {
            start_date: moment.utc(getCurrentStartDate()).format(),
            end_date: moment.utc(getCurrentEndDate()).format(),
            selected_model_labels_list: 'chair_occupied,chair_not_occupied',
            get_percentage: true
        };
        const requestTableData = {
            start_date: moment.utc(getCurrentStartDate()).format(),
            end_date: moment.utc(getCurrentEndDate()).format(),
            selected_model_labels_list: 'table_occupied,table_not_occupied',
            get_percentage: true
        };
        fetchDataChair(requestChairData);
        fetchDataTable(requestTableData);
        setLoadInitialGraphFlag(false);

        const chairData = {
            start_date: moment.utc(getCurrentStartDate()).format(),
            end_date: moment.utc(getCurrentEndDate()).format(),
            duration_type: "average",
            selected_model_labels_list: "chair_occupied,chair_not_occupied",
        };

        const tableData = {
            start_date: moment.utc(getCurrentStartDate()).format(),
            end_date: moment.utc(getCurrentEndDate()).format(),
            duration_type: "average",
            selected_model_labels_list: "table_occupied,table_not_occupied",
        };

        fetchHistogramData(chairData,tableData)


        setFIlterTopspinPersonCount(
            {
                start_date: moment.utc(getCurrentStartDate()).format(),
                end_date: moment.utc(getCurrentEndDate()).format(),
                initial_graph: true,
                location_id: ['-1'],
                camera_id:  ['-1'],
                selected_model_labels_list: 'in_count',
            },
            "Today's Person Data Analysis",
            false
        );

    }

    const loadAllYearData = () => {
        const requestChairData = {
            selected_model_labels_list: 'chair_occupied,chair_not_occupied',
            get_percentage: true
        };
        const requestTableData = {
            selected_model_labels_list: 'table_occupied,table_not_occupied',
            get_percentage: true
        };
        fetchDataChair(requestChairData);
        fetchDataTable(requestTableData);
        setLoadInitialGraphFlag(true);


        const chairData = {
            duration_type: "average",
            selected_model_labels_list: "chair_occupied,chair_not_occupied",
        };

        const tableData = {
            duration_type: "average",
            selected_model_labels_list: "table_occupied,table_not_occupied",
        };

        fetchHistogramData(chairData,tableData)


        setFIlterTopspinPersonCount(
            {
                initial_graph: true,
                location_id: ['-1'],
                camera_id:  ['-1'],
                selected_model_labels_list: 'in_count',
            },
            "Today's Person Data Analysis",
            false
        );
    }


    const fetchDataChair = (data) => {
        // Fetch both chair and table data in one API call
        // setLoading(true);
        getFilterResultTotalCount(data)
            .then(response => {
                if (response && response.data) {
                    const chairPieData = Object.keys(response.data)
                        .filter(item => item.includes('chair'))
                        .map(item => ({
                            name: item.replace('_', ' ').toUpperCase(), // Formatting the name
                            y: response.data[item]
                        }));

                    // Check if all 'y' values for chair are 0
                    const isChairAllZero = chairPieData.every(item => item.y === 0);
                    setChairData(isChairAllZero ? [] : chairPieData); // Set [] if all values are 0

                } else {
                    setChairData([]);
                }
            })
            .catch(err => {
                console.log(err);
                setChairData([]);
            }).finally(() => {
            // Always set loading to false after processing
            // setLoading(false);
        });
    };

    const fetchDataTable = (data) => {
        // Fetch both chair and table data in one API call
        // setLoading(true);
        getFilterResultTotalCount(data)
            .then(response => {
                if (response && response.data) {
                    // Process table data
                    const tablePieData = Object.keys(response.data)
                        .filter(item => item.includes('table'))
                        .map(item => ({
                            name: item.replace('_', ' ').toUpperCase(), // Formatting the name
                            y: response.data[item]
                        }));

                    // Check if all 'y' values for table are 0
                    const isTableAllZero = tablePieData.every(item => item.y === 0);
                    setTableData(isTableAllZero ? [] : tablePieData); // Set [] if all values are 0
                } else {
                    setTableData([]);
                }
            })
            .catch(err => {
                warningToast("Error fetching data.");
                setTableData([]);
            }).finally(() => {
            // Always set loading to false after processing
            // setLoading(false);
        });
    };




    const transformHistogramData = (data, labelPrefix) => {
        const occupiedKey = labelPrefix === "Chair" ? "chair_occupied" : "table_occupied";
        const notOccupiedKey = labelPrefix === "Chair" ? "chair_not_occupied" : "table_not_occupied";

        const result = [
            {
                name: `${labelPrefix} Occupied`,
                data: data.map((item) => ({
                    name: item._id, // Use _id directly from the response
                    y: item[occupiedKey], // Dynamically use chair_occupied or table_occupied
                    drilldown: `2024-${item._id.replace(/\(.*\)/, "").replace(/[^a-zA-Z0-9]/g, "")}-LOW`, // Dynamic drilldown ID
                    occupiedKey: occupiedKey
                })),
                color: "#147b82" // Static or dynamic color if needed
            },
            {
                name: `${labelPrefix} Not Occupied`,
                data: data.map((item) => ({
                    name: item._id, // Use _id directly from the response
                    y: item[notOccupiedKey], // Dynamically use chair_not_occupied or table_not_occupied
                    drilldown: `2024-${item._id.replace(/\(.*\)/, "").replace(/[^a-zA-Z0-9]/g, "")}-HIGH`, // Dynamic drilldown ID
                    occupiedKey: notOccupiedKey
                })),
                color: "#5ca4a9" // Static or dynamic color if needed
            }
        ];

        return result;
    };


    const fetchHistogramData = async (chairData ,tableData ) => {
        try {
            setChairLoading(true);
            setTableLoading(true);


            const [chairResponse, tableResponse] = await Promise.all([
                getFilterResultOfAdminPercentage(chairData),
                getFilterResultOfAdminPercentage(tableData),
            ]);

            if(chairResponse?.data.length > 0){
                const transformedChairData = transformHistogramData(chairResponse?.data, "Chair");
                setChairHistogram(transformedChairData);
            }else{
                setChairHistogram([])
            }

            if(tableResponse?.data.length > 0){
                const transformedTableData = transformHistogramData(tableResponse?.data, "Table");
                setTableHistogram(transformedTableData);
            }else{
                setTableHistogram([])
            }

        } catch (error) {
            warningToast("Error fetching histogram data.");
            setChairLoading(false);
            setTableLoading(false);
        } finally {
            // Always stop loading when the fetch is done (success or failure)
            setChairLoading(false);  // Stops loading after processing the response
            setTableLoading(false);  // Stops loading for table data as well
        }
    };

    const handleCloseModal=()=>{
        setShowModal(false)
        setModalData([]);
    }


    const setFIlterTopspinPersonCount = (parameters) =>{

        setShowGraphPerson(false)
        setGraphMessagePerson("Loading..")
        getFilterResultOfTopspinPersonCount(parameters)
            .then(response => {
                if(response && response.data.length > 0){
                    setShowGraphPerson(true)
                    setTopspinHighchartDataPerson(response?.data)
                }
                else {
                    setShowGraphPerson(false)
                    setGraphMessagePerson("No Data Found")
                }
            })
            .catch(err => {
                console.log("err:::" ,err)
                warningToast("Something went wrong");
                setShowGraphPerson(false)
                setGraphMessagePerson("No Data Found")
            });
    }

    return (
        <>
            <Card className="example example-compact mb-5" style={{minHeight: "230px"}}>
                <CardBody style={{padding: "10px 10px"}}>
                    <Row>
                        <Col xl={8} lg={8} xs={12} md={7} sm={12}>
                            <CardHeader title="Event Information"/>
                        </Col>
                        <Col xl={4} lg={4} xs={12} md={5} sm={12}>
                            <div className={"mt-5 d-flex justify-content-lg-end"}>
                                {loadInitialGraphFlag && (
                                    <CustomizedButtons
                                        title={"Load Initial Data"}
                                        submit={loadInitialGraph}
                                        className={"mr-4 btn-apply-filter"}
                                        color={"primary"}/>
                                )}
                                {!loadInitialGraphFlag && (
                                    <CustomizedButtons
                                        title={"Load All Data"}
                                        submit={loadAllYearData}
                                        className={"mr-4 btn-apply-filter loadtop"}
                                        color={"primary"}/>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row className="space">

                        <Col xl={4} xs={12} md={6} sm={12}>
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
                            <div className={"d-flex mr-2 mt-5"}>
                                <CustomizedButtons
                                    title={"Apply Filter"}
                                    submit={applyFilter}
                                    className={"mt-5 btn-apply-filter"}
                                    style={{paddingLeft: "8px", paddingRight: "10px"}}
                                    color={"primary"}/>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <Tooltip id="user-notification-tooltip">
                                            Show All Data
                                        </Tooltip>
                                    }
                                >
                                    <CustomizedButtons
                                        title={"Reset filter"}
                                        submit={clearFilter}
                                        className={"mt-5 ml-5"}
                                        color={"secondary"}/>
                                </OverlayTrigger>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <TopspinPieChart
                chairData={chairData}
                tableData={tableData}
                loading={false}
            />

            <Row className={'mt-5 mb-5'}>
                <Col xl={6} md={6}>
                    <DrilldownChart
                        chartType={"column"}
                        handleChangeChartType={e => handleChartTypeChange("histogramChartType", e?.target?.value)}
                        title={"Chair Occupancy Details"}
                        seriesData={chairHistogram}
                        onDrilldown={onDrilldown}
                        showModal={showModal}
                        caseDashboard={true}
                        chartFilter={chartFilter}
                        setChartFilter={setChartFilter}
                        handleChangeChartFilter={handleChangeChartFilter}
                        isHistogramOn={true}
                        setIsHistogramOn={false}
                        histogramChartLoading={chairLoading}
                        modalData={modalData}
                        cameraList={cameraList}
                        handleCloseModal={handleCloseModal}
                    />
                </Col>

                <Col xl={6} md={6}>
                    <DrilldownChart
                        chartType={"column"}
                        handleChangeChartType={e => handleChartTypeChange("histogramChartType", e?.target?.value)}
                        title={"Table Occupancy Details"}
                        seriesData={tableHistogram}
                        onDrilldown={onDrilldown}
                        showModal={showModal}
                        caseDashboard={true}
                        chartFilter={chartFilter}
                        setChartFilter={setChartFilter}
                        handleChangeChartFilter={handleChangeChartFilter}
                        isHistogramOn={true}
                        setIsHistogramOn={false}
                        histogramChartLoading={tableLoading}
                        modalData={modalData}
                        cameraList={cameraList}
                        handleCloseModal={handleCloseModal}
                    />
                </Col>

            </Row>

            <Row ClassName={'mt-5'}>
                <Col xl={6} md={6} >
                    <TopspinPersonDashboard
                        startDate={startDate}
                        endDate={endDate}
                        locationId={['-1']}
                        cameraId={['-1']}
                        topspinHighchartData={topspinHighchartDataPerson}
                        showGraph={showGraphPerson}
                        graphMessage={graphMessagePerson}
                    />
                </Col>
            </Row>

        </>
    );
}

export default TopspinDashboardLatest

const generateDateKeys = (startDate, endDate) => {
    const getDateDetails = (date) => {
        const d = new Date(date);
        return {
            year: d.getFullYear(),
            month: d.getMonth(), // month is 0-indexed
            day: d.getDate()
        };
    };

    // Get details for start and end dates
    const start = getDateDetails(startDate);
    const end = getDateDetails(endDate);

    // If the year and month are the same, return "Day"
    if (start.year === end.year && start.month === end.month) {
        return ['day'];
    } else {
        // If the year or month is different, return "Month"
        return ['month'];
    }
};


export function DateGenerator(input) {
    const inputParts = input.split('-');
    if (typeof input === 'string' && input.includes(':')) {
        const timeParts = input.split(':');
        if (timeParts.length === 3) {
            const hour = parseInt(timeParts[0], 10);
            const minute = parseInt(timeParts[1], 10);
            const second = parseInt(timeParts[2], 10);

            // Set date explicitly to today with specified time
            const startDate = moment().set({ hour, minute, second, millisecond: 0 });
            const endDate = startDate.clone().set({ minute: 59, second: 59, millisecond: 999 });

            return {
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
                duration_type: "minute"
            };
        }
    }
    // Handle time format like ['10:11:14']
    if (Array.isArray(input) && input.length === 1 && input[0].includes(':')) {
        const timeParts = input[0].split(':');
        if (timeParts.length === 3) {
            const hour = parseInt(timeParts[0], 10);
            const minute = parseInt(timeParts[1], 10);
            const second = parseInt(timeParts[2], 10);

            const startDate = moment().set({ hour, minute, second, millisecond: 0 });
            const endDate = startDate.clone().add(1, 'hour').set({ minute: 59, second: 59, millisecond: 999 });

            return {
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
                duration_type: "hour"
            };
        }
    }

    if (inputParts.length === 3 && inputParts[2].length === 2) {
        // Format: YYYY-MM-DD
        const date = moment(input, 'YYYY-MM-DD');
        const startDate = date.clone().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        const endDate = date.clone().set({ hour: 23, minute: 59, second: 59, millisecond: 999 });

        return {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            duration_type: "hour"
        };
    }

    if (inputParts.length === 2 && inputParts[1].length === 2) {
        // Format: YYYY-MM
        const year = parseInt(inputParts[0], 10);
        const month = parseInt(inputParts[1], 10); // month is zero-based

        const startDate = moment(`${year}-${month}`).startOf('month');
        const endDate = moment(`${year}-${month}`).endOf('month');

        return {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            duration_type: "day"
        };
    }

    if (inputParts.length === 3 && inputParts[2].includes(':')) {
        // Format: YYYY-MM-DD:HH:mm
        const [datePart, timePart] = input.split(':');
        const { startISOString, endISOString } = convertToISO(datePart, timePart);

        return {
            start_date: startISOString,
            end_date: endISOString,
            duration_type: "second"
        };
    }else {
        return {
            duration_type: input
        }
    }

    throw new Error("Invalid input format");
}

const convertToISO = (startDatePart, startTimePart) => {
    const startDateTimeString = `${startDatePart}T${startTimePart}:00`;
    const startDateTime = new Date(startDateTimeString);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

    const startISOString = startDateTime.toISOString();
    const endISOString = endDateTime.toISOString();

    return { startISOString, endISOString };
};