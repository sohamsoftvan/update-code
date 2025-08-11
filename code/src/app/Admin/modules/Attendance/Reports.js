import React, { Component, Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { CardBody } from "../../../../_metronic/_partials/controls";
import BootstrapTable from "react-bootstrap-table-next";
import { warningToast } from "../../../../utils/ToastMessage";
import paginationFactory from "react-bootstrap-table2-paginator";
import {
  getEmployee,
  getEmployeeByDate,
  getEmployeeRecordByMonthYear,
  getTodayReport,
} from "./_redux";
import { dateTimeFormatter } from "../../../../utils/DateTimeFormatter";
import BlockUi from "react-block-ui";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import stock from "highcharts/modules/stock";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { connect } from "react-redux";
import * as auth from "../Auth";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {Form} from "react-bootstrap";
import CustomizedButtons from "../../../../utils/SuperAdmin/CustomizedButtons";
import ReactSelectDropDownCommon from "../../../../utils/SuperAdmin/ReactSelectDropDownCommon";

stock(Highcharts);
const dropdownTypeList = [
  {
    id: 1,
    name: "Attendance Report Of Employee",
  },
  {
    id: 2,
    name: "Attendance Report  By Date",
  },
  {
    id: 3,
    name: "Today's Attendance Report",
  },
];
const selectedMonthOptions = [
  {
    id: 1,
    name: "January",
  },
  {
    id: 2,
    name: "February",
  },
  {
    id: 3,
    name: "March",
  },
  {
    id: 4,
    name: "April",
  },
  {
    id: 5,
    name: "May",
  },
  {
    id: 6,
    name: "June",
  },
  {
    id: 7,
    name: "July",
  },
  {
    id: 8,
    name: "August",
  },
  {
    id: 9,
    name: "September",
  },
  {
    id: 10,
    name: "October",
  },
  {
    id: 11,
    name: "November",
  },
  {
    id: 12,
    name: "December",
  },
];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const pagination = paginationFactory({
  page: 1,
  sizePerPage: 10,
  lastPageText: ">>",
  firstPageText: "<<",
  nextPageText: ">",
  prePageText: "<",
  showTotal: true,
  alwaysShowAllBtns: true,

  onPageChange: function (page, sizePerPage) {},
  onSizePerPageChange: function (page, sizePerPage) {},
});

class Reports extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    let max = 4;
    let mnthXaxis = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (mnthXaxis.length > 20) {
      max = 5;
    } else {
      max = mnthXaxis.length - 1;
    }
    this.state = {
      userRole: "",
      startDate: "",
      endDate: "",
      temp: true,
      barPresent: "Present",
      barPresentCount: 0,
      barAbsent: "Absent",
      barAbsentCount: 0,
      showTable: false,
      labelOptions: [],
      employeeDropdownOptions: [],
      selectedEmployee: null,
      noData: false,
      selectedType: null,
      piData: [{}],
      data: [{}],
      columns: [{}],
      showGraph: false,
      showPiGraph: false,
      options: {},
      piOptions: {},
    };
  }

  generateYearDropDown = () => {
    let minOffset = 0;
    let maxOffset = 20;
    const thisYear = new Date().getFullYear();
    let options = [];
    for (let i = minOffset; i <= maxOffset; i++) {
      const year = thisYear - i;
      options.push({ value: year, label: year });
    }
    this.setState({
      generatedYear: options,
    });
  };
  handleStartDateChange = (e) => {
    if (e) {
      let x = e.day;
      let calenderDate =
        e.year + "-" + e.month.number + "-" + x + " " + e.hour + ":" + e.minute;
      let date = new Date(calenderDate);
      let dateIsoObj = date.toISOString();
      this.setState({
        defaultStartDate: dateIsoObj,
        startDate: dateIsoObj,
        temp: false,
        showPiGraph: false,
      });
    } else {
      this.setState({
        startDate: "",
        temp: true,
        showPiGraph: false,
      });
    }
  };
  componentDidMount() {
    const column = [
      {
        dataField: "id",
        text: "Index",
      },
      {
        dataField: "Employee_name",
        text: "Name",
      },
      {
        dataField: "Date",
        text: "Date",
      },
      {
        dataField: "Present",
        text: "Present",
      },
    ];
    this.generateYearDropDown();
    this.setState({
      columns: column,
    });
    let abc = this.generateOptions(dropdownTypeList);
    let monthDropDown = this.generateOptions(selectedMonthOptions);

    const { user } = this.props;
    let userRole = user.roles[0].role;
    this.setState(
      {
        userRole: userRole,
        labelOptions: abc,
        selectedMonthOptions: monthDropDown,
        selectedType: abc[2],
      },
      () => {
        this.handleTypeChange(abc[2]);
      }
    );
  }

  getEmployeeDropDown = () => {
    let dropdownList = [];
    this.setState({
      blocking: true,
    });
    getEmployee(this.state.userRole)
      .then((res) => {
        if (res && res.isSuccess) {
          res.data.map((obj) =>
            dropdownList.push({
              label: obj.employee_name,
              value: obj.external_name,
            })
          );
          this.setState({
            employeeDropdownOptions: dropdownList,
            blocking: false,
          });
        } else {
          this.setState({
            blocking: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          blocking: false,
        });
        if (error.detail) {
          warningToast(error.detail);
        }
      });
  };

  handleEmployeeChange = (selectedEmployee) => {
    this.setState({
      selectedEmployee,
    });
  };

  handleTypeChange = (selectedType) => {
    this.setState({
      selectedType,
      showGraph: false,
      showTable: false,
      showPiGraph: false,
      noData: false,
      selectedMonth: null,
      selectedYear: null,
      selectedEmployee: null,
      temp: true,
      startDate: "",
    });
    if (selectedType.value === 3) {
      this.getTodayData();
    } else if (selectedType.value === 1) {
      this.getEmployeeDropDown();
    }
  };

  handleMonthChange = (selectedMonth) => {
    this.setState({
      selectedMonth,
    });
  };

  handleYearChange = (selectedYear) => {
    this.setState({
      selectedYear,
    });
  };

  generateOptions = (array) => {
    let options = [];
    for (let y = 0; y < array.length; y++) {
      let data = array[y];
      options.push({
        value: data.id,
        label: data.name,
      });
    }
    return options;
  };

  getReportData = () => {
    this.setState({
      blocking: true,
      showGraph: false,
    });

    getEmployeeRecordByMonthYear(
      this.state.selectedEmployee.value,
      this.state.selectedMonth.value,
      this.state.selectedYear.value,
      this.state.userRole
    )
      .then((res) => {
        if (res && res.isSuccess) {
          this.setState({
            blocking: false,
            barAbsentCount: res.data.absent,
            barPresentCount: res.data.present,
            noData: false,
          });
          let xAxis = [];
          let yAxis = [];
          // eslint-disable-next-line
          Object.entries(res.data.all).map(([key, value]) => {
            yAxis.push(value);
            xAxis.push(key);
          });
          let max = 4;
          if (xAxis.length > 10) {
            max = 5;
          } else {
            max = xAxis.length - 1;
          }
          let labels = ["NO", "YES"];
          this.setState(
            {
              options: {
                chart: {
                  type: "column",
                },
                credits: {
                  enabled: false,
                },
                xAxis: {
                  categories: xAxis, // x axis
                  min: 0,
                  max: max,
                  scrollbar: {
                    enabled: true,
                  },
                },
                yAxis: {
                  title: {
                    text: "Employee present",
                  },
                  labels: {
                    formatter: function () {
                      if (this.pos === 0) {
                        return labels[0];
                      } else if (this.pos === 1) {
                        return labels[1];
                      } else {
                        return "";
                      }
                    },
                  },
                  min: 0,
                },
                title: {
                  text:
                    capitalizeFirstLetter(this.state.selectedEmployee.label) +
                    " Present Days ",
                },
                legend: {
                  enabled: false,
                },
                plotOptions: {
                  series: {
                    turboThreshold: 0,
                    cursor: "pointer",
                  },
                  column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                  },
                },
                tooltip: {
                  // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                  pointFormat:
                    '<span style="color:{point.color}">Is present </span>: <b>Yes</b><br/>',
                },
                series: [
                  {
                    name: "Employee",
                    data: yAxis,
                  },
                ],
              },
            },
            () => {
              this.setState({
                showGraph: true,
              });
            }
          );
        } else {
          this.setState({
            blocking: false,
            noData: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          blocking: false,
          noData: true,
        });
        if (error.detail) {
          warningToast(error.detail);
        } else {
         console.log("error.detail",error.detail)
        }
      });
  };

  getTodayData = () => {
    let data = [];
    this.setState({
      blocking: true,
    });
    getTodayReport(this.state.userRole)
      .then((res) => {
        if (res && res.isSuccess && res.data.length > 0) {
          this.setState({
            blocking: false,
            noData: false,
          });
          res.data.map((obj, index) =>
            data.push({
              id: index + 1,
              Employee_name: obj.name,
              Date: dateTimeFormatter(obj.date),
              Present: obj.is_present === 1 ? "Yes" : "No",
            })
          );

          this.setState({
            data: data,
            showTable: true,
          });
        } else {
          this.setState({
            blocking: false,
            showTable: false,
            noData: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          blocking: false,
          noData: true,
        });
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      });
  };

  getEmpByDate = () => {
    this.setState({
      blocking: true,
      showPiGraph: false,
    });
    getEmployeeByDate(this.state.startDate.split("T")[0], this.state.userRole)
      .then((res) => {
        if (res && res.isSuccess && res.data.data.length > 0) {
          this.setState({
            noData: false,
          });
          let presentCount = res.data.present;
          let absentCount = res.data.not_present;
          let piData = [];
          res.data.data.map((obj, index) =>
              piData.push({
              id: index + 1,
              Employee_name: obj.name,
              Date: dateTimeFormatter(obj.date),
              Present: obj.is_present === 1 ? "Yes" : "No",
            })
          );

          this.setState(
            {
              piOptions: {
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: "pie",
                },
                title: {
                  text: "No. of employees present",
                },
                tooltip: {
                  pointFormat: "<b>{point.y}</b>",
                },
                accessibility: {
                  point: {
                    valueSuffix: "",
                  },
                },
                plotOptions: {
                  pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: {
                      enabled: true,
                      formatter: function () {
                        if (this.y === 1) {
                          return (
                            "<b>" +
                            capitalizeFirstLetter(this.point.name) +
                            " Employee </b>"
                          );
                        } else if (this.y === 0) {
                          return (
                            "<b>" +
                            capitalizeFirstLetter(this.point.name) +
                            " Present </b>"
                          );
                        }
                      },
                    },
                  },
                },
                series: [
                  {
                    name: "Employee",
                    colorByPoint: true,
                    data: [
                      {
                        name: "present",
                        y: presentCount,
                      },
                      {
                        name: "absent",
                        y: absentCount,
                      },
                    ],
                  },
                ],
              },
            },
            () => {
              this.setState({
                piData: piData,
                blocking: false,
                showPiGraph: true,
              });
            }
          );
        } else {
          this.setState({
            blocking: false,
            showPiGraph: false,
            noData: true,
          });
          warningToast("Data Not Found For This Duration");
        }
      })
      .catch((error) => {
        this.setState({
          blocking: false,
          showPiGraph: false,
          noData: true,
        });
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      });
  };

  render() {
    const { data, columns, piData } = this.state;
    return (
      <Fragment>
        <BlockUi tag="div" blocking={this.state.blocking} color="#147b82">
          <Container className={"p-0"} fluid={true}>
            <div
              className="example example-compact"
            >
              <CardBody>


                <Row className="space">
                  <Col xl={3} xs={12} md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="mb-4">Select Type</Form.Label>
                      <ReactSelectDropDownCommon
                          placeholder="Select Type"
                          isSearchable={true}
                          value={this.state.selectedType}
                          onChange={this.handleTypeChange}
                          options={this.state.labelOptions}
                      />
                    </Form.Group>
                  </Col>



                {this.state.selectedType?.value === 1 && (
                  <>
                    <Col xl={2} xs={12} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="mb-4">Select Month</Form.Label>
                        <ReactSelectDropDownCommon
                            placeholder="Select Month"
                            isSearchable={true}
                            value={this.state.selectedMonth}
                            onChange={this.handleMonthChange}
                            options={this.state.selectedMonthOptions}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={2} xs={12} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="mb-4">Select Year</Form.Label>
                        <ReactSelectDropDownCommon
                            placeholder="Select Year"
                            isSearchable={true}
                            value={this.state.selectedYear}
                            onChange={this.handleYearChange}
                            options={this.state.generatedYear}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={2} xs={12} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="mb-4">Select Employee</Form.Label>
                        <ReactSelectDropDownCommon
                            placeholder="Select Employee"
                            isSearchable={true}
                            value={this.state.selectedEmployee}
                            onChange={this.handleEmployeeChange}
                            options={this.state.employeeDropdownOptions}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={3} xs={12} md={6} sm={12}  style={{marginTop : "32px"}}>
                      <Form.Group className="mb-3">
                        <CustomizedButtons
                            title={"Submit"}
                            submit={() => {
                              this.getReportData();
                            }}
                            color={"primary"}
                            flag={!(
                                this.state.selectedMonth &&
                                this.state.selectedYear &&
                                this.state.selectedEmployee
                            )}
                        />

                      </Form.Group>
                    </Col>
                  </>
                )}
                {this.state.selectedType?.value === 2 && (
                  <>
                    <Col xl={3} xs={12} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="mb-4">Select Date</Form.Label>
                        <DatePicker
                            style={{
                              border: "1px solid hsl(0,0%,80%)",
                              minHeight: "40px",
                            }}
                            placeholder="Select Date"
                            className="teal filterDateWidth"
                            format="MM/DD/YYYY"
                            value={this.state.startDate}
                            onChange={(date) =>
                                this.handleStartDateChange(date)
                            }
                            plugins={[<DatePanel markFocused />]}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={3} xs={12} md={6} sm={12} style={{marginTop : "32px"}}>
                      <Form.Group className="mb-3">
                        <CustomizedButtons
                            title={"Submit"}
                            submit={() => {
                              this.getEmpByDate();
                            }}
                            color={"primary"}
                            flag={this.state.temp}
                        />
                      </Form.Group>
                    </Col>
                  </>
                )}
                </Row>
                <Row>
                  <Col
                    xl={12}
                    style={{
                      padding: "10px 40px 10px 40px",
                      minWidth: "100px",
                    }}
                  >
                    {this.state.showGraph &&
                      this.state.selectedType?.value === 1 && (
                        <>
                          <h3 className={"mt-2 mb-4"}>
                            Attendance of employee
                          </h3>
                          <hr />
                          <div className="row mt-4">
                            <div className="col-xl-6">
                              <div className="col bg-primary px-6 py-8 rounded-xl ml-3 mr-3  mb-3 my-widget my-widget3">
                                <span className="svg-icon svg-icon-3x svg-icon-white d-block my-2">
                                  <SVG
                                    src={toAbsoluteUrl(
                                      "/media/svg/icons/Layout/Layout-4-blocks.svg"
                                    )}
                                  />
                                  <div className="text-white font-weight-bold font-size-h6">
                                    {this.state.barPresent}
                                  </div>
                                  <span
                                    className={`text-white font-weight-bold font-size-h6`}
                                  >
                                    {this.state.barPresentCount}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="col bg-primary px-6 py-8 rounded-xl ml-3 mr-3  mb-3 my-widget my-widget3">
                                <span className="svg-icon svg-icon-3x svg-icon-white d-block my-2">
                                  <SVG
                                    src={toAbsoluteUrl(
                                      "/media/svg/icons/Layout/Layout-4-blocks.svg"
                                    )}
                                  />
                                  <div className="text-white font-weight-bold font-size-h6">
                                    {this.state.barAbsent}
                                  </div>
                                  <span
                                    className={`text-white font-weight-bold font-size-h6`}
                                  >
                                    {this.state.barAbsentCount}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.options}
                          />
                        </>
                      )}
                    {this.state.showPiGraph &&
                    this.state.selectedType?.value === 2 ? (
                      <>
                        <h3 className={"mt-2 mb-4"}>Attendance of employee</h3>
                        <hr />
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={this.state.piOptions}
                        />
                        <BootstrapTable
                          classes="table reportTable table-head-custom table-vertical-center table-horizontal-center overflow-hidden"
                          bootstrap4
                          wrapperClasses="table-responsive"
                          bordered={false}
                          keyField="id"
                          data={piData}
                          columns={columns}
                          pagination={pagination}
                        />
                      </>
                    ) : this.state.noData ? (
                      <h5 style={{ textAlign: "center" }}>No Data Found</h5>
                    ) : null}
                    {this.state.showTable &&
                      this.state.selectedType?.value === 3 && (
                        <>
                          <h3 className={"mt-2 mb-4"}>Today's Attendance </h3>
                          <hr className={"mb-3"} />
                          <BootstrapTable
                            classes="table reportTable table-head-custom table-vertical-center table-horizontal-center overflow-hidden"
                            bootstrap4
                            wrapperClasses="table-responsive"
                            bordered={false}
                            keyField="id"
                            data={data}
                            columns={columns}
                            pagination={pagination}
                          />
                        </>
                      )}
                  </Col>
                </Row>
              </CardBody>
            </div>
          </Container>
        </BlockUi>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return { user: auth.user };
}

export default connect(mapStateToProps, auth.actions)(Reports);
