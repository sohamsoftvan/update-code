import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody
} from "../../../../../../../_metronic/_partials/controls";
import {CardHeader} from "@mui/material";
import {
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import { warningToast } from "../../../../../../../utils/ToastMessage";
import "react-datetime/css/react-datetime.css";
import "react-multi-date-picker/styles/colors/teal.css";
import { connect, shallowEqual, useSelector } from "react-redux";
import * as auth from "../../../../Auth";
import {
  getCurrentEndDate,
  getCurrentStartDate,
} from "../../../../../../../utils/TimeZone";
import { getAdminTotalCameras } from "../../../../Subscriptions/_redux/DeployedRTSPJobs/DeployedRTSPJobsApi";
import { getDiffEvents } from "../../../_redux/MyEventApi";
import moment from "moment";
import FormDateRangePicker from "../../../../../../../utils/dateRangePicker/FormDateRangePicker";
import getSelectedDateTimeDefaultValue from "../../../../../../../utils/dateRangePicker/dateFunctions";
import getSelectedDateTimeDefaultValueForRange from "../../../../../../../utils/dateRangePicker/dateRangeFunctions";
import { getEnabledLocationList } from "../../../../AddSupervisor/_redux";
import { getTotalCamerasByLocationId } from "../../../../DashboardGraph/_redux";
import { MyEventTable } from "./my-event-table/MyEventTable";
import CustomizedButtons from "../../../../../../../utils/SuperAdmin/CustomizedButtons";
import ReactSelectDropDownCommon from "../../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
export function MyEventCard() {
  const [camera, setCamera] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([
    { label: "All Event", value: "-1" }
  ]);
  const [eventOptions, setEventOptions] = useState([]);
  const [selectedEventArray, setSelectedEventArray] = useState(["-1"]);
  const [show, setShow] = useState(true);
  const [seen, setSeen] = useState(true);

  const [selctedCameraId, setSelctedCameraId] = useState(["-1"]);
  const [camerasIds, setCamerasIds] = useState([]);
  const [userId, setUserId] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(12);
  const [startDate, setStartDate] = useState(
    moment.utc(getCurrentStartDate()).format()
  );
  const [endDate, setEndDate] = useState(
    moment.utc(getCurrentEndDate()).format()
  );
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const { userRole } = useSelector(
    ({ auth }) => ({
      userRole: auth.user?.roles?.length && auth.user.roles[0]?.role
    }),
    shallowEqual
  );
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user
    }),
    shallowEqual
  );

  const [cameraOptions, setCameraOptions] = useState([]);
  const [
    selectedCurrentLocationOptions,
    setSelectedCurrentLocationOptions
  ] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState([
    { label: "All Location", value: "-1" }
  ]);
  const [selectedLoctionArray, setSelectedLoctionArray] = useState(["-1"]);
  const [selectedLabel, setSelectedLabel] = useState([
    { label: "All Event", value: "-1" }
  ]);
  const [location_list, setLocation_list] = useState(["-1"]);

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
          // setLocationLoading(false);
          setSelectedCurrentLocationOptions(locationOptions);
        }
      })
      .catch(error => {
        if (error.detail) {
          console.log(error.detail);
        } else {
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
      setSelectedLabel([{ label: "All Event", value: "-1" }]);
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
        // setCameraLoading(false);
      } else throw new Error();
    });
  };

  useEffect(() => {
    getAdminTotalCameras(userRole)
      .then(response => {
        if (response && response.isSuccess) {
          const cameraOptions = response.data.map(c => ({
            label: c.camera_name,
            value: c.id
          }));
          setCameraOptions(cameraOptions);
          const objects = {};
          response.data.map(x => {
            objects[x.id] = x.camera_name;
            return null;
          });
          setCamerasIds(objects);
        } else throw new Error();
      })
      .catch(err => {
        if (err.detail) {
          console.log(err.detail);
        } else {
          console.log("error.detail",err.detail)
        }
      });
    setUserId(user.id);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    let data = {
      camera_id_list: selctedCameraId,
      location_id_list: location_list
    };
    if (camera === null || camera.length === 0) {
      setSelectedLabel(null);
    } else {
      setSelectedLabel([{ label: "All Event", value: "-1" }]);
    }
    getDiffEvents(data)
      .then(response => {
        if (response && response.isSuccess) {
          const labelOptions = response.data.map(x => x);
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
          finale_labels.push({ label: "All Event", value: "-1" });
          setStartDate(startDate);
          setEndDate(endDate);
          // setLabelLoading(false);
          if (labelOptions?.length === 0) {
            setEventOptions([]);
          } else {
            setEventOptions(finale_labels);
          }
        } else throw new Error();
      })
      .catch(err => {
        // setLabelLoading(false);
        if (err.detail) {
          console.log(err.detail);
        } else {
          console.log("error.detail",err.detail)
        }
      });
  }, [selctedCameraId, location_list]);
  const handleLocationChange = selectedlocation => {
    if (selectedlocation === null || selectedlocation.length === 0) {
      setCamera(null);
      setSelectedEvent(null);
      setLocation_list(["-1"]);
      setSelectedEventArray(["-1"]);
    } else {
      setCamera([{ label: "All Camera", value: "-1" }]);
      setSelectedEvent([{ label: "All Event", value: "-1" }]);
      setSelctedCameraId(["-1"]);
      setSelectedEventArray(["-1"]);
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
  const handleEventChange = selectedEvent => {
    setSelectedEventArray([]);
    let selectedEventArray = [];
    if (selectedEvent) {
      for (let i = 0; i < selectedEvent.length; i++) {
        selectedEventArray.push(selectedEvent[i].value);
      }
    }
    setSelectedEvent(selectedEvent);
    setSelectedEventArray(selectedEventArray);
    setShow(true);
  };

  const handleCameraChange = e => {
    let selctedcamera = [];
    if (e) {
      e.map(x => {
        selctedcamera.push(x.label);
        return null;
      });
    }
    if (e) {
      let cameraids = [];
      e.map(x => {
        cameraids.push(x.value.toString());
        return null;
      });
      setSelctedCameraId(cameraids);
    }
    if (e === null || e.length === 0) {
      setSelectedEvent(null);
      setSelectedEventArray([]);
      setSelctedCameraId([]);
    } else {
      setSelectedEvent([{ label: "All Event", value: "-1" }]);
      setSelectedEventArray(["-1"]);
    }
    setCamera(e);
    setShow(true);
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

  const dateTimeRangeChangeHandler = (startDate, endDate) => {
    setStartDate(moment.utc(startDate).format());
    setEndDate(moment.utc(endDate).format());
  };

  const applyFilter = () => {
    if (selectedLoctionArray.length === 0) {
      warningToast("Please Select Location");
    } else if (selctedCameraId.length === 0) {
      warningToast("Please Select Camera");
    } else if (selectedEventArray.length === 0) {
      warningToast("Please Select Events");
    } else {
      setSeen(false);
      setTimeout(() => {
        setSeen(true);
      }, 100);
    }
  };
  const clearFilter = () => {
    setLocation_list([-1]);
    setSelectedEventArray(["-1"]);
    setSelctedCameraId(["-1"]);
    setSeen(false);
    setSelectedLocation([{ label: "All Location", value: "-1" }]);
    setCamera({ label: "All Camera", value: "-1" });
    setSelectedEvent({ label: "All Event", value: "-1" });
    setStartDate(moment.utc(getCurrentStartDate()).format());
    setEndDate(moment.utc(getCurrentEndDate()).format());
    setTimeout(() => {
      setSeen(true);
    }, 100);
  };

  return (
    <Card className="example example-compact" style={{ minHeight: "230px" }}>
      <CardBody style={{ padding: "10px 10px" }}>
        <Row>
          <Col xl={8} xs={12} md={7}>
            <CardHeader title="My Events" />
          </Col>
        </Row>

        <hr />
        <Row className="space">
          <Col xl={2} xs={12} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label className="mb-4">Select Location</Form.Label>
              <ReactSelectDropDownCommon
                  isMulti={true}
                  isSearchable={true}
                  placeholder="Select Location"
                  className="select-react-dropdown"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  options={selectedCurrentLocationOptions}
              />
            </Form.Group>
          </Col>
          <Col xl={2} xs={12} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label className="mb-4">Select Camera</Form.Label>
              <ReactSelectDropDownCommon
                  isMulti={true}
                  isSearchable={true}
                  placeholder="Select Camera"
                  className="select-react-dropdown"
                  options={cameraOptions}
                  onChange={c => {
                    handleCameraChange(c);
                  }}
                  value={camera}
                  name={'camera'}
              />
            </Form.Group>
          </Col>
          <Col xl={2} xs={12} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label className="mb-4">Select Event</Form.Label>
              <ReactSelectDropDownCommon
                  isMulti={true}
                  isSearchable={true}
                  placeholder="Select Event"
                  className="select-react-dropdown"
                  value={selectedEvent}
                  onChange={s => {
                    setShow(false);
                    handleEventChange(s);
                  }}
                  options={eventOptions}
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
        {seen && camerasIds ? (
          <MyEventTable
            startDate={startDate}
            endDate={endDate}
            cameraName={camerasIds}
            selectedLabel={selectedEventArray}
            selctedCameraId={selctedCameraId}
            locationIdList={location_list}
          />
        ) : (
          <></>
        )}
      </CardBody>
    </Card>
  );
}
export default connect(null, auth.actions)(MyEventCard);
