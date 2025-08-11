import React, {useMemo} from "react";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {FeedbackTable} from "./feedback-details-table/FeedbackTable";
import {useFeedbackUIContext} from "./FeedbackUIContext";
import {Col, Row} from "reactstrap";
import {CardHeader} from "@mui/material";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";

export function FeedbackCard() {
    const feedbackUIContext = useFeedbackUIContext();
    const feedbackUIProps = useMemo(() => {
        return {
            newFeedbackButtonClick: feedbackUIContext.openNewFeedbackDialog
        };
    }, [feedbackUIContext]);

    return (
        <Card className="example example-compact" style={{minHeight:'300px'}}>
            <CardBody style={{minHeight:'300px', padding:"10px 10px"}}>
                <Row>
                    <Col xl={8} xs={12} md={7}>
                        <CardHeader title="Feedback Details Data" />
                    </Col>
                    <Col xl={4} xs={12} md={5} style={{marginTop: "10px"}}>
                        <Row>
                            <Col xl={12} xs={12} md={12} lg={12} sm={12} className="text-lg-right text-md-right text-xl-right text-sm-right  text-right header-btn" >

                                <CustomizedButtons
                                    title={"Add Feedback Details"}
                                    submit={feedbackUIProps.newFeedbackButtonClick}
                                    color={"primary"}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xl={12}  style={{padding:"10px 20px",minWidth:"300px"}}>
                        <FeedbackTable/>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}
