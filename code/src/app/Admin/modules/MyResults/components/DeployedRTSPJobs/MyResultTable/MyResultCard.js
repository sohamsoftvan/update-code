import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody
} from "../../../../../../../_metronic/_partials/controls";
import {CardHeader} from "@mui/material";
import { MyResultTable } from "./my-result-table/MyResultTable";
import {
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import {
  getAdminTotalCameras,
  getAllLabelsFromListOfCameraId
} from "../../../../Subscriptions/_redux/DeployedRTSPJobs/DeployedRTSPJobsApi";
import { warningToast } from "../../../../../../../utils/ToastMessage";
import "react-datetime/css/react-datetime.css";
import "react-multi-date-picker/styles/colors/teal.css";
import { connect, shallowEqual, useSelector } from "react-redux";
import * as auth from "../../../../Auth";
import {
  getCurrentEndDate,
  getCurrentStartDate
} from "../../../../../../../utils/TimeZone";
import FormDateRangePicker from "../../../../../../../utils/dateRangePicker/FormDateRangePicker";
import getSelectedDateTimeDefaultValue from "../../../../../../../utils/dateRangePicker/dateFunctions";
import getSelectedDateTimeDefaultValueForRange from "../../../../../../../utils/dateRangePicker/dateRangeFunctions";
import moment from "moment";
import { getTotalCamerasByLocationId } from "../../../../DashboardGraph/_redux";
import { getEnabledLocationList } from "../../../../AddSupervisor/_redux";
import CustomizedButtons from "../../../../../../../utils/SuperAdmin/CustomizedButtons";
import ReactSelectDropDownCommon from "../../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
export function MyResultCard() {
  const initJob = { label: "Select Model", value: 0 };
  const [rtspJobModel, setRTSPJobModel] = useState(initJob);
  const [camera, setCamera] = useState([{ label: "All Camera", value: "-1" }]);
  const [selectedLabel, setSelectedLabel] = useState([
    { label: "All label", value: "-1" }
  ]);
  const [selectedLocation, setSelectedLocation] = useState([
    { label: "All Location", value: "-1" }
  ]);
  const [labelOptions, setLabelOptions] = useState([]);
  const [selectedLabelArray, setSelectedLabelArray] = useState(["-1"]);
  const [selectedLoctionArray, setSelectedLoctionArray] = useState(["-1"]);
  const [show, setShow] = useState(true);
  const [selctedCameraId, setSelctedCameraId] = useState(["-1"]);
  const [camerasIds, setCamerasIds] = useState(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [labelLoading, setLabelLoading] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(12);
  const [startDate, setStartDate] = useState(
    moment.utc(getCurrentStartDate()).format()
  );
  const [endDate, setEndDate] = useState(
    moment.utc(getCurrentEndDate()).format()
  );
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState();
  const { userRole } = useSelector(
    ({ auth }) => ({
      userRole: auth.user?.roles?.length && auth.user.roles[0]?.role
    }),
    shallowEqual
  );
  const [cameraOptions, setCameraOptions] = useState([]);
  const [location_list, setLocation_list] = useState(["-1"]);
  const [
    selectedCurrentLocationOptions,
    setSelectedCurrentLocationOptions
  ] = useState([]);

  useEffect(() => {
    getEnabledLocationList(userRole)
      .then(response => {
        // eslint-disable-next-line
        if (response && response.data) {
          let locationOptions = [];
          response.data.map(obj =>
            locationOptions.push({ label: obj.location_name, value: obj.id })
          );
          locationOptions.push({ label: "All Location", value: "-1" });
          setSelectedCurrentLocationOptions(locationOptions);
        }
      })
      .catch(error => {
        if (error.detail) {
         console.log("error.detail",error.detail)
        }
      });
  }, []);
  useEffect(() => {
    getAllLocations();
  }, [location_list, selectedLocation]);
  const getAllLocations = () => {
    if (selectedLocation === null || selectedLocation.length === 0) {
      setCamera(null);
      setSelectedLabel(null);
    } else {
      setCamera([{ label: "All Camera", value: "-1" }]);
      setSelectedLabel([{ label: "All label", value: "-1" }]);
    }

    getTotalCamerasByLocationId(location_list).then(response => {
      if (response && response.isSuccess) {
        const cameraOptions = response.data.map(c => ({
          label: c.camera_name,
          value: c.id
        }));
        cameraOptions.push({ label: "All Camera", value: "-1" });
        setCameraOptions(cameraOptions);

        const objects = {};
        response.data.map(x => {
          objects[x.id] = x.camera_name;
          return null;
        });
        setCamerasIds(objects);
        setCameraLoading(false);
      } else throw new Error();
    });
  };
  useEffect(() => {
    setCameraLoading(true);
    setLabelLoading(true);
    getAdminTotalCameras(userRole)
      .then(response => {
        if (response && response.isSuccess) {
          const cameraOptions = response.data.map(c => ({
            label: c.camera_name,
            value: c.id
          }));
          cameraOptions.push({ label: "All Camera", value: "-1" });
          setCameraOptions(cameraOptions);

          const objects = {};
          response.data.map(x => {
            objects[x.id] = x.camera_name;
            return null;
          });
          setCamerasIds(objects);
          setCameraLoading(false);
        } else throw new Error();
      })
      .catch(err => {
        setCameraLoading(false);
        if (err.detail) {

          console.log("error.detail",err.detail)
        }
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let data = {
      camera_id: selctedCameraId,
      location_id: location_list
    };
    if (camera === null || camera.length === 0) {
      setSelectedLabel(null);
    } else {
      setSelectedLabel([{ label: "All label", value: "-1" }]);
    }
    getAllLabelsFromListOfCameraId(data, userRole)
      .then(response => {
        if (response && response.isSuccess) {
          const labelOptions = response.data.map(x => x.labels);
          let labels = [];
          let finale_labels = [];
          labelOptions.map((item, index) => {
            let arr = item.split(",");
            arr.map(x => {
              labels.push(x);
              return null;
            });
            return null;
          });
          let uniqueLabels = Array.from(new Set(labels));
          uniqueLabels.map(x => finale_labels.push({ label: x, value: x }));
          finale_labels.push({ label: "All Label", value: "-1" });
          setStartDate(startDate);
          setEndDate(endDate);
          setLabelLoading(false);
          if (labelOptions?.length === 0) {
            setLabelOptions([]);
          } else {
            setLabelOptions(finale_labels);
          }
        } else throw new Error();
      })
      .catch(err => {
        setLabelLoading(false);
        if (err.detail) {
          console.log("error.detail",err.detail)
        }
      });
  }, [selctedCameraId, location_list]);
  const handleLocationChange = selectedlocation => {
    if (selectedlocation === null || selectedlocation.length === 0) {
      setCamera(null);
      setSelectedLabel(null);
      setLocation_list(["-1"]);
      setSelectedLabelArray(["-1"]);
    } else {
      setCamera([{ label: "All Camera", value: "-1" }]);
      setSelectedLabel([{ label: "All label", value: "-1" }]);
      setSelctedCameraId(["-1"]);
      setSelectedLabelArray(["-1"]);
    }
    setSelectedLoctionArray([]);
    let selectedLocationArray = [];
    if (selectedlocation) {
      for (let i = 0; i < selectedlocation.length; i++) {
        selectedLocationArray.push(selectedlocation[i].value.toString());

        let locationids = [];
        selectedlocation.map(x => {
          locationids.push(x.value.toString());
          return null;
        });
        setLocation_list(locationids);
      }
    }
    setSelectedLocation(selectedlocation);
    setSelectedLoctionArray(selectedLocationArray);
  };
  const handleLabelChange = selectedLabel => {
    setSelectedLabelArray([]);
    let selectedLabelArray = [];
    if (selectedLabel) {
      for (let i = 0; i < selectedLabel.length; i++) {
        selectedLabelArray.push(selectedLabel[i].value);
      }
    }
    setSelectedLabel(selectedLabel);
    setSelectedLabelArray(selectedLabelArray);
  };
  const handleCameraChange = e => {
    let selctedcamera = [];
    if (e) {
      e.map(x => {
        selctedcamera.push(x.label);
        setSelectedLabelArray(["-1"]);
        return null;
      });
      let cameraids = [];
      e.map(x => {
        cameraids.push(x.value.toString());
        setSelectedLabelArray(["-1"]);
        return null;
      });
      setSelctedCameraId(cameraids);
    } else {
      setSelctedCameraId([]);
      setSelectedLabelArray(["-1"]);
    }
    setCamera(e);
  };

  const dateTimeRangeIndexChangeHandler = (rangeIndex, value) => {
    let dateVal = getSelectedDateTimeDefaultValue(value);
    let index = getSelectedDateTimeDefaultValueForRange(parseInt(dateVal, 10));
    // let reportFilterParameter = this.state.reportFilterParameter;
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

  const dateTimeRangeChangeHandler = (startDate, endDate) => {
    setStartDate(moment.utc(startDate).format());
    setEndDate(moment.utc(endDate).format());
  };

  const applyFilter = () => {
    if (selectedLoctionArray.length === 0) {
      warningToast("Please Select Location");
    } else if (selctedCameraId.length === 0) {
      warningToast("Please Select Camera");
    } else if (selectedLabelArray.length === 0) {
      warningToast("Please Select Labels");
    } else {
      setShow(false);
      setTimeout(() => {
        setShow(true);
      }, 100);
    }
  };
  const clearFilter = () => {
    setLocation_list([-1]);
    setSelectedLabelArray(["-1"]);
    setSelctedCameraId(["-1"]);
    setShow(false);
    setSelectedLocation([{ label: "All Location", value: "-1" }]);
    setCamera({ label: "All Camera", value: "-1" });
    setSelectedLabel({ label: "All label", value: "-1" });
    setStartDate(moment.utc(getCurrentStartDate()).format());
    setEndDate(moment.utc(getCurrentEndDate()).format());
    setTimeout(() => {
      setShow(true);
    }, 100);
  };
  return (
    <Card className="example example-compact fixed-height-card">
        <CardBody className="custom-card-body">
            <Row className="align-items-center">
                <Col xs={12} md={12}>
                <CardHeader title="My Result" className="p-2" />
              </Col>
            </Row>
            <hr />

        <Row className="space">
          <Col xl={2} xs={12} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label className="mb-4">Select Location</Form.Label>
              <ReactSelectDropDownCommon
                  isMulti={true}
                  placeholder="Select Location"
                  className="select-react-dropdown"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  options={selectedCurrentLocationOptions}
                  isSearchable={true}
              />
            </Form.Group>
          </Col>
          <Col xl={2} xs={12} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label className="mb-4">Select Camera</Form.Label>
              <ReactSelectDropDownCommon
                  isMulti={true}
                  placeholder="Select Location"
                  className="select-react-dropdown"
                  options={cameraOptions}
                  onChange={c => {
                    handleCameraChange(c);
                  }}
                  isSearchable={true}
                  value={camera}
                  loading={cameraLoading}
                  name={'camera'}
              />
            </Form.Group>
          </Col>
          <Col xl={2} xs={12} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label className="mb-4">Select Label</Form.Label>
              <ReactSelectDropDownCommon
                  isMulti={true}
                  isSearchable={true}
                  placeholder="Select Label"
                  className="select-react-dropdown"
                  value={selectedLabel}
                  onChange={s => {
                    handleLabelChange(s);
                  }}
                  options={labelOptions}
                  loading={labelLoading}
              />
            </Form.Group>
          </Col>
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
                  className={"mt-xl-5 mt-sm-3 mb-sm-3"}
                  title={"Apply Filter"}
                  submit={applyFilter}
                  color={"primary"}
              />
              <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="user-notification-tooltip">
                      Show All Data
                    </Tooltip>
                  }
              >
                <CustomizedButtons
                    className={"mt-xl-5 mt-sm-3 mb-sm-3 ml-5"}
                    title={"Reset Filter"}
                    submit={clearFilter}
                    color={"secondary"}
                />
              </OverlayTrigger>
            </div>
          </Col>
        </Row>
          <hr/>
        <div>
          {(show && camerasIds) && (
            <MyResultTable
              startDate={startDate}
              endDate={endDate}
              cameraName={camerasIds}
              locationIdList={location_list}
              jobId={rtspJobModel.value}
              selectedLabel={selectedLabelArray}
              selctedCameraId={selctedCameraId}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
export default connect(null, auth.actions)(MyResultCard);
