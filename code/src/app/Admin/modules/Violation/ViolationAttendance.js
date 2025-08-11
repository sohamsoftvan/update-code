import React, {Component, Fragment} from "react";
import BlockUi from "react-block-ui";
import {Col, Container, Row} from "reactstrap";
import {CardBody} from "../../../../_metronic/_partials/controls";
import BootstrapTable from "react-bootstrap-table-next";
import {
  headerSortingClasses,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  toAbsoluteUrl,
} from "../../../../_metronic/_helpers";
import ViolationConfigeModal from "../Modal/ViolationConfigeModal";
import ViolationView from "../Modal/ViolationView";
import SVG from "react-inlinesvg";
import {connect} from "react-redux";
import * as auth from "../Auth";
import {successToast, warningToast} from "../../../../utils/ToastMessage";
import {checkViolationReport, generateViolationReport, getViolationSettings,} from "./_redux/ViolationAPI";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as moment from "moment";
import {Tooltip} from "@mui/material";
import CustomizedButtons from "../../../../utils/SuperAdmin/CustomizedButtons";
import CustomizedSwitch from "../../../../utils/SuperAdmin/CustomizedSwitch";

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

class ViolationAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockAdd: true,
      blocking: false,
      isOpen: false,
      isUpdate: false,
      showTable: false,
      data: [],
      columns: [],
      settings: [],
      temp: false,
      activekey: props.activekey,
    };
  }

  componentDidMount() {
    this.getTableDetails();
    this.checkReportStatus();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  checkReportStatus = () => {
    this.setState({ blocking: true });
    checkViolationReport()
      .then((res) => {
        if (res && res.isSuccess) {
          if (res.data) {
            //disable button
            this.setState({
              temp: false,
            });
          } else {
            //enable button
            this.setState({
              temp: true,
            });
          }
        } else {
          this.setState({ blocking: false });
          warningToast("Something went wrong");
        }
      })
      .catch((error) => {
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
        this.setState({ blocking: false, temp: true });
      });
  };

  startGenerateReport = () => {
    this.setState({ blocking: true });
    generateViolationReport()
      .then((res) => {
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
      .catch((error) => {
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
        this.setState({ blocking: false, temp: true });
      });
  };

  notificationMessage = (cellContent, row) =>{
    this.props.violationNotification(row)
  }

  getTableDetails = () => {
    this.setState({ blocking: true });
    getViolationSettings()
      .then((res) => {
        if (res && res.isSuccess) {
          if (res.data.length !== 0) {
            const settings = res.data;
            const columns = [
              {
                dataField: "id",
                text: "Index",
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
              },
              {
                dataField: "labels",
                text: "LABELS",
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                formatter: (cellContent, row) => {
                  return (
                    <>
                      <Tooltip
                        className="tools"
                        title={<div className="tooltip-font">{row.labels}</div>}
                        placement={"bottom"}
                      >
                        <div
                          style={{ width: "200px" }}
                          className="short-label-name-length"
                        >
                          {row.labels}
                        </div>
                      </Tooltip>
                    </>
                  );
                },
              },
              {
                dataField: "start_time",
                text: "START TIME",
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                formatter: (_, row) =>
                  moment
                    .utc(row?.start_time, "HH:mm")
                    .local()
                    .format("hh:mm:A"),
              },
              {
                dataField: "end_time",
                text: "END TIME",
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                formatter: (_, row) =>
                  moment.utc(row?.end_time, "HH:mm").local().format("hh:mm:A"),
              },
              {
                dataField: "notification",
                text: "NOTIFICATION",
                formatter: (cellContent, row) => {
                  return (
                      <>

                        <CustomizedSwitch
                            checked={cellContent}
                            onChange={() => this.notificationMessage(cellContent,row)}
                            color={"primary"}
                            className={"cursor-pointer"}
                        />
                      </>
                  );
                }
              },
              {
                dataField: "actions",
                text: "Actions",
                style: {
                  minWidth: "150px",
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
                            title="Violation Info"
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
                            title="Violation Update"
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Communication/Write.svg"
                            )}
                          />
                        </span>
                      </div>
                    </>
                  );
                },
              },
            ];
            let data = [];
            let obj = {
              id: 1,
              labels: settings.label,
              start_time: settings.start_time,
              end_time: settings.end_time,
              isMailReceived: settings.isMailReceived,
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
            });
          } else {
            this.setState({
              blockAdd: false,
              blocking: false,
              showTable: false,
            });
          }
        } else {
          this.setState({
            blocking: false,
          });
          warningToast("Something went wrong");
        }
      })
      .catch((error) => {
        this.setState({
          blocking: false,
          blockAdd: false,
          showTable: false,
        });
        if (error.detail) {
          warningToast(error.detail);
        } else {
          warningToast("Something went Wrong");
        }
      });
  };

  handleAdd = () => {
    this.setState({
      isOpen: true,
      isUpdate: false,
      isInfoOpen: false,
    });
  };
  handleInfo = () => {
    this.setState({
      isInfoOpen: true,
      isOpen: false,
      isUpdate: false,
    });
  };
  handleUpdate = () => {
    this.setState({
      isOpen: true,
      isUpdate: true,
      isInfoOpen: false,
    });
  };
  toggleOpen = () => {
    this.setState({
      isOpen: false,
      isInfoOpen: false,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.activekey === "configurations") {
      this.getTableDetails();
      this.checkReportStatus();
    }
  }




  render() {
    const { isOpen, isUpdate, showTable, data, columns, temp } = this.state;
    return (
      <Fragment>
        <BlockUi tag="div" blocking={this.state.blocking} color="#147b82">
          <Container className={"p-0"} fluid={true}>
            <div
              className="example example-compact"

            >
              <CardBody>
                <Row>
                  <Col xl={6} lg={6} md={6} sm={12} />
                  <Col
                    xl={6}
                    lg={6}
                    md={6}
                    sm={12}
                    style={{ marginTop: "10px", textAlign: "right" }}
                  >
                    <CustomizedButtons
                        title={"Generate Report"}
                        submit={() => {
                          this.startGenerateReport();
                        }}
                        color={"primary"}
                        flag={temp}
                        className={"b1"}
                    />
                    <CustomizedButtons
                        title={"Add Configuration"}
                        submit={() => this.handleAdd()}
                        color={"primary"}
                        flag={this.state.blockAdd}
                        className={"b2 ml-4"}
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  {!this.state.blockAdd ? (
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
        <ViolationConfigeModal
          onUpdate={() => this.getTableDetails()}
          isOpen={isOpen}
          isUpdate={isUpdate}
          data={data}
          userId={this.props.user.company_id}
          settings={this.state.settings}
          onHide={() => this.toggleOpen()}
        />
        <ViolationView
          isOpen={this.state.isInfoOpen}
          userId={this.props.user.company_id}
          data={data}
          settings={this.state.settings}
          onHide={() => this.toggleOpen()}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return { user: auth.user };
}

export default connect(mapStateToProps, auth.actions)(ViolationAttendance);
