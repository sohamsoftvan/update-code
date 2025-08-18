import React, {useEffect, useState} from 'react';
import {AllStorageFrameData} from "../../../../../../utils/SuperAdmin/enums/CompanyOption";
import {Col, Row} from "reactstrap";
import {CardHeader} from "@mui/material";
import StorageFrameTable from "./StorageFrameTable";
import {UploadModal} from "./UploadModal";

const StorageFramePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        setCurrentItems(AllStorageFrameData);
    },[AllStorageFrameData]);


    const handleUploadModal = row => {
        setShowModal(true);
    };


    const handleChangePage = (event, newPage) => {
        setPageNo(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNo(0);
    }
    const handleClose = () => {
        setShowModal(false);
    };


    return (
        <>
            {/*<Card className="example example-compact" style={{minHeight: "300px"}}>*/}
            {/*    <CardBody style={{minHeight: "300px", padding: "10px 10px"}}>*/}
                    <Row>
                        <Col xl={8} xs={12} md={7}>
                            <CardHeader title="Storage Frame Details"/>
                        </Col>
                        <Col xl={4} xs={12} md={5} style={{marginTop: "10px"}}>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xl={12} style={{padding: "10px 20px", minWidth: "300px"}}>
                            {/*{false ? (*/}
                            {/*    <TableLoader />*/}
                            {/*) : (*/}
                            {/*    <>*/}
                            {/*      <div>*/}
                            <StorageFrameTable
                                currentItems={currentItems}
                                pageNo={pageNo}
                                pageSize={pageSize}
                                handleChangePage={(event, newPage) =>
                                    handleChangePage(event, newPage)
                                }
                                handleChangeRowsPerPage={event =>
                                    handleChangeRowsPerPage(event)
                                }
                                handleUploadModal={handleUploadModal}
                            />
                            {/*      </div>*/}
                            {/*    </>*/}
                            {/*)}*/}
                        </Col>
                    </Row>
            {/*    </CardBody>*/}
            {/*</Card>*/}
            {showModal && <UploadModal uploadModalStatus={showModal} setUploadModalStatus={setShowModal} />}

        </>
    );
};

export default StorageFramePage;