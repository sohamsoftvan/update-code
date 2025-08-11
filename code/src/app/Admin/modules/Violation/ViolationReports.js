import React, {Component, Fragment} from "react";
import {Col, Container, Row} from "reactstrap";
import {CardBody} from "../../../../_metronic/_partials/controls";
import BootstrapTable from "react-bootstrap-table-next";
import {Form} from "react-bootstrap";
import {warningToast} from "../../../../utils/ToastMessage";
import paginationFactory from "react-bootstrap-table2-paginator";
import BlockUi from "react-block-ui";
import Highcharts from "highcharts";
import stock from "highcharts/modules/stock";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import * as moment from "moment";
import {
  getCameraName,
  getEmployeeDropDown,
  getUnknownReport,
  getViolationEmployeeRecordByMonthYear,
  getViolationEmployeeReportByDate,
  getViolationReportByCameraAndLabel
} from "./_redux/ViolationAPI";
import {connect} from "react-redux";
import * as auth from "../Auth";
import ViolationReportEmployee from "../Modal/ViolationReportEmployee";
import {
  getAdminTotalCameras,
  getAllLabelsFromCameraId
} from "../Subscriptions/_redux/DeployedRTSPJobs/DeployedRTSPJobsApi";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import CustomizedButtons from "../../../../utils/SuperAdmin/CustomizedButtons";
import ReactSelectDropDownCommon from "../../../../utils/SuperAdmin/ReactSelectDropDownCommon";

stock(Highcharts);

const dropdownTypeList = [
  {
    id: 1,
    name: "Violation Report Of Employee"
  },
  {
    id: 2,
    name: "Violation Report By Date"
  },
  {
    id: 3,
    name: "Violation Report By Camera And Label"
  },
  {
    id: 4,
    name: "Violation By Unknown Person"
  }
];
const selectedMonthOptions = [
  {
    id: 1,
    name: "January"
  },
  {
    id: 2,
    name: "February"
  },
  {
    id: 3,
    name: "March"
  },
  {
    id: 4,
    name: "April"
  },
  {
    id: 5,
    name: "May"
  },
  {
    id: 6,
    name: "June"
  },
  {
    id: 7,
    name: "July"
  },
  {
    id: 8,
    name: "August"
  },
  {
    id: 9,
    name: "September"
  },
  {
    id: 10,
    name: "October"
  },
  {
    id: 11,
    name: "November"
  },
  {
    id: 12,
    name: "December"
  }
];

// eslint-disable-next-line


const pagination = paginationFactory({
  page: 1,
  sizePerPage: 10,
  lastPageText: ">>",
  firstPageText: "<<",
  nextPageText: ">",
  prePageText: "<",
  showTotal: true,
  alwaysShowAllBtns: true,

  onPageChange: function(page, sizePerPage) {},
  onSizePerPageChange: function(page, sizePerPage) {}
});

class ViolationReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      cname: "",
      empdata: [],
      startDate: new Date(),
      endDate: "",
      calenderShowDate: "",
      calenderData: [],
      temp: true,
      temp1: true,
      barPresent: "Present",
      barPresentCount: 0,
      barAbsent: "Absent",
      barAbsentCount: 0,
      showTable: false,
      labelOptions: [],
      labelDropDown: [],
      employeeDropdownOptions: [],
      selectedEmployee: null,
      noData: false,
      selectedType: null,
      datedata: [{}],
      data: [{}],
      camdata: [{}],
      datecolumns: [{}],
      empcolumn: [{}],
      camcolumns: [{}],
      showGraph: false,
      showPiGraph: false,
      options: {},
      pioptions: {},
      cameraOptions: [],
      activekey: props.activekey
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
      generatedYear: options
    });
  };
  handleStartDateChange = e => {
    if (e) {
      let x = e.day;
      let calenderDate =
        e.year + "-" + e.month.number + "-" + x + " " + e.hour + ":" + e.minute;
      let date = new Date(calenderDate);
      let dateIsoObj = date.toISOString();
      this.setState({
        defaultStartDate: dateIsoObj,
        startDate: dateIsoObj,
        temp: false
      });
    } else {
      this.setState({
        startDate: "",
        temp: true
      });
    }
  };
  handleCameraChange = selectedCamera => {
    this.setState(
      {
        selectedCamera,
        selectedLabel: null
      },
      () => {
        if (selectedCamera.value !== 0) {
          this.setState({ blocking: true });
          let userRole = this.state.userRole;
          getAllLabelsFromCameraId(selectedCamera.value, userRole)
            .then(res => {
              if (res && res.isSuccess) {
                const labelOptions = res.data.map(x => x.labels);
                const obj = labelOptions[0]
                  ?.split(",")
                  .map(l => ({ label: l, value: l }));
                this.setState(
                  {
                    blocking: false
                  },
                  () => {
                    this.setState({
                      labelDropDown: obj
                    });
                  }
                );
              } else {
                this.setState({ blocking: false });
                warningToast("Something went wrong");
              }
            })
            .catch(error => {
              this.setState({ blocking: false });
              if (error.detail) {
                console.log(error.detail);
              }
            });
        }
      }
    );
  };
  handleLabelChange = selectedLabel => {
    this.setState({
      selectedLabel
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.activekey === "results") {
      const column = [
        {
          dataField: "id",
          text: "ID"
        },
        {
          dataField: "Employee_name",
          text: "Name"
        },
        {
          dataField: "Date",
          text: "Date"
        },
        {
          dataField: "Present",
          text: "Present"
        }
      ];

      this.generateYearDropDown();
      this.setState({
        columns: column
      });
      const { user } = this.props;
      let userRole = user.roles[0].role;
      let abc = this.generateOptions(dropdownTypeList);
      let monthDropDown = this.generateOptions(selectedMonthOptions);
      this.setState(
        {
          labelOptions: abc,
          selectedMonthOptions: monthDropDown,
          userRole: userRole
        },
        () => {
          this.getEmployeeDropDown();
        }
      );
    }
  }

  getEmployeeDropDown = () => {
    let dropdownList = [];
    this.setState({
      blocking: true
    });
    getEmployeeDropDown(this.state.userRole)
      .then(res => {
        if (res && res.isSuccess) {
          res.data.map(obj =>
            dropdownList.push({
              label: obj.employee_name,
              value: obj.external_name
            })
          );
          this.setState({
            employeeDropdownOptions: dropdownList,
            blocking: false
          });
        } else {
          this.setState({
            blocking: false
          });
          warningToast("No Employee Found");
        }
      })
      .catch(error => {
        this.setState({
          blocking: false
        });
        if (error.detail) {
          console.log(error.detail);
        }
      });
  };

  handleEmployeeChange = selectedEmployee => {
    this.setState({
      selectedEmployee
    });
  };

  handleTypeChange = selectedType => {
    this.setState({
      selectedType,
      showGraph: false,
      showTable: false,
      showPiGraph: false,
      noData: false,
      selectedMonth: null,
      selectedYear: null,
      selectedEmployee: null,
      selectedCamera: null,
      selectedLabel: null,
      temp: true,
      temp1: true,
      labelDropDown: [],
      startDate: ""
    });
    if (selectedType.value === 3) {
      this.getAllCameraOptions();
    } else if (selectedType.value === 1) {
      this.getEmployeeDropDown();
    }
  };

  handleMonthChange = selectedMonth => {
    this.setState({
      selectedMonth
    });
  };

  handleYearChange = selectedYear => {
    this.setState({
      selectedYear
    });
  };

  generateOptions = array => {
    let options = [];
    for (let y = 0; y < array.length; y++) {
      let data = array[y];
      options.push({
        value: data.id,
        label: data.name
      });
    }
    return options;
  };

  generateLabelOptions = array => {
    let options = [];
    for (let y = 0; y < array.length; y++) {
      let data = array[y];
      options.push({
        value: data,
        label: data
      });
    }
    return options;
  };

  handleInfo = (cellContent, row) => {
    this.setState(
      {
        key: row.id,
        isOpen: true
      },
      () => {
        this.getCameraDetails(row.camera_id);
      }
    );
  };
  getCameraDetails = x => {
    this.setState({
      blocking: true
    });
    getCameraName(x, this.state.userRole)
      .then(res => {
        if (res && res.isSuccess) {
          this.setState({
            blocking: false,
            noData: false
          });
          this.setState({
            cname: res.data.camera_name
          });
        } else {
          this.setState({
            blocking: false,
            noData: true
          });
          warningToast("Something went wrong");
        }
      })
      .catch(error => {
        this.setState({
          blocking: false,
          noData: true
        });
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      });
  };
  toggleOpen = () => {
    this.setState({
      isOpen: false
    });
  };
  getReportData = () => {
    this.setState({
      blocking: true,
      showTable: false
    });

    getViolationEmployeeRecordByMonthYear(
      this.state.selectedEmployee.value,
      this.state.selectedMonth.value,
      this.state.selectedYear.value,
      this.state.userRole
    )
      .then(res => {
        if (res && res.isSuccess) {
          let data = [];

          // eslint-disable-next-line
          res.data.map((obj, i) => {
            data.push({
              id: i + 1,
              external_image_id: obj.external_image_id?.split("_")[2],
              violation_type: obj.violation_type,
              violation_time: moment
                .utc(obj.violation_time)
                .local()
                .format("MMMM DD YYYY, h:mm:ss a"),
              base_image: obj.base_image,
              camera_id: obj.camera_id,
              created_date: obj.created_date,
              face_id: obj.face_id,
              status: obj.status,
              updated_date: obj.updated_date,
              face_image: obj.face_image
            });
          });

          const empcolumn = [
            {
              dataField: "id",
              text: "ID"
            },
            {
              dataField: "external_image_id",
              text: "Employee Name"
            },
            {
              dataField: "violation_type",
              text: "Violation type"
            },
            {
              dataField: "violation_time",
              text: "Violation time"
            },
            {
              dataField: "actions",
              text: "Actions",
              formatter: (cellContent, row) => {
                return (
                  <>
                    <div
                      className="btn btn-icon mr-4 btn-light btn-hover-light-inverse btn-sm mx-3"
                      onClick={() => this.handleInfo(cellContent, row)}
                    >
                      <span className="svg-icon svg-icon-md svg-icon-primary">
                        <SVG
                          title="Violation Info"
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Code/Info-circle.svg"
                          )}
                        />
                      </span>
                    </div>
                  </>
                );
              }
            }
          ];

          this.setState(
            {
              empdata: data,
              empcolumn: empcolumn,
              blocking: false,
              noData: false
            },
            () => {
              this.setState({
                showTable: true
              });
            }
          );
        } else {
          this.setState({
            blocking: false,
            noData: true,
            showTable: false
          });
          warningToast("Data Not Found For Employee");
        }
      })
      .catch(error => {
        this.setState({
          blocking: false,
          noData: true,
          showTable: false
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
      showTable: false
    });
    getViolationEmployeeReportByDate(
      this.state.startDate.split("T")[0],
      this.state.userRole
    )
      .then(res => {
        if (res && res.isSuccess) {
          let data = [];
          // eslint-disable-next-line
          res.data.map((obj, i) => {
            data.push({
              id: i + 1,
              external_image_id: obj.external_image_id?.split("_")[2],
              violation_type: obj.violation_type,
              violation_time: moment
                .utc(obj.violation_time)
                .local()
                .format("MMMM DD YYYY, h:mm:ss a"),
              base_image: obj.base_image,
              camera_id: obj.camera_id,
              created_date: obj.created_date,
              face_id: obj.face_id,
              status: obj.status,
              updated_date: obj.updated_date,
              face_image: obj.face_image
            });
          });

          const datecolumns = [
            {
              dataField: "id",
              text: "ID"
            },
            {
              dataField: "external_image_id",
              text: "Employee Name"
            },
            {
              dataField: "violation_type",
              text: "Violation type"
            },
            {
              dataField: "violation_time",
              text: "Violation time"
            },
            {
              dataField: "actions",
              text: "Actions",
              formatter: (cellContent, row) => {
                return (
                  <>
                    <div
                      className="btn btn-icon mr-4 btn-light btn-hover-light-inverse btn-sm mx-3"
                      onClick={() => this.handleInfo(cellContent, row)}
                    >
                      <span className="svg-icon svg-icon-md svg-icon-primary">
                        <SVG
                          title="Violation Info"
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Code/Info-circle.svg"
                          )}
                        />
                      </span>
                    </div>
                  </>
                );
              }
            }
          ];

          this.setState(
            {
              empdata: data,
              empcolumn: datecolumns,
              blocking: false,
              noData: false
            },
            () => {
              this.setState({
                showTable: true
              });
            }
          );
        } else {
          this.setState({
            blocking: false,
            showTable: false,
            noData: true
          });
          warningToast("Data Not Found For This Duration");
        }
      })
      .catch(error => {
        this.setState({
          blocking: false,
          showTable: false,
          noData: true
        });
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      });
  };
  getAllCameraOptions = () => {
    this.setState({ blocking: true });
    let userRole = this.state.userRole;
    getAdminTotalCameras(userRole)
      .then(response => {
        if (response && response.isSuccess) {
          let camOpt = [];
          response.data.map(obj =>
            camOpt.push({ label: obj.camera_name, value: obj.id })
          );
          this.setState({
            cameraOptions: camOpt,
            blocking: false
          });
        } else {
          this.setState({ blocking: false });
          warningToast("Something went wrong");
        }
      })
      .catch(error => {
        this.setState({ blocking: false });
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      });
  };
  getEmpByCameraAndLabel = () => {
    this.setState({
      blocking: true,
      showTable: false
    });
    getViolationReportByCameraAndLabel(
      this.state.selectedCamera.value,
      this.state.selectedLabel.value,
      this.state.userRole
    )
      .then(res => {
        if (res && res.isSuccess) {
          let data = [];
          // eslint-disable-next-line
          res.data.map((obj, i) => {
            data.push({
              id: i + 1,
              external_image_id: obj.external_image_id?.split("_")[2],
              violation_type: obj.violation_type,
              violation_time: moment
                .utc(obj.violation_time)
                .local()
                .format("MMMM DD YYYY, h:mm:ss a"),
              base_image: obj.base_image,
              camera_id: obj.camera_id,
              created_date: obj.created_date,
              face_id: obj.face_id,
              status: obj.status,
              updated_date: obj.updated_date,
              face_image: obj.face_image
            });
          });

          const camcolumns = [
            {
              dataField: "id",
              text: "Index"
            },
            {
              dataField: "external_image_id",
              text: "Employee Name"
            },
            {
              dataField: "violation_type",
              text: "Violation type"
            },
            {
              dataField: "violation_time",
              text: "Violation time"
            },
            {
              dataField: "actions",
              text: "Actions",
              formatter: (cellContent, row) => {
                return (
                  <>
                    <div
                      className="btn btn-icon mr-4 btn-light btn-hover-light-inverse btn-sm mx-3"
                      onClick={() => this.handleInfo(cellContent, row)}
                    >
                      <span className="svg-icon svg-icon-md svg-icon-primary">
                        <SVG
                          title="Violation Info"
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Code/Info-circle.svg"
                          )}
                        />
                      </span>
                    </div>
                  </>
                );
              }
            }
          ];
          this.setState(
            {
              empdata: data,
              empcolumn: camcolumns,
              blocking: false,
              noData: false
            },
            () => {
              this.setState({
                showTable: true
              });
            }
          );
        } else {
          this.setState({
            blocking: false,
            showTable: false,
            noData: true
          });
          warningToast("Data Not Found For This Duration");
        }
      })
      .catch(error => {
        this.setState({
          blocking: false,
          showTable: false,
          noData: true
        });
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      });
  };
  getUnknownReport = () => {
    this.setState({
      blocking: true,
      showTable: false
    });
    getUnknownReport(this.state.startDate.split("T")[0], this.state.userRole)
      .then(res => {
        if (res && res.isSuccess) {
          let data = [];
          // eslint-disable-next-line
          res.data.map((obj, i) => {
            data.push({
              id: i + 1,
              external_image_id: "Unknown",
              violation_type: obj.violation_type,
              violation_time: moment
                .utc(obj.violation_time)
                .local()
                .format("MMMM DD YYYY, h:mm:ss a"),
              base_image: obj.base_image,
              camera_id: obj.camera_id,
              created_date: obj.created_date,
              face_id: obj.face_id,
              status: obj.status,
              updated_date: obj.updated_date,
              face_image: obj.face_image
            });
          });

          const datecolumns = [
            {
              dataField: "id",
              text: "ID"
            },
            {
              dataField: "external_image_id",
              text: "Employee Name"
            },
            {
              dataField: "violation_type",
              text: "Violation type"
            },
            {
              dataField: "violation_time",
              text: "Violation time"
            },
            {
              dataField: "actions",
              text: "Actions",
              formatter: (cellContent, row) => {
                return (
                  <>
                    <div
                      className="btn btn-icon mr-4 btn-light btn-hover-light-inverse btn-sm mx-3"
                      onClick={() => this.handleInfo(cellContent, row)}
                    >
                      <span className="svg-icon svg-icon-md svg-icon-primary">
                        <SVG
                          title="Violation Info"
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Code/Info-circle.svg"
                          )}
                        />
                      </span>
                    </div>
                  </>
                );
              }
            }
          ];

          this.setState(
            {
              empdata: data,
              empcolumn: datecolumns,
              blocking: false,
              noData: false
            },
            () => {
              this.setState({
                showTable: true
              });
            }
          );
        } else {
          this.setState({
            blocking: false,
            showTable: false,
            noData: true
          });
          warningToast("Data Not Found For This Duration");
        }
      })
      .catch(error => {
        this.setState({
          blocking: false,
          showTable: false,
          noData: true
        });
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      });
  };

  render() {
    const {
      empcolumn,
      empdata,
      key,
      cameraOptions,
      labelDropDown
    } = this.state;
    return (
      <Fragment>

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
                    <Col xl={3} xs={12} md={6} sm={12} style={{marginTop : "32px"}}>
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
                    <Col xl={2} xs={12} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="mb-4">Select Date</Form.Label>
                        <DatePicker
                            style={{
                              border: "1px solid hsl(0,0%,80%)",
                              minHeight: "40px"
                            }}
                            placeholder="Select Date"
                            className="teal filterDateWidth"
                            format="MM/DD/YYYY"
                            value={this.state.startDate}
                            onChange={date => this.handleStartDateChange(date)}
                            plugins={[<DatePanel markFocused />]}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={2} xs={12} md={6} sm={12} style={{marginTop : "32px"}}>
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


                {this.state.selectedType?.value === 3 && (
                  <>
                    <Col xl={2} xs={12} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="mb-4">Select Camera</Form.Label>
                        <ReactSelectDropDownCommon
                            placeholder="Select Camera"
                            name="camera"
                            className="select-react-dropdown"
                            isSearchable={true}
                            options={cameraOptions}
                            value={this.state.selectedCamera}
                            onChange={c => {
                              this.handleCameraChange(c);
                            }}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={2} xs={12} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="mb-4">Select Label</Form.Label>
                        <ReactSelectDropDownCommon
                            placeholder="Select Label"
                            value={this.state.selectedLabel}
                            onChange={c => {
                              this.handleLabelChange(c);
                            }}
                            isSearchable={true}
                            options={labelDropDown}
                            name="label"
                            className="select-react-dropdown"
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={2} xs={12} md={6} sm={12} style={{marginTop : "32px"}}>
                      <Form.Group className="mb-3">
                        <CustomizedButtons
                            title={"Submit"}
                            submit={() => {
                              this.getEmpByCameraAndLabel();
                            }}
                            color={"primary"}
                            flag={!(
                                this.state.selectedCamera &&
                                this.state.selectedLabel
                            )}
                        />
                      </Form.Group>
                    </Col>
                  </>
                )}
                {this.state.selectedType?.value === 4 && (
                  <>
                    <Col xl={2} xs={12} md={6} sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="mb-4">Select Date</Form.Label>
                        <DatePicker
                            style={{
                              border: "1px solid hsl(0,0%,80%)",
                              minHeight: "40px"
                            }}
                            placeholder="Select Date"
                            className="teal filterDateWidth"
                            format="MM/DD/YYYY"
                            value={this.state.startDate}
                            onChange={date => this.handleStartDateChange(date)}
                            plugins={[<DatePanel markFocused />]}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={2} xs={12} md={6} sm={12} style={{marginTop : "32px"}}>
                      <Form.Group className="mb-3">
                        <CustomizedButtons
                            title={"Submit"}
                            submit={() => {
                              this.getUnknownReport();
                            }}
                            color={"primary"}
                            flag={this.state.temp}
                        />
                      </Form.Group>
                    </Col>

                  </>
                )}
                </Row>
                <BlockUi tag="div" blocking={this.state.blocking} color="#147b82">
                <Row>
                  <Col
                    xl={12}
                    style={{
                      padding: "10px 40px 10px 40px",
                      minWidth: "100px"
                    }}
                  >

                    {this.state.showTable ? (
                      <>
                        <hr />
                        <BootstrapTable
                          classes="table reportTable table-head-custom table-vertical-center table-horizontal-center overflow-hidden"
                          bootstrap4
                          wrapperClasses="table-responsive"
                          bordered={false}
                          keyField="id"
                          data={empdata}
                          columns={empcolumn}
                          pagination={pagination}
                        ></BootstrapTable>
                        <ViolationReportEmployee
                          key1={key}
                          cn={this.state.cname}
                          isOpen={this.state.isOpen}
                          userId={this.props.user.company_id}
                          data={empdata}
                          onHide={() => this.toggleOpen()}
                        />
                      </>
                    ) : this.state.noData ? (
                      <h5 style={{ textAlign: "center" }}>No Data Found</h5>
                    ) : null}
                  </Col>
                </Row>
              </BlockUi>
              </CardBody>
            </div>
          </Container>

      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return { user: auth.user };
}

export default connect(mapStateToProps, auth.actions)(ViolationReports);
