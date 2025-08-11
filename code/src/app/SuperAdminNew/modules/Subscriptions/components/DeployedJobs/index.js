import React, {useEffect, useState} from "react";
import DeployedJobsTable from "./DeployedJobsTable";
import {
    AllCompanyOption,
    AllDeployedJobsData, AllDeploymentJobsData
} from "../../../../../../utils/SuperAdmin/enums/CompanyOption";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import {Col, Row} from "reactstrap";
import {DeployedRTSPJobsViewDialog} from "../RTSPJobsCameraViewDialog/DeployedRTSPJobsViewDialog";
import SelectCameraPlot from "./SelectCameraPlot";
import {DeployedRTSPJobsCameraSettingsDialog} from "../RTSPJobsCameraViewDialog/DeployedRTSPJobsCameraSettingsDialog";
import {CommonCSVDownloader} from "../../../../../../utils/SuperAdmin/CommonCSVDownloader";

function DeployedJobsPage({deployedJob}) {

    const [showModal, setShowModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [infoData, setInfoData] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companyOptions, setCompanyOptions] = useState([]);

    const [cameraModalData, setCameraModalData] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [openROIModal, setOpenROIModal] = React.useState(false);

    const [totalCamerasFetched, setTotalCamerasFetched] = useState([]);

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
        setCurrentItems(deployedJob ? AllDeployedJobsData : AllDeploymentJobsData);
    }, [AllDeployedJobsData,AllDeploymentJobsData]);



    const handleChangePage = (event, newPage) => {
        setPageNo(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setPageSize(parseInt(event.target.value, 10));
        setPageNo(0);
    }
    const handleClose = () => {
        setTotalCamerasFetched([]);
        setOpenROIModal(false);
    };
    const editModalDataTable = row => {
        setOpenROIModal(true);
        // if (isDisabled) {
        //   setLoadingModalData(true);
        //   dispatch(action.getLocationByIds(row?.id))
        //       .then(() => {
        //         setLoadingModalData(false);
        //       })
        //       .catch(() => {
        //         setLoadingModalData(false);
        //       });
        setTotalCamerasFetched(row?.deployment_job_rtsp_details?.camera_settings);

        // }
    };


    const csvFields = {
        index: "#",
        deployment_type: "Deployment Type",
        image_size: "Image Size",
        iou_threshold: "IOU Threshold",
        confidence_threshold: "Confidence Threshold"
    };

    const getCsvData = data =>
        data?.map((d, idx) => ({
            index: idx + 1,
            deployment_type: d.deployment_type?.deployment_type_name,
            image_size: d.image_size,
            iou_threshold: d.iou_threshold,
            confidence_threshold: d.confidence_threshold
        }));


    const infoDeploymentJobsModalDataTable = row => {
        setShowInfoModal(true);
        setInfoData(row)
    }
    const handleInfoModalClose = () => {
        setShowInfoModal(false);
        setInfoData([]);
    }
    const cameraDeploymentJobsModalDataTable = row => {
        setCameraModalData(row)
        setShowModal(true)
    }

    const handleRTSPJobsViewClose = () => {
        setShowModal(false);
        setCameraModalData([]);
    }
    return (
        <>
            <Row>
                <Col xl={8} xs={12} md={7}>
                    {/*<CardHeader title={`${deployedJob ? "Deployed":"Deployment"} RTSP Job Details`}/>*/}
                </Col>
                <Col xl={4} xs={12} md={5} style={{marginTop: "10px"}}>
                    <Row className="align-items-end">
                        <Col xs={12} md={7}>
                            <ReactSelectDropDownCommon
                                isSearchable={true}
                                placeholder="Select Company"
                                value={selectedCompany}
                                onChange={handleChangeCompany}
                                options={companyOptions}
                            />
                        </Col>
                        <Col xs={12} md={5}>
                            <CommonCSVDownloader
                                className="text-right searchTextbtn"
                                data={getCsvData([
                                    // ...deploymentJobData,
                                    // ...deploymentRTSPJobData
                                ])}
                                filename={"RequestedModelDeploymentJobDetails"}
                                fields={csvFields}
                                buttonName={"Download Job Details As XLS"}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xl={12} style={{marginTop: "10px"}}>
                    {/*{false ? (*/}
                    {/*    <TableLoader />*/}
                    {/*) : (*/}
                    {/*    <>*/}
                    {/*      <div>*/}
                    <DeployedJobsTable
                        currentItems={currentItems}
                        pageNo={pageNo}
                        pageSize={pageSize}
                        handleChangePage={(event, newPage) =>
                            handleChangePage(event, newPage)
                        }
                        handleChangeRowsPerPage={event =>
                            handleChangeRowsPerPage(event)
                        }
                        editModalDataTable={editModalDataTable}
                        infoModalDataTable={infoDeploymentJobsModalDataTable}
                        cameraModalDataTable={cameraDeploymentJobsModalDataTable}
                        deployedJob={deployedJob}
                    />
                    {/*      </div>*/}
                    {/*    </>*/}
                    {/*)}*/}
                </Col>
            </Row>
            {/*    </CardBody>*/}
            {/*</Card>*/}

            {(openROIModal && deployedJob) && <> <SelectCameraPlot handleClose={handleClose} openROIModal={openROIModal}
                                                  setOpenROIModal={setOpenROIModal}
                                                  totalCameras={totalCamerasFetched}/></>}
            {showInfoModal && <> <DeployedRTSPJobsViewDialog show={showInfoModal} onHide={handleInfoModalClose}
                                                             infoData={infoData} deployedJobs={deployedJob}/></>}
            {showModal && <> <DeployedRTSPJobsCameraSettingsDialog show={showModal} onHide={handleRTSPJobsViewClose}
                                                           cameraModalData={cameraModalData} deployedJobs={deployedJob}/></>}
        </>
    );
}

export default DeployedJobsPage;