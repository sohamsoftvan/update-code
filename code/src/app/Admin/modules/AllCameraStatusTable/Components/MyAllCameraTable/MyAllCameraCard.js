import React, {useEffect, useState} from "react";
import {
    Col,
    Row,
} from "react-bootstrap";
import {CardHeader} from "@mui/material";
import {warningToast} from "../../../../../../utils/ToastMessage";
import {MyAllCameraStatusTable} from "./MyAllCameraStatusTable";
import {getAllCameraStatus} from "../../_redux/MyAllCameraApi";
import {Card, CardBody} from "../../../../../../_metronic/_partials/controls";

function MyAllCameraStatusCard() {
    const [currentItems, setCurrentItems] = useState([]);
    const [showTable, setShowTable] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const cameraId = {
            page_number: pageNo,
            page_size: pageSize,
        }
        getCameraStatus(cameraId);

    }, [pageNo, pageSize]);



    function getCameraStatus(body) {
        setShowTable(true);
        getAllCameraStatus(body)
            .then(response => {
                if (response && response.isSuccess) {
                    if (response.data.items.length > 0) {
                        const pageInfo = response.data.page_info;

                        // Handle next/previous page logic
                        if (pageInfo.next_page) {
                          setPageNo(pageInfo.next_page - 1); // Set to current page
                        } else if (pageInfo.pre_page) {
                          setPageNo(pageInfo.pre_page + 1); // If no next page, fallback to previous page
                        } else {
                          setPageNo(1); // Default to page 1 if no page info available
                        }

                        // Update pagination state
                        setPageSize(pageInfo.page_size);
                        setTotalCount(pageInfo.total_count);
                        setShowTable(false);
                        setCurrentItems(response.data.items);
                    }
                } else throw new Error();
            })
            .catch(error => {
                setShowTable(false);
                setCurrentItems([]);
                if (error.detail) {
                    warningToast(error.detail);
                } else {
                    warningToast("Something went Wrong");
                }
            });
    }

    const sizePerPageChangeApiCall = (page, sizePerPage) => {
        setPageNo(1);
        setPageSize(sizePerPage);

    };

    const pageChange = (page, sizePerPage) => {
        setPageNo(page);
        setPageSize(sizePerPage);
    };

    return (
        <Card className="example example-compact fixed-height-card">
            <CardBody className="custom-card-body">
                <Row className="align-items-center">
                    <Col xs={12} md={12}>
                        <CardHeader title="Camera Status" className="p-2" />
                    </Col>
                </Row>
                <hr />
                <MyAllCameraStatusTable
                    getAllCameraLocationModal={getCameraStatus}
                    currentItems={currentItems}
                    setCurrentItems={setCurrentItems}
                    showTable={showTable}
                    pageNo={pageNo}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    setPageSize={setPageSize}
                    setPageNo={setPageNo}
                    pageChange={(page, sizePerPage) => pageChange(page, sizePerPage)}
                    sizePerPageChangeApiCall={(page, sizePerPage) =>
                        sizePerPageChangeApiCall(page, sizePerPage)
                    }
                />
            </CardBody>
        </Card>
    );
}

export default MyAllCameraStatusCard;
