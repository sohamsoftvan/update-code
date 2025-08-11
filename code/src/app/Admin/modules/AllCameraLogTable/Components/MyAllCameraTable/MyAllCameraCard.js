import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { getTotalCamerasByLocationId } from "../../../DashboardGraph/_redux";
import CardHeader from "@mui/material/CardHeader";
import { getEnabledLocationList } from "../../../AddSupervisor/_redux";
import { warningToast } from "../../../../../../utils/ToastMessage";
import { shallowEqual, useSelector } from "react-redux";
import { MyAllCameraTable } from "./MyAllCameraTable";
import FormDateRangePicker from "../../../../../../utils/dateRangePicker/FormDateRangePicker";
import moment from "moment";
import {getCurrentEndDate, getCurrentStartDate} from "../../../../../../utils/TimeZone";
import getSelectedDateTimeDefaultValue from "../../../../../../utils/dateRangePicker/dateFunctions";
import getSelectedDateTimeDefaultValueForRange from "../../../../../../utils/dateRangePicker/dateRangeFunctions";
import {getAllCameraLog} from "../../_redux/MyAllCameraApi";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";
import {Card, CardBody} from "../../../../../../_metronic/_partials/controls";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import {customStyles} from "../../../../../../utils/CustomStyles";

function MyAllCameraLogCard() {
  const [locationLoading, setLocationLoading] = useState(false);
  const [selectedCurrentLocation, setSelectedCurrentLocation] = useState({
    label: "ALL Location",
    value: "-1"
  });
  const [
    selectedCurrentLocationOptions,
    setSelectedCurrentLocationOptions
  ] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(["-1"]);

  const [
    totalCamerasByLocationLoading,
    setTotalCamerasByLocationLoading
  ] = useState(false);
  const [cameraLocationId, setCameraLocationId] = useState(["-1"]);
  const [cameraLocationOptions, setCameraLocationOptions] = useState([]);
  const [SelectedCameraByLocationId, setSelectedCameraByLocationId] = useState({
    label: "All Camera",
    value: "-1"
  });

  const [listLoading, setListLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [selectedIndex, setSelectedIndex] = useState(12);
  const [startDate, setStartDate] = useState(
      moment.utc(getCurrentStartDate()).format()
  );
  const [endDate, setEndDate] = useState(
      moment.utc(getCurrentEndDate()).format()
  );
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    getAllLocations();
  }, []);

  const { userRole } = useSelector(
    ({ auth }) => ({
      userRole: auth.user?.roles?.length && auth.user.roles[0]?.role
    }),
    shallowEqual
  );

  const getAllLocations = () => {
    setLocationLoading(true);
    getEnabledLocationList(userRole)
      .then(response => {
        if (response && response.data) {
          let locationOptions = [];
          response.data.map(obj =>
            locationOptions.push({ label: obj.location_name, value: obj.id })
          );
          locationOptions.push({ label: "All Location", value: -1 });
          setLocationLoading(false);
          setSelectedCurrentLocationOptions(locationOptions);
          handleLocationChange([{ label: "All Location", value: -1 }]);
        }
      })
      .catch(error => {
        setLocationLoading(false);
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      });
  };

  const handleLocationChange = selectedCurrentLocation => {
    if (!selectedCurrentLocation) {
      handleCameraChange();
      setSelectedCameraByLocationId([]);
      setCameraLocationId([]);

    }
    let selectedLocationArray = [];
    if (selectedCurrentLocation && selectedCurrentLocation.length > 0) {
      for (let i = 0; i < selectedCurrentLocation.length; i++) {
        selectedLocationArray.push(selectedCurrentLocation[i].value.toString());
      }
    } else {
      handleCameraChange();
      setSelectedCameraByLocationId([]);
      setCameraLocationId([]);

    }
    setSelectedCurrentLocation(selectedCurrentLocation);
    setCurrentLocation(selectedLocationArray);

    if (selectedCurrentLocation && selectedCurrentLocation.length > 0) {
      let location_list = [];
      selectedCurrentLocation.map((item, index) => {
        let x = parseInt(item.value.toString());
        location_list.push(x);
        return null;
      });
      setTotalCamerasByLocationLoading(true);
      getTotalCamerasByLocationId(location_list)
        .then(res => {
          if (res && res.isSuccess) {
            let cameras = [];
            let camOpt = [];
            res.data.map((item, index) => {
              camOpt.push({ label: item.camera_name, value: item.id });
              return null;
            });
            cameras.push("-1");
            camOpt.push({ label: "All Camera", value: -1 });
            setCameraLocationId(cameras);
            setCameraLocationOptions(camOpt);
            let selectedCurrentLocationData = [];
            selectedCurrentLocation.map(x => {
              if (x.value === -1) {
                selectedCurrentLocationData.push(x.value);
              }
            });
            setTotalCamerasByLocationLoading(false);
            handleCameraChange([{ label: "All Camera", value: -1 }]);
          } else {
            setTotalCamerasByLocationLoading(false);
            warningToast("Something went wrong");
          }
        })
        .catch(error => {
          setTotalCamerasByLocationLoading(false);
          if (error.detail) {
            warningToast(error.detail);
          } else {
            warningToast("Something went Wrong");
          }
        });
    } else {
    }
  };

  const handleCameraChange = selectedLocation => {

    let selectedLocationArray = [];
    if (selectedLocation && selectedLocation.length > 0) {
      for (let i = 0; i < selectedLocation.length; i++) {
        selectedLocationArray.push(selectedLocation[i].value.toString());
      }
    }

    setSelectedCameraByLocationId(selectedLocation);
    setCameraLocationId(selectedLocationArray);

  };

  useEffect(() => {
    if(SelectedCameraByLocationId.value  === '-1'){
      const valuesArray = cameraLocationOptions
          .filter(option => option.value !== -1) // Exclude entries with value -1
          .map(option => option.value);

      // Construct the common body object for API requests
      const buildRequestBody = (cameraId) => ({
        camera_id: cameraId,
        rtsp_status: selectedStatus.value,
        page_number: pageNo,
        page_size: pageSize,
        order_by: 'desc',
        start_date: startDate,
        end_date: endDate,
      });


      if(SelectedCameraByLocationId && selectedCurrentLocation){
        const isAllCameras =
            SelectedCameraByLocationId?.value === '-1' || selectedCurrentLocation?.value ;
        const cameraId = isAllCameras ? valuesArray : cameraLocationId;
        if (cameraId && cameraId.length > 0 && selectedStatus && pageNo && pageSize && startDate && endDate) {
          const requestBody = buildRequestBody(cameraId);
          getAllCameraLogs(requestBody);
        }
      }
    }


  }, [pageNo, pageSize ,cameraLocationOptions]);



  const getAllCameraLogs =(body) => {
    // setShowTable(true);
    setListLoading(true);
    getAllCameraLog(body)
      .then(response => {
        if (response && response.isSuccess) {
         if(response.data.items.length > 0){
           const pageInfo = response.data.page_info;
           const items = response.data.items;

           // Check if there are items to display
           if (items.length > 0) {
             // Handle next/previous page logic
             if (pageInfo.next_page) {
               setPageNo(pageInfo.next_page - 1); // Set to current page
             } else if (pageInfo.pre_page) {
               setPageNo(pageInfo.pre_page + 1); // If no next page, fallback to previous page
             } else {
               setPageNo(1); // Default to page 1 if no page info available
             }

             // Update pagination state
             setPageSize(pageInfo.page_size);
             setTotalCount(pageInfo.total_count);
           // setShowTable(false);
           setCurrentItems(items);

         }}
        } else throw new Error();
        setListLoading(false);
      })
      .catch(error => {
        // setShowTable(false);
        setCurrentItems([]);
        setListLoading(false);
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      });
  }

  const sizePerPageChangeApiCall = (page, sizePerPage) => {
    setPageNo(1);
    setPageSize(sizePerPage);

    if(SelectedCameraByLocationId[0].value === -1){

      const valuesArray = cameraLocationOptions
          .filter(option => option.value !== -1) // Exclude entries with value -1
          .map(option => option.value);


      const data = {
        camera_id: valuesArray,
        rtsp_status: selectedStatus.value,
        page_number: 1,
        page_size: sizePerPage,
        order_by: 'desc',
        start_date: startDate,
        end_date: endDate,
      }
      getAllCameraLogs(data);
    }else {
      const data = {
        camera_id: SelectedCameraByLocationId.map(option => option.value),
        rtsp_status: selectedStatus.value,
        page_number: 1,
        page_size: sizePerPage,
        order_by: 'desc',
        start_date: startDate,
        end_date: endDate,
      }
      getAllCameraLogs(data);

    }
  };

  const pageChange = (page, sizePerPage) => {
    setPageNo(page);
    setPageSize(sizePerPage);

    if(SelectedCameraByLocationId[0].value === -1){

      const valuesArray = cameraLocationOptions
          .filter(option => option.value !== -1) // Exclude entries with value -1
          .map(option => option.value);


      const data = {
        camera_id: valuesArray,
        rtsp_status: selectedStatus.value,
        page_number: page,
        page_size: sizePerPage,
        order_by: 'desc',
        start_date: startDate,
        end_date: endDate,
      }
      getAllCameraLogs(data);
    }else {
      const data = {
        camera_id: SelectedCameraByLocationId.map(option => option.value),
        rtsp_status: selectedStatus.value,
        page_number: page,
        page_size: sizePerPage,
        order_by: 'desc',
        start_date: startDate,
        end_date: endDate,
      }
      getAllCameraLogs(data);

    }
  };

  const applyFilter = () => {

    if(SelectedCameraByLocationId[0].value === -1){

          const valuesArray = cameraLocationOptions
        .filter(option => option.value !== -1) // Exclude entries with value -1
        .map(option => option.value);


      const data = {
              camera_id: valuesArray,
      rtsp_status: selectedStatus.value,
      page_number: 1,
      page_size: pageSize,
      order_by: 'desc',
      start_date: startDate,
      end_date: endDate,
      }
      getAllCameraLogs(data);
    }else {
      const data = {
        camera_id: SelectedCameraByLocationId.map(option => option.value),
        rtsp_status: selectedStatus.value,
        page_number: 1,
        page_size: pageSize,
        order_by: 'desc',
        start_date: startDate,
        end_date: endDate,
      }
      getAllCameraLogs(data);

    }

  };



  const handleStatusChange = (value) =>{
    setSelectedStatus(value)
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
      <Card className="example example-compact fixed-height-card">
        <CardBody className="custom-card-body">
          <Row className="align-items-center">
            <Col xs={12} md={12}>
              <CardHeader title="Camera Logs" className="p-2" />
            </Col>
          </Row>
          <hr />
          <Row className="space">
          <Col xl={2} xs={12} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label className="mb-4">Select Location</Form.Label>
              <ReactSelectDropDownCommon
                  placeholder="Select Location"
                  className="select-react-dropdown"
                  value={selectedCurrentLocation}
                  onChange={handleLocationChange}
                  options={selectedCurrentLocationOptions}
                  customStyles={customStyles}
                  isSearchable={true}
                  isMulti={true}
                  loading={locationLoading}
              />
            </Form.Group>
          </Col>
          <Col xl={2} xs={12} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label className="mb-4">Select Camera</Form.Label>
              <ReactSelectDropDownCommon
                  placeholder="Select Camera"
                  value={SelectedCameraByLocationId}
                  onChange={handleCameraChange}
                  options={cameraLocationOptions}
                  customStyles={customStyles}
                  isMulti={true}
                  isSearchable={true}
                  loading={totalCamerasByLocationLoading}
              />
            </Form.Group>
          </Col>
          <Col xl={2} xs={12} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label className="mb-4">Select Status</Form.Label>
              <ReactSelectDropDownCommon
                  isSearchable={true}
                  placeholder={"Select Status"}
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  options={statusOptions}
                  customStyles={customStyles}
              />
            </Form.Group>
          </Col>
          <Col xl={3} xs={12} md={12} sm={12}>
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
          <Col xl={3} xs={12} md={12} sm={12}>
            <div className={"d-flex mr-2 mt-5"}>
              <CustomizedButtons className={"mt-xl-5 mt-sm-3 mb-sm-3 btn btn-elevate"}
                                 title={"Apply Filter"}
                                 submit={applyFilter}
                                 color={"primary"}
              />
            </div>
          </Col>
        </Row>
          <hr/>
        <MyAllCameraTable
          currentLocation={currentLocation}
          cameraLocationId={cameraLocationId}
          getAllCameraLocationModal={getAllCameraLogs}
          listLoading={listLoading}
          setListLoading={setListLoading}
          currentItems={currentItems}
          setCurrentItems={setCurrentItems}
          showTable={showTable}
          pageNo={pageNo}
          pageSize={pageSize}
          totalCount={totalCount}
          setPageSize={setPageSize}
          setPageNo={setPageNo}
          pageChange={(page, sizePerPage) => pageChange(page, sizePerPage)}
          sizePerPageChangeApiCall={(page, sizePerPage) =>
            sizePerPageChangeApiCall(page, sizePerPage)
          }
        />
      </CardBody>
    </Card>
  );
}

export default MyAllCameraLogCard;

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
