import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody
} from "../../../../../../../_metronic/_partials/controls";
import {CardHeader} from "@mui/material";
import { MyResultTable } from "./my-result-table/MyResultTable";
import { Col, Form, Row} from "react-bootstrap";
import { getAllLabelsFromUserId } from "../../../../../../Admin/modules/Subscriptions/_redux/DeployedRTSPJobs/DeployedRTSPJobsApi";
import { getResultManagerTotalCameras } from "../../../_redux/MyResultApi";
import { warningToast } from "../../../../../../../utils/ToastMessage";
import "react-datetime/css/react-datetime.css";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import "react-multi-date-picker/styles/colors/teal.css";
import {getAllUsersResultManager, getInterval} from "../../../../../../SuperAdmin/modules/Users/_redux/users.api";
import { shallowEqual, useSelector } from "react-redux";
import {
  getCurrentDayEndDateWithTimeInUtc,
  getCurrentDayStartDateWithTimeInUtc,
  getUtcDateAndTimeFromCalendar
} from "../../../../../../../utils/TimeZone";
import { getEnabledLocationListResultManager } from "../../../_redux/MyResultApi";
import ReactSelectDropDownCommon from "../../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import CustomizedSwitch from "../../../../../../../utils/SuperAdmin/CustomizedSwitch";
import CustomizedButtons from "../../../../../../../utils/SuperAdmin/CustomizedButtons";

export function MyResultCard() {
  const initCompany = { label: "Select Company", value: 0 };
  const [company, setCompany] = useState(initCompany);
  const [camera, setCamera] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [values, setValues] = useState([startDate, endDate]);
  const [show, setShow] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState([]);
  const [selectedLabelArray, setSelectedLabelArray] = useState([]);
  const [initialCameras, setInitialCameras] = useState([]);
  const [labelOptions, setLabelOptions] = useState([]);
  const [location, setLocation] = useState([]);
  const [cameraOptions, setCameraOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [switchToggle, setSwitchToggle] = useState(false);
  const [detectionSwitchToggle, setDetectionSwitchToggle] = useState(true);
  const [viewAllSwitchToggle, setViewAllSwitchToggle] = useState(true);
  const [selectedCameraId, setSelctedCameraId] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState([]);
  const [camerasIds, setCamerasIds] = useState([]);
  const [isHide, setIsHide] = useState(false);
  const [isDetection, setIsDetection] = useState(true);
  const [isViewAll, setIsViewAll] = useState(true);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [applyFlag, setApplyFlag] = useState(false)
  const [intervalOption, setIntervalOption] = useState([])
  const [intervalValue, setIntervalValue] = useState(null)
  const { userRole } = useSelector(
    ({ auth }) => ({
      userRole: auth.user?.roles?.length && auth.user.roles[0]?.role,
      user: auth?.user
    }),
    shallowEqual
  );
  useEffect(() => {
    getAllUsersResultManager()
      .then(response => {
        if (response && response.isSuccess) {
          setCompanyOptions(
            response.data.map(user => ({
              value: user.id,
              company_id: user.company?.id,
              label: user.company?.company_name
            }))
          );
        } else {
        }
      })
      .catch(error => {});


    getInterval().then(response =>{
      if (response){
        const intervalOptionWithLabelValue = response?.data.map(option => ({
          label: option, // The label shown to the user
          value: option // The internal value (lowercase and spaces removed)
        }));
          setIntervalOption(intervalOptionWithLabelValue)
      }
    }).catch(error =>{
      console.log("error:::" , error)
    })
  }, []);
  useEffect(() => {
    if (company.value > 0) {
      setStartDate(getCurrentDayStartDateWithTimeInUtc());
      setEndDate(getCurrentDayEndDateWithTimeInUtc());
      setSelectedLocationId([]);
      getAllLabelsFromUserId(company.value, userRole)
        .then(response => {
          if (response && response.isSuccess) {
            let labelOptions = response.data.map(x => x);
            const labels = [];
            labelOptions.map((x, index) => {
              x.split(",").map(y => {
                labels.push({ label: y, value: y });
                return null;
              });
              return null;
            });
            if (labelOptions?.length === 0) {
              setLabelOptions([]);
            } else {
              setLabelOptions(labels);
            }
          } else throw new Error();
        })
        .catch(err => {
          if (err.detail) {
            warningToast(err.detail);
          } else {
            warningToast("Something went wrong");
          }
        });
      getEnabledLocationListResultManager(company.company_id)
        .then(response => {
          // eslint-disable-next-line
          if (response && response.data) {
            const locationOptions = response.data.map(c => ({
              label: c.location_name,
              value: c.id
            }));
            setLocationOptions(locationOptions);
          } else throw new Error();
        })
        .catch(err => {
          if (err.detail) {
            warningToast(err.detail);
          } else {
            warningToast("Something went wrong");
          }
        });
    }
    //
    if (company.value) {
      getResultManagerTotalCameras(company.value, selectedLocationId)
        .then(response => {
          if (response && response.isSuccess) {
            const cameraOptions = response.data.map(c => ({
              label: c.camera_name,
              value: c.id
            }));
            const obj = {};
            response.data.map(x => {
              obj[x.id] = x.camera_name;
              return null;
            });
            let cameraids = [];
            response.data.map(x => {
              cameraids.push(x.id.toString());
              return null;
            });
            setCamerasIds(obj);
            cameraOptions.map(c => {
              return c.value;
            });
            setCameraOptions(cameraOptions);
            if (cameraOptions.length > 0) {
              setSelctedCameraId(cameraids);
              setInitialCameras(cameraids);
            } else {
              setSelctedCameraId([]);
              setInitialCameras([]);
            }
          } else throw new Error();
        })
        .catch(err => {
          if (err.detail) {
            warningToast(err.detail);
          } else {
            warningToast("Something went wrong");
          }
        });
    }
    // eslint-disable-next-line
  }, [company]);

  useEffect(() => {
    if (selectedLocationId.length > 0) {
      getResultManagerTotalCameras(company.value, selectedLocationId)
        .then(response => {
          if (response && response.isSuccess) {
            const cameraOptions = response.data.map(c => ({
              label: c.camera_name,
              value: c.id
            }));
            const obj = {};
            response.data.map(x => {
              obj[x.id] = x.camera_name;
              return null;
            });
            let cameraids = [];
            response.data.map(x => {
              cameraids.push(x.id.toString());
              return null;
            });
            setCamerasIds(obj);
            cameraOptions.map(c => {
              return c.value;
            });
            setCameraOptions(cameraOptions);
            if (cameraOptions.length > 0) {
              setSelctedCameraId(cameraids);
              setInitialCameras(cameraids);
            } else {
              warningToast("No Cameras Found For Location");
              setSelctedCameraId([]);
              setInitialCameras([]);
            }
          } else throw new Error();
        })
        .catch(err => {
          if (err.detail) {
            warningToast(err.detail);
          } else {
            warningToast("Something went wrong");
          }
        });
    }
  }, [selectedLocationId]);

  const handleStartDateChange = e => {
    if (e[0] && !e[1]) {
      let selected_day = e[0].day;
      let date_GMT =
        e[0].year +
        "-" +
        e[0].month.number +
        "-" +
        selected_day +
        " " +
        e[0].hour.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false
        }) +
        ":" +
        e[0].minute.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false
        });
      setStartDate(getUtcDateAndTimeFromCalendar(date_GMT));
      setEndDate(getCurrentDayEndDateWithTimeInUtc());
    } else if (e[1]) {
      //toggle startDate and endDate if startDate > endDate
      if (e[0]) {
        let selected_day = e[0].day;
        let date_GMT =
          e[0].year +
          "-" +
          e[0].month.number +
          "-" +
          selected_day +
          " " +
          e[0].hour.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
          }) +
          ":" +
          e[0].minute.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
          });
        setStartDate(getUtcDateAndTimeFromCalendar(date_GMT));
      }
      let selected_day = e[1].day;
      let date_GMT =
        e[1].year +
        "-" +
        e[1].month.number +
        "-" +
        selected_day +
        " " +
        e[1].hour.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false
        }) +
        ":" +
        e[1].minute.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false
        });
      setEndDate(getUtcDateAndTimeFromCalendar(date_GMT));
    } else {
      setStartDate(getCurrentDayStartDateWithTimeInUtc());
      setEndDate(getCurrentDayEndDateWithTimeInUtc());
    }
  };
  const handleCompanyChange = e => {
    if (e.value !== company.value) {
      setCompany(e);
      setCamera([]);
      setSelctedCameraId([]);
      setCameraOptions([]);
      setLocation(null);
      setLocationOptions([]);
      setSelectedLocationId([]);
      setSelectedLabel([]);
      setSelectedLabelArray([]);
      setStartDate(null);
      setEndDate(null);
      setValues(null);
      setLabelOptions([]);
      setIsLocationSelected(false);
    }
  };

  const handleLocationChange = e => {
    if (e?.value.toString() !== selectedLocationId[0]) {
      let locationids = [];
      locationids.push(e.value.toString());
      setSelectedLocationId(locationids);
      setSelctedCameraId([]);
      setCamera([]);
      setLocation(e);
      setIsLocationSelected(true);
    }
  };
  const handleCameraChange = selectedCamera => {
    setSelctedCameraId([]);
    let cameraids = [];
    if (selectedCamera?.length > 0) {
      for (let i = 0; i < selectedCamera.length; i++) {
        cameraids.push(selectedCamera[i].value.toString());
      }
      setCamera(selectedCamera);
      setSelctedCameraId(cameraids);
    } else {
      setCamera([]);
      setSelctedCameraId(initialCameras);
    }
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
  const handleIsHideChange = e => {
    setSwitchToggle(!switchToggle);
    setIsHide(!switchToggle);
  };

  const handleIsDetectionChange = e => {
    setDetectionSwitchToggle(!detectionSwitchToggle);
    setIsDetection(!detectionSwitchToggle);
  };

  const handleIsViewAllChange = e => {
    setViewAllSwitchToggle(!viewAllSwitchToggle);
    setIsViewAll(!viewAllSwitchToggle);
  };
  const applyFilter =()=>{
    setApplyFlag(true)
     setShow(true)
  }

  const handleIntervalChange = (value) =>{
    setIntervalValue(value)
  }

  return (
    <Card className="example example-compact" style={{ minHeight: "300px" }}>
      <CardBody style={{ minHeight: "300px", padding: "10px 10px" }}>
        <Row>
          <Col xl={8} xs={12} md={7}>
            <CardHeader title="Violation" />
          </Col>
        </Row>
        <hr />
        <Row>


          <Col xl={2} xs={12} md={2} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <ReactSelectDropDownCommon
                  placeholder="Select Company"
                  className="select-react-dropdown"
                  isSearchable={true}
                  options={companyOptions}
                  onChange={(opt) => handleCompanyChange(opt)}
                  value={company}
                  name={'companyList'}
              />
            </Form.Group>
          </Col>
          <Col xl={2} xs={12} md={2} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Interval</Form.Label>
              <ReactSelectDropDownCommon
                  placeholder="Select Interval"
                  className="select-react-dropdown"
                  isSearchable={true}
                  options={intervalOption}
                  onChange={opt => handleIntervalChange(opt)}
                  value={intervalValue}
                  name={'interval'}
              />
            </Form.Group>
          </Col>
          <Col xl={4} xs={12} md={4} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <ReactSelectDropDownCommon
                  placeholder="Select Location"
                  className="select-react-dropdown"
                  options={locationOptions}
                  onChange={opt => handleLocationChange(opt)}
                  value={location}
                  name={'locationOptions'}
                  isSearchable={true}
              />
            </Form.Group>
          </Col>
          <Col xl={4} xs={12} md={4} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Camera</Form.Label>
              <ReactSelectDropDownCommon
                  placeholder="Select Camera"
                  className="select-react-dropdown"
                  isMulti={true}
                  isSearchable={true}
                  options={cameraOptions}
                  onChange={opt => {
                    setShow(false);
                    handleCameraChange(opt);
                  }}
                  value={camera}
                  name={'cameraOptions'}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xl={4} xs={12} md={4} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Labels</Form.Label>
              <ReactSelectDropDownCommon
                  className="select-react-dropdown"
                  isMulti={true}
                  isSearchable={true}
                  placeholder="Select Label"
                  value={selectedLabel}
                  onChange={s => {
                    setShow(false);
                    handleLabelChange(s);
                  }}
                  options={labelOptions}
              />
            </Form.Group>
          </Col>
          <Col xl={4} xs={12} md={4} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <DatePicker
                style={{
                  border: "1px solid hsl(0,0%,80%)",
                  minHeight: "40px"
                }}
                placeholder="Select Date Range"
                className="teal filterDateWidth"
                format="MM/DD/YYYY HH:mm A"
                range
                value={values}
                onChange={e => {
                  setValues(e);
                  handleStartDateChange(e);
                }}
                plugins={[
                  <TimePicker position="bottom" hideSeconds />,
                  <DatePanel markFocused />
                ]}
              />
            </Form.Group>
          </Col>
          <Col xl={1} xs={4} md={4}>
            <Form.Group className="mb-3">
              <Form.Label>View All?</Form.Label>
              <br />
              <CustomizedSwitch
                  checked={viewAllSwitchToggle}
                  onChange={e => {
                    handleIsViewAllChange(e);
                  }}
                  name="isViewAllStatus"
                color={"primary"}
                className={"cursor-pointer"}
                />
            </Form.Group>
          </Col>
          <Col xl={1} xs={4} md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Hidden?</Form.Label>
              <br />
              <CustomizedSwitch
                  checked={switchToggle}
                  onChange={e => {
                    handleIsHideChange(e);
                  }}
                  disabled={isViewAll}
                  name="isHideStatus"
                  color={"primary"}
                  className={"cursor-pointer"}
              />
            </Form.Group>
          </Col>
          <Col xl={1} xs={4} md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Detection?</Form.Label>
              <br />
              <CustomizedSwitch
                  checked={detectionSwitchToggle}
                  onChange={e => {
                    handleIsDetectionChange(e);
                  }}
                  disabled={isViewAll}
                  name="isDetectionStatus"
                  color={"primary"}
                  className={"cursor-pointer"}
              />
            </Form.Group>
          </Col>
          <Col xl={1} xs={4} md={4}>
            <CustomizedButtons className={'mt-xl-5 mt-sm-3 mb-sm-3'} title={'Apply Filter'} color={'primary'} submit={applyFilter} />
          </Col>
        </Row>
        <Row>
          <Col>
            {show && (
              <MyResultTable
                labelname={camerasIds}
                startDate={startDate}
                endDate={endDate}
                selectedLabel={selectedLabelArray}
                companyId={company.value}
                cameraId={selectedCameraId}
                isHide={isHide}
                isDetection={isDetection}
                isViewAll={isViewAll}
                isLocationSelected={isLocationSelected}
                allLabels={labelOptions}
                setApplyFlag={setApplyFlag}
                applyFlag={applyFlag}
                intervalValue={intervalValue}
              />
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
