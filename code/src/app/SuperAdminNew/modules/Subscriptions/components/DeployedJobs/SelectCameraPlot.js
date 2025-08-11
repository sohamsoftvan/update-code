import React, { useState, useEffect } from "react";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import { Card, CardBody } from "../../../../../../_metronic/_partials/controls";
import { Col, Row } from "reactstrap";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import RegionPlot1 from "../../../../../Admin/modules/Modal/regionPlot1";

const SelectCameraPlot = (props) => {
    const [options, setOptions] = useState([]);
    const [selectedModal, setSelectedModal] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [cameraParam, setCameraParam] = useState("");
    const [showRoITab, setShowRoITab] = useState(false);

    // Sync with props like componentWillReceiveProps
    useEffect(() => {
        let totalCamera = props.totalCameras;
        for (let y = 0; y < totalCamera?.length; y++) {
            let data = totalCamera[y];
            options.push({
                value: data.id + "-" + data.rtsp_url + "-" + data.roi_type,
                label: data.camera_name,
            });
        }
        setSelectedModal("");
        setOptions(options);
        setShowRoITab(false);
        setImagePath("");
        setCameraParam("");
    }, [props.totalCameras]);

    const handleModalChange = async (selectedModal) => {
        setSelectedModal(selectedModal);
        // setShowRoITab(false);
        // setTimeout(async () => {
        //     let selectedOption = selectedModal.value.split("-");
        //     let param = {
        //         id: selectedOption[0],
        //         camera_name: selectedModal.label,
        //         rtsp_url: selectedOption[1],
        //     };
        //     let allData = {
        //         id: selectedOption[0],
        //         camera_name: selectedModal.label,
        //         rtsp_url: selectedOption[1],
        //         roi_type: selectedOption[2],
        //     };
        //     setCameraParam(allData);
        //     try {
        //         const response = await loadImageFromRtspURL(param);
        //         setImagePath(response.data.file);
        //         setShowRoITab(true);
        //     } catch (error) {
        //         if (error.detail) {
        //             warningToast(error.detail);
        //         } else {
        //             warningToast("Something went Wrong");
        //         }
        //     }
        // }, 500);
    };

    return (
        <CommonModal
            size="lg"
            show={props.openROIModal}
            handleClose={props.handleClose}
            arialabelledby="example-modal-sizes-title-lg"
            title={`Image plot`}
            closeButtonFlag={true}
            applyButton={false}
            content={
                <Card>
                    <CardBody>
                        <Row>
                            <Col xl={12}>
                                <div className="overlay overlay-block cursor-default p-0">
                                    <ReactSelectDropDownCommon
                                        isSearchable={true}
                                        placeholder="Select Camera"
                                        value={selectedModal}
                                        onChange={handleModalChange}
                                        options={options}
                                        className="align-left"
                                    />
                                    <hr />
                                    {selectedModal && showRoITab && (
                                        <>
                                            <RegionPlot1
                                                setOpenROIModal={props.setOpenROIModal}
                                                cameraParam={cameraParam}
                                                imagePath={imagePath}
                                            />
                                        </>
                                    )}
                                    {selectedModal && !showRoITab && (
                                        <>
                                            <div className="overlay-layer bg-transparent mt-3">
                                                <div className="spinner spinner-lg spinner-success" />
                                            </div>
                                            <div className="w-100 text-center">
                                                <b
                                                    className="d-block"
                                                    style={{ paddingTop: "30px", marginLeft: "10px" }}
                                                >
                                                    Loading image from rtsp stream
                                                </b>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            }
        />
    );
};

export default SelectCameraPlot;
