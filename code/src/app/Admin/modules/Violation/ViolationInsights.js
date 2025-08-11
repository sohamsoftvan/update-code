import React, {Fragment, useEffect, useState} from "react";
import BlockUi from "react-block-ui";
import {Col, Row} from "reactstrap";
import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
import * as auth from "../Auth";
import * as action from "./_redux/ViolationAction";
import {Form} from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {ViolationReportTable} from "./components/ViolationReportTable";
import {ListsWidget1} from "./components/ListsWidget1";
import {ListsWidget2} from "./components/ListsWidget2";
import {ListsWidget3} from "./components/ListsWidget3";
import {warningToast} from "../../../../utils/ToastMessage";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import ReactSelectDropDownCommon from "../../../../utils/SuperAdmin/ReactSelectDropDownCommon";

export function ViolationInsights({ activekey }) {
  const [key, setKey] = useState([]);
  const [value, setValue] = useState([]);
  const [dateValues, setDateValues] = useState(new Date().toISOString());
  const [violationSetting, setViolationSetting] = useState(null);
  const [loaderState, setLoaderState] = useState(true);
  const [selectedTime, setSelectedTime] = useState(10);
  const [labelOptions, setLabelOptions] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState([]);
  const [selectedLabelArray, setSelectedLabelArray] = useState([]);
  const [labelLoading, setLabelLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentState } = useSelector(
    (state) => ({ currentState: state.violation }),
    shallowEqual
  );
  const { entities } = currentState;

  useEffect(() => {
    if (activekey === "insights") {
      let keyArr = [];
      let valueArr = [];
      setLabelLoading(true)
      dispatch(action.fetchViolationSetting())
        .then((res) => {
          setViolationSetting(res?.data);
          let dropdownTypeList = res?.data.label.split(",");
          let abc = generateOptions(dropdownTypeList);
          setLabelOptions(abc);
          setLabelLoading(false);
          dispatch(
            action.fetchViolationReport(
              new Date().toISOString(),
              res?.data.start_time,
              res?.data.end_time,
              res?.data.label
            )
          )
            .then((res2) => {
              try {
                Object.entries(res2.payload).map(([k, v], value) => {
                  keyArr.push(k);
                  valueArr.push(v);
                  return null;
                });
                setKey(keyArr);
                setValue(valueArr);
                setLoaderState(false);
              } catch (e) {
                warningToast("Something went wrong");
                setLoaderState(false);
              }
            })
            .catch((e) => {
              setLabelLoading(false);
              warningToast("Something went wrong");
              setLoaderState(false);
            });
        })
        .catch((e) => {
          warningToast("Something went wrong");
          setLoaderState(false);
        });
      setDateValues(new Date().toISOString());
    }
    //eslint-disable-next-line
  }, [activekey]);

  const generateOptions = (array) => {
    let options = [];
    for (let y = 0; y < array.length; y++) {
      let data = array[y];
      options.push({
        value: data,
        label: data,
      });
    }
    return options;
  };

  const handleDateChange = (e) => {
    if (e?.day) {
      let x = e.day;
      let calenderDate =
        e.year + "-" + e.month.number + "-" + x + " " + e.hour + ":" + e.minute;
      let date = new Date(calenderDate);
      let dateIsoObj = date.toISOString();
      setDateValues(dateIsoObj);
    }
  };
  const handleTimeChange = (e) => {
    setSelectedTime(e);
  };

  const handleLabelChange = (selectedLabel) => {
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
  return (
    <>
      <>
        <Fragment>

            {key.length >= 3 && (
              <Row>
                <Col
                  lg={4}
                  xxl={4}
                  order={1}
                  order-xxl={1}
                  className="fix-box-ipad height-of-main-col"
                >
                  <ListsWidget1 keys={key} value={value} entities={entities} />
                </Col>
                <Col
                  lg={4}
                  xxl={4}
                  order={1}
                  order-xxl={1}
                  className="fix-box-ipad height-of-main-col"
                >
                  <ListsWidget2 keys={key} value={value} entities={entities} />
                </Col>
                <Col
                  lg={4}
                  xxl={4}
                  order={1}
                  order-xxl={1}
                  className="fix-box-ipad height-of-main-col"
                >
                  <ListsWidget3 keys={key} value={value} entities={entities} />
                </Col>
              </Row>
            )}
            <Row className={"mt-6"}>
              <Col xl={4} xs={12} md={4} sm={12}>
                <Form.Group>
                  <Form.Label>Select Date</Form.Label>
                  <div className="col-auto">
                    <DatePicker
                      style={{
                        marginLeft: "-14px",
                        position: "absolute",
                        marginTop: "-7px",
                        borderRadius: "0px",
                        minHeight: "39px",
                        width: "100%",
                        border: "1px solid hsl(0,0%,80%)",
                      }}
                      placeholder="Select Date Range"
                      className="teal filterDateWidth"
                      format="MM/DD/YYYY"
                      value={dateValues}
                      onChange={(e) => {
                        setDateValues(e);
                        handleDateChange(e);
                      }}
                      plugins={[<DatePanel markFocused />]}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col xl={4} xs={12} md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-4">Select Label</Form.Label>
                  <ReactSelectDropDownCommon
                      placeholder="Select Label"
                      loading={labelLoading}
                      className="select-react-dropdown"
                      options={labelOptions}
                      onChange={(opt) => handleLabelChange(opt)}
                      value={selectedLabel}
                      name="labelOptions"
                      isMulti={true}
                      isSearchable={true}
                  />
                </Form.Group>
              </Col>
              <Col xl={4} xs={12} md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-4">Aggregation Minutes</Form.Label>
                  <InputRange
                    step={5}
                    maxValue={60}
                    minValue={1}
                    value={selectedTime}
                    onChange={(e) => {
                      handleTimeChange(e);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

          <BlockUi blocking={loaderState} tag="div" color="#147b82">
            {violationSetting && dateValues && selectedTime ? (
              <ViolationReportTable
                violationSetting={violationSetting}
                dateValues={dateValues}
                setDateValues={setDateValues}
                selectedTime={selectedTime}
                selectedLabel={selectedLabelArray}
              />
            ) : (
              <h3 style={{ paddingTop: "40px" }} className="text-center">
                No Data Found
              </h3>
            )}
          </BlockUi>
        </Fragment>
      </>
    </>
  );
}

function mapStateToProps(state) {
  const { auth } = state;
  return { user: auth.user };
}

export default connect(mapStateToProps, auth.actions)(ViolationInsights);
