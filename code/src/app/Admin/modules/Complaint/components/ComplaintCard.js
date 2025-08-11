import React, {useMemo} from "react";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {ComplaintTable} from "./complaint-details-table/ComplaintTable";
import {useComplaintUIContext} from "./ComplaintUIContext";
import {Col, Row} from "reactstrap";
import {CardHeader} from "@mui/material";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";

export function ComplaintCard() {
    const complaintUIContext = useComplaintUIContext();
    const complaintUIProps = useMemo(() => {
        return {
            newComplaintButtonClick: complaintUIContext.openNewComplaintDialog
        };
    }, [complaintUIContext]);

    return (
        <Card className="example example-compact" style={{minHeight:'300px'}}>
            <CardBody style={{minHeight:'300px', padding:"10px 10px"}}>
                <Row>
                    <Col xl={8} xs={12} md={7}>
                        <CardHeader title="Complain Details Data" />
                    </Col>
                    <Col xl={4} xs={12} md={5} style={{marginTop: "10px"}}>
                        <Row>
                            <Col xl={12} xs={12} md={12} lg={12} sm={12} className="text-lg-right text-md-right text-xl-right text-sm-right  text-right header-btn" >

                                <CustomizedButtons
                                    title={"Add Complain Details"}
                                    submit={complaintUIProps.newComplaintButtonClick}
                                    color={"primary"}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xl={12}  style={{padding:"10px 20px",minWidth:"300px"}}>
                        <ComplaintTable/>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}
