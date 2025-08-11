import React, { useEffect, useMemo, useRef, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider
} from "react-bootstrap-table2-paginator";
import {
  entitiesSorter,
  getHandlerTableChange,
  getPaginationOptions,
  headerSortingClasses,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret
} from "../../../../../../../../_metronic/_helpers";
import * as uiHelpers from "../../../../../../../../utils/UIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../../../_metronic/_partials/controls";
import { matchSorter } from "match-sorter";
import { getEventMetadata } from "../../../../_redux/MyEventApi";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../_redux/MyEventAction";
import { Col, Row } from "reactstrap";
import * as moment from "moment";
import { getEvents } from "../../../../_redux/MyEventApi";
import { useMyEventUIContext } from "../MyEventUIContext";
import {Tooltip} from "@mui/material";
import BlockUi from "react-block-ui";
// eslint-disable-next-line
let currentPage;
export function MyEventTable({
  cameraName,
  selectedLabel,
  startDate,
  endDate,
  selctedCameraId,
  locationIdList
}) {
  const dispatch = useDispatch();
  const myEventUIContext = useMyEventUIContext();
  const myEventUIProps = useMemo(() => myEventUIContext, [myEventUIContext]);
  const [pageParams, setPageParams] = useState({
    pageSize: 0,
    totalPages: 0,
    totalCounts: 0
  });
  const [currentItems, setCurrentItems] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [tableData, setTableData] = useState(false);
  const { currentState } = useSelector(
    state => ({ currentState: state.myEvent }),
    shallowEqual
  );
  const [filterEntities, setFilterEntities] = useState(currentItems);
  const { refreshResult } = currentState;
  function getMyEventMetadata(
    startDate,
    endDate,
    selectedLabel,
    selctedCameraId,
    pageSize,
    locationIdList
  ) {
    setListLoading(true);
    currentPage = 0;
    if (startDate && endDate) {
      getEventMetadata(
        startDate,
        endDate,
        selectedLabel,
        selctedCameraId,
        pageSize,
        locationIdList
      )
        .then(response => {
          if (response && response.isSuccess) {
            setPageParams({
              pageSize: response.data.page_size,
              totalPages: response.data.total_pages,
              totalCounts: response.data.total_count
            });
            // getMyEvents((currentPage = 1));
          } else throw new Error();
        })
        .catch(error => {
          if (error.detail) {
            setListLoading(false);
            console.log(error.detail);
          } else {
           console.log("error.detail",error.detail)
          }
        });
    }
  }

  function getMyEvents(pageNo, pageSize) {
    getEvents(
      pageNo,
      startDate,
      endDate,
      selctedCameraId,
      selectedLabel,
      locationIdList,
      pageSize
    )
      .then(response => {
        if (response && response.isSuccess) {
          setCurrentItems(response.data);
          dispatch(actions.setMyEvents(response.data));
          currentPage = pageNo;
          setListLoading(false);
          if (response.data.length > 0) {
            setTableData(true);
          } else {
            setTableData(false);
          }
        } else throw new Error();
      })
      .catch(err => {
        if (err.detail) {
          setListLoading(false);
          console.log(err.detail);
        } else {
          console.log("error.detail",err.detail)
        }
      });
  }

  useEffect(() => {
    filterMyEvent();
    // eslint-disable-next-line
  }, [currentItems]);

  useEffect(() => {
    const { pageSize } = myEventUIProps.queryParams;

    if ((startDate && endDate) || selectedLabel || selctedCameraId) {
      getMyEventMetadata(
        startDate,
        endDate,
        selectedLabel,
        selctedCameraId,
        pageSize,
        locationIdList
      );
    }
    // eslint-disable-next-line
  }, [myEventUIProps.queryParams.pageSize]);

  // Table columns
  const columns = [
    {
      dataField: "idx",
      text: "Index",
      sort: true,
      style: {
        minWidth: "165px"
      }
    },
    {
      dataField: "event_name",
      text: "event",
      sort: true
    },
    {
      dataField: "event_type",
      text: "event type",
      sort: true
    },
    {
      dataField: "event_desc",
      text: "event description",
      sort: true,
      formatter: event_desc => {
        return (
          <>
            <Tooltip
              className="tools"
              title={<div className="tooltip-font">{event_desc}</div>}
              placement={"bottom"}
            >
              <div
                style={{ width: "200px" }}
                className="short-label-name-length"
              >
                {event_desc}
              </div>
            </Tooltip>
          </>
        );
      }
    },
    {
      dataField: "camera_name",
      text: "Camera Name",
      sort: true,
      formatter: (_, row) => cameraName[parseInt(row?.camera_id)],
      headerSortingClasses,
      style: {
        minWidth: "55px"
      }
    },
    {
      dataField: "event_date.$date",
      text: "Event Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (_, row) =>
        moment
          .utc(row?.event_date.$date)
          .local()
          .format("MMMM DD YYYY, h:mm:ss a"),
      style: {
        minWidth: "165px"
      }
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        cameraName: cameraName,
        filterEntities: filterEntities,
        openViewMyEventDialog: myEventUIProps.openViewMyEventDialog,
        openViewMyEventVideoDialog: myEventUIProps.openViewMyEventVideoDialog
      },
      style: { minWidth: "164px" }
    }
  ];

  const searchInput = useRef("");
  const filterMyEvent = e => {
    const searchStr = e?.target?.value || searchInput.current.value;
    let items = currentItems || [];
    if (searchStr) {
      items = matchSorter(currentItems, searchStr, {
        keys: [
          "_id.$oid",
          "camera_id",
          "created_date.$date",
          "updated_date.$date",
          "status"
        ]
      });
    }
    setFilterEntities(
      items.slice().sort(entitiesSorter(myEventUIProps.queryParams))
    );
  };
  useEffect(() => {
    if (startDate && endDate) {
      let queryparams = myEventUIProps.queryParams;
      queryparams.pageNumber = 1;
      queryparams.pageSize = 10;

      myEventUIProps.setQueryParams(queryparams);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const { pageNumber, pageSize } = myEventUIProps.queryParams;
    if (startDate && endDate) {
      getMyEvents(pageNumber, pageSize);
    }
    // eslint-disable-next-line
  }, [myEventUIProps.queryParams, refreshResult]);

  // const paginationOptions = {
  //   custom: true,
  //   totalSize: pageParams.pageSize * pageParams.totalPages,
  //   sizePerPageList: [
  //     { text: pageParams.pageSize, value: pageParams.pageSize }
  //   ],
  //   sizePerPage: pageParams.pageSize,
  //   page: myEventUIProps.queryParams.pageNumber
  // };

  return (
    <>
      <div className="separator separator-dashed mt-5 mb-5" />
      <BlockUi tag="div" blocking={listLoading} color="#147b82">
        {tableData ? (
          <PaginationProvider
            pagination={paginationFactory(
              getPaginationOptions(
                pageParams.totalCounts,
                myEventUIProps.queryParams
              )
            )}
          >
            {({ paginationProps, paginationTableProps }) => {
              return (
                <Pagination
                  isLoading={listLoading}
                  paginationProps={paginationProps}
                >
                  <>
                    <div className="row mb-5"></div>
                    <Row>
                      <Col
                        xl={12}
                        style={{
                          padding: "10px 40px 10px 40px",
                          minWidth: "300px"
                        }}
                      >
                        <BootstrapTable
                          wrapperClasses="table-responsive"
                          bordered={false}
                          classes="table employeeTable table-head-custom table-vertical-center table-horizontal-center overflow-hidden"
                          bootstrap4
                          remote
                          keyField="_id.$oid"
                          data={
                            filterEntities?.map((i, idx) => ({
                              ...i,
                              idx:
                                (paginationTableProps?.pagination?.options
                                  ?.page -
                                  1) *
                                  paginationTableProps?.pagination?.options
                                    ?.sizePerPage +
                                1 +
                                idx
                            })) || []
                          }
                          columns={columns}
                          defaultSorted={uiHelpers.defaultSorted}
                          onTableChange={getHandlerTableChange(
                            myEventUIProps.setQueryParams
                          )}
                          {...paginationTableProps}
                        >
                          <PleaseWaitMessage entities={null} />
                          <NoRecordsFoundMessage entities={null} />
                        </BootstrapTable>
                      </Col>
                    </Row>
                  </>
                </Pagination>
              );
            }}
          </PaginationProvider>
        ) : (
          <h3 align="center">No Data Found</h3>
        )}
      </BlockUi>
    </>
  );
}
