import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as auth from "../Auth";
import BlockUi from "react-block-ui";
import { Col, Container, Row } from "reactstrap";
import { CardBody } from "../../../../_metronic/_partials/controls";
import BootstrapTable from "react-bootstrap-table-next";
import {
  headerSortingClasses,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  toAbsoluteUrl
} from "../../../../_metronic/_helpers";
import {
  generateAttendanceReport,
  getCompanySettings,
  isAttendanceReportGeneratedToday
} from "./_redux";
import { successToast, warningToast } from "../../../../utils/ToastMessage";
import AttendanceModal from "../Modal/AttendanceModal";
import { getAllDeployedRTSPJobsDetails } from "../Subscriptions/_redux/DeployedRTSPJobs/DeployedRTSPJobsApi";
import SVG from "react-inlinesvg";
import AttendanceInfoModal from "../Modal/AttendanceInfoModal";
import * as moment from "moment";
import paginationFactory from "react-bootstrap-table2-paginator";
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

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockAdd: true,
      settings: {},
      blocking: false,
      isOpen: false,
      isUpdate: false,
      showTable: false,
      data: [],
      columns: [],
      cameraOptions: [],
      currentCamera: {},
      isInfoOpen: false,
      temp: true
    };
  }

  handleInfo = () => {
    this.setState({
      isInfoOpen: true,
      isOpen: false,
      isUpdate: false
    });
  };

  getAllCompanySettings = () => {
    this.setState({ blocking: true });
    getCompanySettings()
      .then(res => {
        if (res && res.isSuccess) {
          if (res.data.length !== 0) {
            const settings = res.data;
            const cam = this.state.cameraOptions;
            const columns = [
              {
                dataField: "id",
                text: "Index",
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses
              },
              {
                dataField: "startTime",
                text: "Start Time",
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                formatter: (_, row) =>
                  moment
                    .utc(row?.startTime, "HH:mm")
                    .local()
                    .format("hh:mm A")
              },
              {
                dataField: "endTime",
                text: "End Time",
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                formatter: (_, row) =>
                  moment
                    .utc(row?.endTime, "HH:mm")
                    .local()
                    .format("hh:mm A")
              },
              {
                dataField: "bufferTime",
                text: "Buffer Time",
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses
              },
              {
                dataField: "camera",
                text: "Camera",
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses
              },
              {
                dataField: "actions",
                text: "Actions",
                style: {
                  minWidth: "150px"
                },
                formatter: (cellContent, row) => {
                  return (
                    <>
                      <div
                        className="btn btn-icon mr-4 btn-light btn-hover-light-inverse btn-sm mx-3"
                        onClick={() => this.handleInfo()}
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            title="Attendance Info"
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Code/Info-circle.svg"
                            )}
                          />
                        </span>
                      </div>
                      <div
                        className="btn btn-icon mr-4 btn-light btn-hover-primary btn-hover-light-inverse btn-sm mx-3"
                        onClick={() => this.handleUpdate()}
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            title="Assign locations"
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Communication/Write.svg"
                            )}
                          />
                        </span>
                      </div>
                    </>
                  );
                }
              }
            ];
            let data = [];
            let obj = {
              id: 1,
              startTime: settings["start_time"],
              endTime: settings["end_time"],
              bufferTime: settings["buffer_time"],
              camera: cam.filter(c => c.value === settings["camera_id"])[0]
                .label,
              actions: settings
            };
            data.push(obj);
            this.setState({
              settings: res.data,
              blockAdd: true,
              blocking: false,
              data: data,
              columns: columns,
              showTable: true,
              pagination: pagination,
              currentCamera: cam.filter(
                c => c.value === settings["camera_id"]
              )[0]
            });
          } else {
            this.setState({
              blockAdd: false,
              blocking: false,
              showTable: false
            });
          }
        } else {
          this.setState({
            blocking: false
          });

        }
      })
      .catch(error => {
        this.setState({
          blocking: false,
          blockAdd: false,
          showTable: false
        });
        if (error.detail) {
          warningToast(error.detail);
        } else {
         console.log("error.detail",error.detail)
        }
      });
  };

  handleAdd = () => {
    this.setState({
      isOpen: true,
      isUpdate: false,
      isInfoOpen: false
    });
  };
  handleUpdate = () => {
    this.setState({
      isOpen: true,
      isUpdate: true,
      isInfoOpen: false
    });
  };
  toggleOpen = () => {
    this.setState({
      isOpen: false,
      isInfoOpen: false
    });
  };

  getAllCameraOptions = () => {
    this.setState({ blocking: true });
    getAllDeployedRTSPJobsDetails()
      .then(res => {
        if (res && res.isSuccess) {
          let camOpt = [];
          res.data.map(obj =>
            obj.deployment_job_rtsp_details.camera_settings.map(cs =>
              camOpt.push({ label: cs.camera_name, value: cs.id })
            )
          );
          this.setState(
            {
              cameraOptions: camOpt,
              blocking: false
            },
            () => {
              this.getAllCompanySettings();
            }
          );
        } else {
          this.setState({ blocking: false });
        }
      })
      .catch(error => {
        this.setState({ blocking: false, blockAdd: false });
        if (error.detail) {
          warningToast(error.detail);
        } else {
         console.log("error.detail",error.detail)
        }
      });
  };

  //For Generating Report
  startGenerateReport = () => {
    this.setState({ blocking: true });
    generateAttendanceReport()
      .then(res => {
        if (res && res.isSuccess) {
          if (res.data) {
            this.setState({ blocking: false, temp: true });
            successToast("Report Generating Started");
          } else {
            this.setState({ blocking: false, temp: false });
            warningToast("Something went wrong");
          }
        } else {
          this.setState({ blocking: false });
          warningToast("Something went wrong");
        }
      })
      .catch(error => {
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
        this.setState({ blocking: false, temp: true });
      });
  };
  //Check Report Status
  checkReportStatus = () => {
    this.setState({ blocking: true });
    isAttendanceReportGeneratedToday()
      .then(res => {
        if (res && res.isSuccess) {
          if (res.data) {
            //disable button
            this.setState({
              temp: false
            });
          } else {
            //enable button
            this.setState({
              temp: true
            });
          }
        } else {
          this.setState({ blocking: false });
          warningToast("Something went wrong");
        }
      })
      .catch(error => {
        this.setState({ blocking: false, temp: true });
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      });
  };
  componentDidMount() {
    this.getAllCameraOptions();
    this.checkReportStatus();
  }
  render() {
    const {
      blocking,
      blockAdd,
      isOpen,
      isUpdate,
      showTable,
      data,
      columns,
      temp
    } = this.state;

    return (
      <Fragment>
        <BlockUi tag="div" blocking={blocking} color="#147b82">
          <Container className={"p-0"} fluid={true}>
            <div
              className="example example-compact"
              style={{ minHeight: "300px" }}
            >
              <CardBody style={{ minHeight: "300px", padding: "10px 10px" }}>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12}></Col>
                  <Col
                    xl={6}
                    lg={6}
                    md={6}
                    sm={12}
                    style={{ marginTop: "10px", textAlign: "right" }}
                  >
                    <customizedButtons
                      title={"Generate Report"}
                      submit={() => {
                        this.startGenerateReport();
                      }}
                      color={"primary"}
                      flag={temp}
                      className={"b1"}
                    />
                    <customizedButtons
                      title={"Add Configuration"}
                      submit={this.handleAdd}
                      color={"primary"}
                      flag={blockAdd}
                      className={"b2  ml-4"}
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  {!blockAdd ? (
                    <Col xl={12} style={{ padding: "10px 20px" }}>
                      <h3 style={{ textAlign: "center" }}>No Data Found</h3>
                    </Col>
                  ) : (
                    <Col
                      xl={12}
                      style={{ padding: "10px 20px", minWidth: "100px" }}
                    >
                      {showTable && (
                        <BootstrapTable
                          classes="table reportTable table-head-custom table-vertical-center table-horizontal-center overflow-hidden"
                          bootstrap4
                          wrapperClasses="table-responsive"
                          bordered={false}
                          keyField="id"
                          data={data}
                          columns={columns}
                        >
                          <PleaseWaitMessage entities={null} />
                          <NoRecordsFoundMessage entities={null} />
                        </BootstrapTable>
                      )}
                    </Col>
                  )}
                </Row>
              </CardBody>
            </div>
          </Container>
        </BlockUi>
        <AttendanceInfoModal
          isOpen={this.state.isInfoOpen}
          data={data}
          settings={this.state.settings}
          onHide={() => this.toggleOpen()}
        />
        <AttendanceModal
          onUpdate={() => this.getAllCompanySettings()}
          settings={this.state.settings}
          currentCamera={this.state.currentCamera}
          cameraOptions={this.state.cameraOptions}
          userId={this.props.user.company_id}
          isOpen={isOpen}
          isUpdate={isUpdate}
          toggleOpen={this.toggleOpen}
        />
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  const { auth } = state;
  return { user: auth.user };
}

export default connect(mapStateToProps, auth.actions)(Attendance);
