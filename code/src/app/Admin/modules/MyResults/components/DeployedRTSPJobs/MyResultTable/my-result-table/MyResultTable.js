import React, {useEffect, useMemo, useRef, useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationProvider} from "react-bootstrap-table2-paginator";
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
import {Pagination} from "../../../../../../../../_metronic/_partials/controls";
import {useMyResultUIContext} from "../MyResultUIContext";
import {matchSorter} from "match-sorter";
import {getResultMetadata, getResults} from "../../../../_redux/MyResultApi";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import * as actions from "../../../../_redux/MyResultAction";
import {Button, Col, Row, Spinner} from "reactstrap";
import * as moment from "moment";
import BlockUi from "react-block-ui";
import {getResultForResultExcel} from "../../../../../Subscriptions/_redux/DeployedRTSPJobs/DeployedRTSPJobsApi";
import TableLoader from "../../../../../../../../utils/SuperAdmin/Loader/TableLoader";

let currentPage;

export function MyResultTable({
                                  jobId,
                                  cameraName,
                                  selectedLabel,
                                  startDate,
                                  endDate,
                                  selctedCameraId,
                                  locationIdList
                              }) {
    const dispatch = useDispatch();
    const myResultUIContext = useMyResultUIContext();
    const myResultUIProps = useMemo(() => myResultUIContext, [myResultUIContext]);
    const [pageParams, setPageParams] = useState({
        pageSize: 0,
        totalPages: 0,
        totalCounts: 0
    });
    const [currentItems, setCurrentItems] = useState([]);
    const [listLoading, setListLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [tableData, setTableData] = useState(false);
    const {currentState} = useSelector(
        state => ({currentState: state.myResult}),
        shallowEqual
    );
    const {refreshResult} = currentState;

    const getMyResultMetadata =(
        startDate,
        endDate,
        selectedLabel,
        selctedCameraId,
        pageSize
    ) => {
        setListLoading(true);
        currentPage = 0;
        if (startDate && endDate) {
            getResultMetadata(
                startDate,
                endDate,
                selectedLabel,
                selctedCameraId,
                locationIdList,
                pageSize
            )
                .then(response => {
                    if (response && response.isSuccess) {
                        setPageParams({
                            pageSize: response.data.page_size,
                            totalPages: response.data.total_pages,
                            totalCounts: response.data.total_count
                        });
                        setListLoading(false);
                        // getMyResults((currentPage = 1), response.data.page_size);
                    } else throw new Error();
                })
                .catch(error => {
                    if (error.detail) {
                        setListLoading(false);
                        console.log("error.detail", error.detail)
                    }
                });
        }
    }

    const getMyResults = (pageNo, pageSize) => {
        setListLoading(true);
        getResults(
            pageSize,
            pageNo,
            jobId,
            startDate,
            endDate,
            selctedCameraId,
            selectedLabel,
            locationIdList
        )
            .then(response => {
                if (response && response.isSuccess) {
                    setCurrentItems(response.data);
                    dispatch(actions.setMyResults(response.data));
                    currentPage = pageNo;
                    setListLoading(false);
                    // if (response.data.length > 0) {
                    //   setTableData(true);
                    // } else {
                    //   setTableData(false);
                    // }
                } else throw new Error();
            })
            .catch(err => {
                if (err.detail) {
                    setListLoading(false);
                    console.log("error.detail", err.detail)
                }
            });
    }

    useEffect(() => {
        filterMyResult();
        // eslint-disable-next-line
    }, [currentItems]);

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
            dataField: "count",
            text: "Count",
            sort: true,
            formatter: (_, row) => row?.result?.detection?.length || 0
        },
        {
            dataField: "created_date.$date",
            text: "Created Date",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: (_, row) =>
                moment
                    .utc(row?.created_date.$date)
                    .local()
                    .format("MMMM DD YYYY, h:mm:ss a"),
            style: {
                minWidth: "165px"
            }
        },
        {
            dataField: "labels",
            text: "labels",
            sort: true,
            formatter: (_, row) => Object.keys(row?.counts).toString()
        },
        {
            dataField: "action",
            text: "Actions",
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                cameraName: cameraName,
                openViewMyResultDialog: myResultUIProps.openViewMyResultDialog,
                openViewMyResultVideoDialog: myResultUIProps.openViewMyResultVideoDialog
            },
            style: {minWidth: "164px"}
        }
    ];


    const [filterEntities, setFilterEntities] = useState(currentItems);
    const searchInput = useRef("");
    const filterMyResult = e => {
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
            items.slice().sort(entitiesSorter(myResultUIProps.queryParams))
        );
    };
    useEffect(() => {
        if (startDate && endDate) {
            let queryparams = myResultUIProps.queryParams;
            queryparams.pageNumber = 1;
            queryparams.pageSize = 25;
            myResultUIProps.setQueryParams(queryparams);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const {pageSize} = myResultUIProps.queryParams;

        if ((startDate && endDate) || selectedLabel || selctedCameraId) {
            getMyResultMetadata(
                startDate,
                endDate,
                selectedLabel,
                selctedCameraId,
                pageSize
            );
        }
        // eslint-disable-next-line
    }, [myResultUIProps.queryParams.pageSize]);

    useEffect(() => {
        const {pageNumber, pageSize} = myResultUIProps.queryParams;
        if (startDate && endDate) {
            getMyResults(pageNumber, pageSize);
        }
        // eslint-disable-next-line
    }, [myResultUIProps.queryParams, refreshResult]);


// Function to convert base64 string to Blob (with UTF-8 support)
    function base64ToBlobUTF8(base64, mimeType) {
        // Decode base64 string into a byte array
        const byteCharacters = atob(base64); // This will decode a Latin1 base64 string
        const byteNumbers = new Array(byteCharacters.length);

        // Convert the byte characters to a byte array
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        // Create and return a Blob object from the byte array
        return new Blob([new Uint8Array(byteNumbers)], {type: mimeType});
    }

// Function to handle file download from Blob
    function downloadExcelFromBlob(blob, fileName = "file.xlsx") {
        try {
            if (!(blob instanceof Blob)) {
                throw new Error("Invalid Blob object. Check API response.");
            }

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName; // Set the download file name

            // Trigger the download by simulating a click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the Blob URL
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error during file download:", error);
        }
    }

// Usage in handleSubmit:
    const handleSubmit = () => {

        // Extract the 'oids' from filterEntities
        const oids = filterEntities && filterEntities.map(item => item._id?.$oid);
        setFileLoading(true);
        getResultForResultExcel(oids)
            .then(response => {

                if (response && response.data) {

                    // If it's a base64 string, convert it to a Blob
                    if (typeof response.data === "string") {

                        const blob = base64ToBlobUTF8(response.data, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                        downloadExcelFromBlob(blob, "Results.xlsx");
                        setFileLoading(false);
                    } else if (response.data instanceof Blob) {
                        // If it's already a Blob, download directly
                        downloadExcelFromBlob(response.data, "Results.xlsx");
                        setFileLoading(false);
                    } else {
                        console.error("Invalid response format: not a Blob or base64 string.");
                        setFileLoading(false);
                    }
                } else {
                    console.error("Invalid response format or no data received.");
                    setFileLoading(false);
                }
            })
            .catch(err => {
                console.error("Error during API call:", err);
                setFileLoading(false);
            });
    };
    return (
        <>
            {listLoading ? (<><TableLoader/></>):(
                <>
                    <PaginationProvider
                        pagination={paginationFactory(
                            getPaginationOptions(
                                pageParams.totalCounts,
                                myResultUIProps.queryParams
                            )
                        )}
                    >
                        {({paginationProps, paginationTableProps}) =>  (
                            <>
                                <div className="row mb-5 mr-5 d-flex  justify-content-end">


                                    {filterEntities && filterEntities.length > 0 && (
                                        <Button color="primary" onClick={handleSubmit} disabled={fileLoading}>
                                            {fileLoading ? (
                                                <>
                                                    <Spinner size="sm"/> Downloading...
                                                </>
                                            ) : (
                                                'Download Excel For Results'
                                            )}
                                        </Button>
                                    )}


                                </div>
                                <Row>
                                    <Col
                                        xl={12}
                                        style={{
                                            minWidth: "300px"
                                        }}
                                    >

                                        <>
                                            <div className={filterEntities?.length > 0 ? "table-wrapper" : "table-wrapper-no-data"}>
                                                <BootstrapTable
                                                    wrapperClasses="table-responsive"
                                                    bordered={false}
                                                    classes="table table-head-custom sticky-header-table employeeTable"
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
                                                        myResultUIProps.setQueryParams
                                                    )}
                                                    noDataIndication={() => (
                                                        <div className="table-noDataIndication">No Data Found</div>
                                                    )}
                                                    {...paginationTableProps}
                                                >
                                                    <PleaseWaitMessage entities={null}/>
                                                    <NoRecordsFoundMessage entities={null}/>
                                                </BootstrapTable>
                                            </div>
                                            {filterEntities?.length > 0 && (
                                                <Pagination
                                                    isLoading={listLoading}
                                                    paginationProps={paginationProps}
                                                    hasResults={true}
                                                />

                                            )}
                                        </>

                                    </Col>
                                </Row>
                            </>
                        )}
                    </PaginationProvider>
                </>
            )}

        </>
    );
}
