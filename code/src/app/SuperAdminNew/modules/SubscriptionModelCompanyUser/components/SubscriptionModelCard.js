import React, {useEffect, useState} from "react";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {Col, Row} from "reactstrap";
import {CardHeader} from "@mui/material";
import SubscriptionModelTable from "./SubscriptionModelTable";
import {
    AllSubscriptionModelData
} from "../../../../../utils/SuperAdmin/enums/CompanyOption";
import ConfigureSubscriptionModelPage from "./ConfigureSubscriptionModelPage";

export function SubscriptionModelCard() {

    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        setCurrentItems(AllSubscriptionModelData);
    },[AllSubscriptionModelData]);


    const onChangeDeploymentStatus = row => {
        setLoading(true)
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
        setLoading(false)
        setShowModal(false);
    };


    return (
        <>
            <Card className="example example-compact" style={{minHeight: "300px"}}>
                <CardBody style={{minHeight: "300px", padding: "10px 10px"}}>
                    <Row>
                        <Col xl={8} xs={12} md={7}>
                            <CardHeader title="Subscription Model Details"/>
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
                            <SubscriptionModelTable
                                currentItems={currentItems}
                                pageNo={pageNo}
                                pageSize={pageSize}
                                onChangeDeploymentStatus={onChangeDeploymentStatus}
                                handleChangePage={(event, newPage) =>
                                    handleChangePage(event, newPage)
                                }
                                handleChangeRowsPerPage={event =>
                                    handleChangeRowsPerPage(event)
                                }
                                loading={loading}
                            />
                            {/*      </div>*/}
                            {/*    </>*/}
                            {/*)}*/}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            {showModal && <ConfigureSubscriptionModelPage show={showModal} onHide={handleClose} setLoading={setLoading}/>}

        </>
    );
}
