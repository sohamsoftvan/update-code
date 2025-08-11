import React, {useEffect, useState} from "react";
import {headerSortingClasses, sortCaret} from "../../../../../../_metronic/_helpers";
import {Col, Row} from "reactstrap";
import {CommonBoootstrapTable} from "../../../../../../utils/CommonBoootstrapTable";
import TableLoader from "../../../../../../utils/SuperAdmin/Loader/TableLoader";

export function MyAllCameraStatusTable({
                                           currentItems,
                                           showTable,
                                           totalCount,
                                           pageNo,
                                           pageSize,
                                           pageChange,
                                           sizePerPageChangeApiCall
                                       }) {
    const [filterEntities, setFilterEntities] = useState([]);

    const calculateIndex = (rowIndex) => {
        const validPageNo = pageNo || 1; // Fallback to page 1
        const validPageSize = pageSize || 10; // Default page size is 10
        return (validPageNo - 1) * validPageSize + (rowIndex + 1);
    };


    const columns = [
        {
            dataField: "#",
            text: "Index",
            formatter: (cell, row, rowIndex) => {
                const index = calculateIndex(rowIndex);
                return <span>{index}</span>;
            }
        },
        {
            dataField: "camera_name",
            text: "Cameras",
            sortCaret: sortCaret,
            headerSortingClasses,
            style: {
                minWidth: "55px"
            }
        },
        {
            dataField: "is_active",
            text: "Camera Status",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: (row) => {
                // Conditional rendering based on the row value
                if (row) {
                    return (
                        <span
                            style={{
                                backgroundColor: "#196e00d1",
                                color: "white",
                                padding: "5px 12px",
                                borderRadius: "12px",
                            }}
                        >
          Active
        </span>
                    );
                } else {
                    return (
                        <span
                            style={{
                                backgroundColor: "#b9323fe6",
                                color: "white",
                                padding: "5px 12px",
                                borderRadius: "12px",
                            }}
                        >
          Inactive
        </span>
                    );
                }
            },
        }
    ];

    useEffect(() => {
        setFilterEntities(currentItems);
    }, [currentItems]);


    const onPageChange = (page, sizePerPage) => {
        pageChange(page, sizePerPage);
    };
    const sizePerPageChange = (page, sizePerPage) => {
        sizePerPageChangeApiCall(sizePerPage, page);
    };

    return (
        <>
            <Row>
                <Col xl={12} lg={12} xs={12} md={12}>
                    {showTable ? <div className={"table-loader-wrapper"}><TableLoader/></div> :
                        <div
                            className={filterEntities?.length > 0 ? "table-wrapper-common" : "table-wrapper-common-no-data"}>
                            <CommonBoootstrapTable
                                sizePerPageList={[
                                    {text: "10", value: 10},
                                    {text: "50", value: 50},
                                    {text: "100", value: 100},
                                ]}
                                hideSizePerPage={false}
                                showTotal={true}
                                alwaysShowAllBtns={true}
                                hidePageListOnlyOnePage={true}
                                columns={columns}
                                data={filterEntities}
                                sizePerPage={pageSize}
                                page={pageNo}
                                totalSize={totalCount}
                                onTableChange={onPageChange}
                                sizePerPageChange={sizePerPageChange}
                                noDataIndication={() => (
                                    <div className="table-noDataIndication">No Data Found</div>
                                )}
                            />
                        </div>
                    }
                </Col>
            </Row>
        </>
    );
}
