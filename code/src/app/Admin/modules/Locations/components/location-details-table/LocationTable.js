import React, { useEffect, useMemo, useRef, useState } from "react";
import paginationFactory, {
  PaginationProvider
} from "react-bootstrap-table2-paginator";
import {
  entityFilter,
  getFilteredAndPaginatedEntities,
  getPaginationOptions,
  headerSortingClasses,
  sortCaret
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import {Card, CardBody, Pagination} from "../../../../../../_metronic/_partials/controls";
import { useLocationUIContext } from "../LocationUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/LocationAction";
import { SearchText } from "../../../../../../utils/SearchText";
import { AutoServingTable } from "../../../../../../utils/AutoServingTable";
import { updateLocationStatus } from "../../_redux/LocationAPI";
import {
  successToast,
  warningToast
} from "../../../../../../utils/ToastMessage";
import * as moment from "moment";
import {Col, Row} from "reactstrap";
import {CardHeader} from "@mui/material";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";
import TableLoader from "../../../../../../utils/SuperAdmin/Loader/TableLoader";
import {fireAlert} from "../../../../../../utils/SuperAdmin/SweetAlert";
import {FireAlertMessage} from "../../../../../../utils/SuperAdmin/enums/firAlert.enums";

export function LocationTable() {
  const locationUIContext = useLocationUIContext();
  const locationUIProps = useMemo(() => ({
    ...locationUIContext,
    newLocationButtonClick: locationUIContext.openNewLocationDialog
  }), [locationUIContext]);

  const columns = [
    {
      dataField: "idx",
      text: "Index",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "55px"
      }
    },
    {
      dataField: "location_name",
      text: "Location Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "165px"
      }
    },
    {
      dataField: "created_date",
      text: "Created Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      // formatter: dateTimeFormatter,
      formatter: (_, row) =>
        moment
          .utc(row?.created_date)
          .local()
          .format("MMMM DD YYYY, h:mm:ss a"),

      style: {
        minWidth: 180
      }
    },
    {
      dataField: "updated_date",
      text: "Updated Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (_, row) =>
        moment
          .utc(row?.updated_date)
          .local()
          .format("MMMM DD YYYY, h:mm:ss a"),

      style: {
        minWidth: 180
      }
    },
    {
      dataField: "action",
      text: "Actions",
      style: {
        minWidth: "150px"
      },
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        changeLocationStatus: changeLocationStatusFunction,
        openEditLocationDialog: locationUIProps.openEditLocationDialog
      }
    }
  ];

  function changeLocationStatusFunction(row) {
    fireAlert(row, FireAlertMessage?.statusChanges, () => {
      let location_id = row.id;
      let location_status = !row.status;
      let updated_date = moment().toISOString();

      updateLocationStatus(location_id, location_status, updated_date)
          .then(response => {
            if (response && response.isSuccess) {
              if (row.status) {
                warningToast("Location Disabled");
              } else {
                successToast("Location Enabled");
              }
              dispatch(actions.fetchLocation());
            }
          })
          .catch(error => {
            if (error.detail) {
              console.log("error.detail", error.detail);
            }
          });
    });
  }


  const { currentState } = useSelector(
    state => ({ currentState: state.location }),
    shallowEqual
  );

  const { entities, listLoading, tableData } = currentState;
  const [filterEntities, setFilterEntities] = useState(entities);
  const searchInput = useRef("");
  let currentItems = getFilteredAndPaginatedEntities(
    filterEntities || entities,
    locationUIProps.queryParams
  );

  const filterLocation = e => {
    if (entities.length > 0) {
      const searchStr = e?.target?.value || searchInput.current.value;
      const keys = ["id", "location_name"];
      currentItems = entityFilter(
        entities || filterEntities,
        searchStr,
        keys,
        locationUIProps.queryParams,
        setFilterEntities
      );
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchLocation());
  }, [dispatch]);
  useEffect(() => {
    filterLocation();
    // eslint-disable-next-line
  }, [entities]);

  return (
    <>
      <Card className="example example-compact fixed-height-card">
      <CardBody className={"custom-card-body"}>
        <Row className="align-items-center">
          {/* Title Section */}
          <Col xs={12} md={6}>
            <CardHeader title="Location Details" className="p-2" />
          </Col>

          {/* Search + Button Section */}
          <Col xs={12} md={6}>
            <div className="d-flex justify-content-md-end flex-wrap gap-2 mt-2 mt-md-0">
                  <div className="mr-3">
                    <SearchText
                        reference={searchInput}
                        onChangeHandler={filterLocation}
                    />
                  </div>
              <CustomizedButtons
                  title="Add Location Details"
                  submit={locationUIProps.newLocationButtonClick}
                  color="primary"
              />
            </div>
          </Col>
        </Row>
        <hr />
        <div className="table-wrapper-common">
          {listLoading ? (
              <div className="table-loader-wrapper">
                <TableLoader rows={currentItems?.length} columns={columns.length} />
              </div>
          ) : (
              <PaginationProvider
                  pagination={paginationFactory(
                      getPaginationOptions(filterEntities?.length, locationUIProps.queryParams)
                  )}
              >
                {({ paginationProps, paginationTableProps }) => (
                    <>
                      <AutoServingTable
                          columns={columns}
                          items={currentItems}
                          tableChangeHandler={locationUIProps.setQueryParams}
                          paginationTableProps={paginationTableProps}
                          className={
                            currentItems?.length > 0
                                ? "table-wrapper-common"
                                : "table-wrapper-common-no-data"
                          }
                          noDataIndication={() => (
                              <div className="table-noDataIndication">No Data Found</div>
                          )}
                      />
                      {currentItems?.length > 0 && (
                          <Pagination
                              isLoading={listLoading}
                              paginationProps={paginationProps}
                          />
                      )}
                    </>
                )}
              </PaginationProvider>
          )}
        </div>
      </CardBody>
    </Card>
    </>
  );
}
