import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import {
  Card,
  CardBody,
  Pagination
} from "../../../../_metronic/_partials/controls";
import {CardHeader} from "@mui/material";
import paginationFactory, {
  PaginationProvider
} from "react-bootstrap-table2-paginator";
import "react-block-ui/style.css";
import BlockUi from "react-block-ui";
import { connect } from "react-redux";
import * as auth from "../Auth";
import SVG from "react-inlinesvg";
import { warningToast, successToast } from "../../../../utils/ToastMessage";
import AddEmployee from "../Modal/addEmployee";
import {
  entityFilter,
  getFilteredAndPaginatedEntities,
  getPaginationOptions,
  headerSortingClasses,
  sortCaret,
  toAbsoluteUrl
} from "../../../../_metronic/_helpers";
import {
  getCurrentCompanyEnabledLocations,
  getAllEnabledEmployeeByCompanyId,
  getEmployeeById,
  employeeTrained,
  employeeUntrained,
  updateStatus
} from "./_redux";
import { Checkbox } from "@mui/material";
import SweetAlert from "react-bootstrap-sweetalert";
import ViewEmployee from "../Modal/viewEmployee";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { SearchText } from "../../../../utils/SearchText";
import { AutoServingTable } from "../../../../utils/AutoServingTable";
import { useEmployeeUIContext } from "./EmployeeUIContext";
import CustomizedButtons from "../../../../utils/SuperAdmin/CustomizedButtons";
import CustomizedSwitch from "../../../../utils/SuperAdmin/CustomizedSwitch";

export function Employee() {
  const EmployeeUIContext = useEmployeeUIContext();
  const EmployeeUIProps = useMemo(() => EmployeeUIContext, [EmployeeUIContext]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [columns, setColumns] = React.useState([]);
  const [employeeAray, setEmployeeAray] = React.useState([]);
  const [showTable, setShowTable] = React.useState(false);
  const [showNoDataFound, setShowNoDataFound] = React.useState(false);
  const [blocking, setBlocking] = React.useState(false);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [trainedEmploeeIds, setTrainedEmploeeIds] = React.useState([]);
  const [changeStatusAlert, setChangeStatusAlert] = React.useState(false);
  const [employeeDetails, setEmployeeDetails] = React.useState({});
  const [viewEmployeeDetails1, setViewEmployeeDetails] = React.useState(false);
  const [locationDropDownDetails, setLocationDropDownDetails] = React.useState(
    []
  );
  const [changeUntraineStatus, setChangeUntraineStatus] = React.useState(false);
  const [trainedArray, setTrainedArray] = React.useState([]);
  const [editEmployeeDetails1, setEditEmployeeDetails] = React.useState("");
  const [locationList, setLocationList] = React.useState([]);
  const [
    cellContentForUntraineStatus,
    setCellContentForUntraineStatus
  ] = React.useState([]);
  const [rowForUntraineStatus, setRowForUntraineStatus] = React.useState([]);
  const [cellContent, setCellContent] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const [trainFlag, setTrainFlag] = React.useState(false);

  const getEmployeeByIdDetails = id => {
    setBlocking(true);
    getEmployeeById(id)
      .then(response => {
        if (response && response.isSuccess) {
          let data = response.data;
          setBlocking(false);
          setEditEmployeeDetails(data);
          setIsUpdate(true);
          setTimeout(() => {
            addEmployeeModal();
          }, 500);
        }
      })
      .catch(error => {
        if (error.detail) {
         console.log("error.detail",error.detail)
        }
        setBlocking(false);
      });
  };

  function editEmployeeDetails(cellContent, row) {
    let id = cellContent.id;
    getEmployeeByIdDetails(id);
  }
  const getCurrentCompanyEnabledLocationsList = () => {
    blockAddEmployee();
    getCurrentCompanyEnabledLocations()
      .then(response => {
        if (response && response.isSuccess) {
          let data = response.data;
          setLocationList(data);
          setTimeout(() => {}, 500);
        }
      })
      .catch(error => {
        if (error.detail) {
         console.log("error.detail",error.detail)
        }
        getAllEmployeeList();
        setBlocking(false);
      });
  };
  useEffect(() => {
    if (flag) {
      const locationDropDownDetails =
        locationList &&
        locationList.map(items => {
          return { value: items.id, label: items.location_name };
        });
      setLocationDropDownDetails(locationDropDownDetails);
      getAllEmployeeList();
    } else {
      setFlag(true);
    }
    //eslint-disable-next-line
  }, [locationList]);

  const openChangeStatusAlert = (cellContent, row) => {
    setChangeStatusAlert(true);
    setCellContent(cellContent);
  };

  const OpenChangeUntraineStatusAlert = (cellContent, row) => {
    setChangeUntraineStatus(true);
    setCellContentForUntraineStatus(cellContent);
    setRowForUntraineStatus(row);
  };

  const employeeStatusChange = (cellContent) => {
    blockAddEmployee();
    updateStatus({ ...cellContent, status: !cellContent.status })
      .then(response => {
        if (response && response.isSuccess) {
          toggleChangeStatusAlert();
          successToast("Employee Status Updated Successfully");
          blockAddEmployee();
          getAllEmployeeList();
          resetChangeStatusFlag();
        }
      })
      .catch(error => {
       console.log("error.detail",error.detail)
        setBlocking(false);
      });
  };

  const employeeUntrainedStatus = (cellContent, row) => {
    let id = row.action.id;
    blockAddEmployee();
    setShowTable(false);
    employeeUntrained(id)
      .then(response => {
        if (response && response.isSuccess) {
          blockAddEmployee();
          toggleChangeUntraineStatusAlert();
          successToast(response.data);

          setTimeout(() => {
            getAllEmployeeList();
          }, 500);
        }
      })
      .catch(e => {
        console.log("error.detail",e)
        toggleChangeUntraineStatusAlert();
        setBlocking(false);
        setTimeout(() => {
          if (e.response && e.response.status === 500) {
            getAllEmployeeList();
          }
        }, 500);
      });
  };

  function viewEmployeeDetails(cellContent, row) {
    setViewEmployeeDetails(true);
    setEmployeeDetails(cellContent);
  }

  const toggleEmployeeDetailsModal = () => {
    setViewEmployeeDetails(!viewEmployeeDetails1);
  };

  const getAllEmployeeList = () => {
    const columns = [
      {
        dataField: "id",
        text: "Index",
        sort: true,
        sortCaret: sortCaret,
        headerSortingClasses
      },
      {
        dataField: "employee_name",
        text: "Employee Name",
        sort: true,
        sortCaret: sortCaret,
        headerSortingClasses
      },
      {
        dataField: "employee_description",
        text: "Employee Description",
        sort: true,
        sortCaret: sortCaret,
        headerSortingClasses
      },
      {
        dataField: "external_name",
        text: "External Name",
        sort: true,
        sortCaret: sortCaret,
        headerSortingClasses
      },
      {
        dataField: "location_id",
        text: "Location",
        sort: true,
        sortCaret: sortCaret,
        headerSortingClasses
      },
      {
        dataField: "trained_status",
        text: "Trained Status",
        formatter: (cellContent, row) => {
          return (
            <>
              {cellContent ? (
                  <CustomizedSwitch
                      checked={cellContent}
                      onChange={() =>
                          OpenChangeUntraineStatusAlert(cellContent, row)
                      }
                      color={"primary"}
                      className={"cursor-pointer"}
                  />
              ) : (
                  <CustomizedSwitch
                      disabled={true}
                      checked={cellContent}
                      color={"primary"}
                  />

              )}
            </>
          );
        }
      },

      {
        dataField: "action",
        text: "Actions",
        style: {
          minWidth: "150px"
        },
        formatter: (cellContent, row) => {
          return (
            <>
              <Row className="w-100">
                <Col className="pl-1 pt-0 pb-0  col-lg-4">
                  <div
                    className="btn btn-icon btn-light btn-hover-light-inverse btn-sm"
                    onClick={() => viewEmployeeDetails(cellContent, row)}
                  >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        title="Employee Information"
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Code/Info-circle.svg"
                        )}
                      />
                    </span>
                  </div>
                </Col>
                <Col className="pl-1 pt-0 pb-0 col-lg-4 ">
                  <div
                    className="btn btn-icon btn-light  btn-hover-primary btn-hover-light-inverse btn-sm"
                    onClick={() => editEmployeeDetails(cellContent, row)}
                  >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                        title="Edit Employee Details"
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Write.svg"
                        )}
                      />
                    </span>
                  </div>
                </Col>
                <Col className="pl-1 pt-0 pb-0 col-lg-2 ">
                  <CustomizedSwitch
                      checked={cellContent.status}
                      onChange={() => openChangeStatusAlert(cellContent, row)}
                      color={"primary"}
                      className={"cursor-pointer"}
                  />

                </Col>
              </Row>
            </>
          );
        }
      }
    ];

    setBlocking(true);
    setShowTable(false);
    setShowNoDataFound(false);

    getAllEnabledEmployeeByCompanyId()
      .then(response => {
        let data = [];
        if (response && response.isSuccess) {
          setTrainedArray([]);
          let responseData = response.data;
          if(responseData.length < 1){

            setShowTable(false);
            setShowNoDataFound(true);
            setBlocking(false);
          }
          else {
            for (let i = 0; i < responseData.length; i++) {
              let obj = responseData[i];
              let userStatus = "";
              let actions = [];

              userStatus = obj.status;
              actions.push({ status: userStatus });

              let locationName =
                  locationList &&
                  locationList.filter(items => {
                    if (obj.location_id === items.id) {
                      return items.location_name;
                    }
                    return null;
                  });
              let trainedArr = [...trainedArray];
              if (obj.trained_status) {
                trainedArr.push(i + 1);
                setTrainedArray(trainedArr);
              }
              data.push({
                id: i + 1,
                employee_name: obj.employee_name,
                employee_description: obj.employee_description,
                external_name: obj.external_name,
                location_id:
                    locationName && locationName.length > 0
                        ? locationName[0].location_name
                        : "-",
                trained_status: obj.trained_status,
                action: obj
              });
            }
            setColumns(columns);
            setEmployeeAray(data);
            setFilterEntities(data);
            setTimeout(() => {
              setShowTable(true);
              setBlocking(false);
            }, 500);
          }
        }
      })
      .catch(error => {
        if (error.detail) {
         console.log("error.detail",error.detail)
        }
        setShowTable(false);
        setShowNoDataFound(true);
        setBlocking(false);
      });
  };

  const employeeTrainedDetails = () => {
    let ids = trainedEmploeeIds;
    blockAddEmployee();
    employeeTrained(ids)
      .then(response => {
        if (response && response.isSuccess) {
          blockAddEmployee();
          successToast(response.data);
          setTrainedEmploeeIds([]);
          setTimeout(() => {
            getAllEmployeeList();
          }, 500);
        }
      })
      .catch(error => {
        if (error.detail) {
          warningToast(error.detail);
        } else {
          console.log("error.detail",error.detail)
        }
        setBlocking(false);
        setTrainedEmploeeIds([]);

        setTimeout(() => {
          if (error.response && error.response.status === 500) {
            getAllEmployeeList();
          }
        }, 500);
      });
  };

  const handleOnSelect = (row, isSelect) => {
    let array = trainedEmploeeIds;
    loaderEnable();
    if (!isSelect) {
      const index = array.indexOf(row.action.id);
      array.splice(index, 1);
      if (array.length === 0) {
        setTrainFlag(false);
      }
    } else if (isSelect) {
      array.push(row.action.id);
      setTrainFlag(true);
    }
    setTrainedEmploeeIds(array);
    loaderDisable();
  };

  const getSelectRow = rowData => {
    let data = rowData.data;

    return {
      mode: "checkbox",
      hideSelectAll: true,
      onSelect: handleOnSelect,
      nonSelectable: trainedArray,
      selectionRenderer: ({ rowIndex, ...rest }) => {
        let index = rest.rowKey - 1;
        let trainedStatus = data[index].trained_status;

        return (
          <>
            {!trainedStatus ? (
              <Checkbox disabled={!trainedStatus} {...rest} />
            ) : (
              <Checkbox checked={true} disabled={trainedStatus} />
            )}
          </>
        );
      }
    };
  };

  const addEmployeeModal = () => {
    setModalOpen(!modalOpen);
  };

  const blockAddEmployee = () => {
    setBlocking(!blocking);
  };
  const loaderEnable = () => {
    setBlocking(true);
  };

  const loaderDisable = () => {
    setBlocking(false);
  };

  useEffect(() => {
    getCurrentCompanyEnabledLocationsList();
    //eslint-disable-next-line
  }, []);

  const addEmployeeForm = () => {
    setIsUpdate(false);
    setTimeout(() => {
      addEmployeeModal();
    }, 500);
  };

  const resetEditDetail = () => {
    setEditEmployeeDetails(undefined);
  };

  const resetChangeStatusFlag = () => {};

  const toggleChangeStatusAlert = () => {
    setChangeStatusAlert(!changeStatusAlert);
  };

  const toggleChangeUntraineStatusAlert = () => {
    setChangeUntraineStatus(!changeUntraineStatus);
  };
  const searchInput = useRef("");
  const [filterEntities, setFilterEntities] = useState(employeeAray);
  let currentItems = getFilteredAndPaginatedEntities(
    filterEntities || employeeAray,
    EmployeeUIProps.queryParams
  );
  const filterEmployee = e => {
    const searchStr = e?.target?.value || searchInput?.current?.value;
    const keys = ["id", "employee_name"];
    currentItems = entityFilter(
      employeeAray,
      searchStr,
      keys,
      EmployeeUIProps.queryParams,
      setFilterEntities
    );
  };
  useEffect(() => {
    filterEmployee();
    //eslint-disable-next-line
  }, [EmployeeUIProps.queryParams]);
  return (
    <Fragment>
       <Container className={"p-0"} fluid={true}>
          <Card
            className="example example-compact"
          >
            <CardBody style={{ minHeight: "200px", padding: "10px 10px" }}>
              <Row>
                <Col xl={8} xs={12} md={7}>
                  <CardHeader title="Employee" />
                </Col>
                <Col xl={4} xs={12} md={5} style={{ marginTop: "10px" }}>
                  <Row>
                    <Col
                      xl={12}
                      xs={12}
                      md={12}
                      lg={12}
                      sm={12}
                      className="text-lg-right text-md-right text-xl-right text-sm-right  text-right header-btn"
                    >
                      {trainFlag && (
                          <CustomizedButtons
                              title={"Train Face(s)"}
                              submit={() => employeeTrainedDetails()}
                              color={"primary"}
                          />
                      )}

                      <CustomizedButtons
                          title={"Add Employee"}
                          submit={() => addEmployeeForm()}
                          color={"primary"}
                      />
                    </Col>
                  </Row>

                  <AddEmployee
                    blockAddEmployee={blockAddEmployee}
                    modalOpen={modalOpen}
                    addEmployeeModal={addEmployeeModal}
                    locationDropDownDetails={locationDropDownDetails}
                    editEmployeeDetails={editEmployeeDetails1}
                    isUpdate={isUpdate}
                    getAllEnabledEmployeeByCompanyId={getAllEmployeeList}
                    resetEditDetail={resetEditDetail}
                    resetChangeStatusFlag={resetChangeStatusFlag}
                    loaderEnable={loaderEnable}
                    loaderDisable={loaderDisable}
                    blocking={blocking}
                  />
                </Col>
              </Row>
              <hr />
              <BlockUi tag="div" blocking={blocking} color="#147b82">

              <Row>
                <Col
                  xl={12}

                >
                  {showTable && (
                    <PaginationProvider
                      pagination={paginationFactory(
                        getPaginationOptions(
                          filterEntities.length,
                          EmployeeUIProps.queryParams
                        )
                      )}
                    >
                      {({ paginationProps, paginationTableProps }) => {
                        return (
                          <Pagination paginationProps={paginationProps}>
                            <div className="row mb-5">
                              <Col xl={3} lg={6} xs={12} md={12}>
                                <div className={"searchText"}>
                                  <SearchText
                                    reference={searchInput}
                                    onChangeHandler={filterEmployee}
                                  />
                                </div>
                              </Col>
                            </div>
                            <AutoServingTable
                              columns={columns}
                              items={currentItems}
                              tableChangeHandler={
                                EmployeeUIProps.setQueryParams
                              }
                              paginationTableProps={paginationTableProps}
                              selectRow={getSelectRow({ data: employeeAray })}
                            />
                          </Pagination>
                        );
                      }}
                    </PaginationProvider>
                  )}
                  {!showTable && showNoDataFound && (
                    <h3 style={{ paddingTop: "40px" }} className="text-center">
                      No Data Found
                    </h3>
                  )}
                </Col>
              </Row>
              </BlockUi>
            </CardBody>
          </Card>
          {viewEmployeeDetails1 && employeeDetails && (
            <ViewEmployee
              employeeDetails={employeeDetails}
              viewEmployeeDetails={viewEmployeeDetails1}
              toggleEmployeeDetailsModal={toggleEmployeeDetailsModal}
              locationDropDownDetails={locationDropDownDetails}
            />
          )}
        </Container>

      <SweetAlert
        // info={!isSuccess}
        showCancel={true}
        showConfirm={true}
        confirmBtnText="Confirm"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="light"
        cancelBtnStyle={{ color: "black" }}
        title={"Are you sure ?"}
        onConfirm={() => {
          employeeStatusChange(cellContent);
        }}
        onCancel={() => toggleChangeStatusAlert()}
        show={changeStatusAlert}
        focusCancelBtn
      >
        <BlockUi tag="div" blocking={blocking} color="#147b82"></BlockUi>
      </SweetAlert>

      <SweetAlert
        // info={!isSuccess}
        showCancel={true}
        showConfirm={true}
        confirmBtnText="Confirm"
        confirmBtnBsStyle="primary"
        cancelBtnBsStyle="light"
        cancelBtnStyle={{ color: "black" }}
        title={"Are you sure ?"}
        onConfirm={() => {
          employeeUntrainedStatus(
            cellContentForUntraineStatus,
            rowForUntraineStatus
          );
        }}
        onCancel={() => toggleChangeUntraineStatusAlert()}
        show={changeUntraineStatus}
        focusCancelBtn
      >
        <BlockUi tag="div" blocking={blocking} color="#147b82"></BlockUi>
      </SweetAlert>
    </Fragment>
  );
}

function mapStateToProps(state) {
  const { auth } = state;
  return { user: auth.user };
}

export default connect(mapStateToProps, auth.actions)(Employee);
