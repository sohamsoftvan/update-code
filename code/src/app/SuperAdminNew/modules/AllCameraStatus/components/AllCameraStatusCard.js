import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import ReactSelectDropDownCommon from "../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import {
     AllCameraStatusData,
    AllCompanyOption,
} from "../../../../../utils/SuperAdmin/enums/CompanyOption";
import CardHeader from "@mui/material/CardHeader";
import AllCameraTable from "./AllCameraTable";

function AllCameraStatusCard() {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10)
    const handleChangeCompany = (option) => {
        setSelectedCompany(option);
    }
    useEffect(() => {
        const allCompanyData = AllCompanyOption.map(user => ({
            value: user.id,
            company_id: user.company?.id,
            label: user.company?.company_name
        }))
        setCompanyOptions(allCompanyData);
        setSelectedCompany(allCompanyData[0]);
    }, [AllCompanyOption]);



    useEffect(() => {
        setCurrentItems(AllCameraStatusData);
    }, [AllCameraStatusData]);


    const handleChangePage = (event, newPage) => {
        setPageNo(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNo(0);
    }

    return (

        <Card className="example example-compact" style={{minHeight: "300px"}}>
            <CardBody style={{minHeight: "300px", padding: "10px 10px"}}>
                <Row>
                    <Col xl={9} xs={12} md={7}>
                        <CardHeader title="Camera Status"/>
                    </Col>
                    <Col xl={3} xs={12} md={5} style={{marginTop: "10px", justifyContent: "flex-end"}}>
                        <ReactSelectDropDownCommon
                            isSearchable={true}
                            placeholder="Select Company"
                            value={selectedCompany}
                            onChange={handleChangeCompany}
                            options={companyOptions}
                        />

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
                        <AllCameraTable
                            currentItems={currentItems}
                            pageNo={pageNo}
                            pageSize={pageSize}
                            handleChangePage={(event, newPage) =>
                                handleChangePage(event, newPage)
                            }
                            handleChangeRowsPerPage={event =>
                                handleChangeRowsPerPage(event)
                            }
                        />
                        {/*      </div>*/}
                        {/*    </>*/}
                        {/*)}*/}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default AllCameraStatusCard;
