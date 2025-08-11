import React, {Fragment, useEffect, useState} from "react";
import { Card, CardBody, Col, Row,} from "reactstrap";
import BlockUi from "react-block-ui";
import CustomizedSwitch from "../../../../../../utils/SuperAdmin/CustomizedSwitch";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import FormFieldCommon from "../../../../../../utils/SuperAdmin/FormFieldCommon";
import Form from 'react-bootstrap/Form';

const AddDeployedRTSPJobsCamera = (props) => {
    const [rtsp_url, setRtspUrl] = useState(null);
    const [camera_ip, setCameraIp] = useState(null);
    const [camera_location, setCameraLocation] = useState(null);
    const [camera_name, setCameraName] = useState(null);
    const [process_fps, setProcessFps] = useState(null);
    const [camera_resolution, setCameraResolution] = useState("640:640");
    const [locationOptions, setLocationOptions] = useState([]);
    const [disableFields, setDisableFields] = useState(true);
    const [checked, setChecked] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [errors, setErrors] = useState({});
    const [blocking, setBlocking] = useState(false);
    const [is_active, setIsActive] = useState(undefined);
    const [is_processing, setIsProcessing] = useState(undefined);
    const [deployment_job_rtsp_id, setDeploymentJobRtspId] = useState(undefined);
    const [is_tcp, setIsTcp] = useState(undefined);
    const [roi_type, setRoiType] = useState(undefined);
    const [roi_url, setRoiUrl] = useState(undefined);
    const [status, setStatus] = useState(undefined);
    const [id, setId] = useState(undefined);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        setErrors({});
        populateLocationList();
    }, []);

    useEffect(() => {
        if (props.modalOpen) {
            let cameraSet = props.cameraSettings;
            setDisableFields(false);
            setRtspUrl(cameraSet?.rtsp_url || null);
            setCameraIp(cameraSet?.camera_ip || null);
            setCameraLocation(cameraSet?.location_id || null);
            setCameraName(cameraSet?.camera_name || null);
            setProcessFps(cameraSet?.process_fps);
            setCameraResolution(cameraSet?.camera_resolution || "640:640");
            setIsActive(cameraSet?.is_active);
            setIsProcessing(cameraSet?.is_processing);
            setDeploymentJobRtspId(cameraSet?.deployment_job_rtsp_id);
            setIsTcp(cameraSet?.is_tcp);
            setRoiType(cameraSet?.roi_type);
            setRoiUrl(cameraSet?.roi_url);
            setStatus(cameraSet?.status);
            setId(cameraSet?.id);
            setErrors({});
            setChecked(false);
        }
    }, [props.modalOpen]);

    const checkErrors = () => {
        let newErrors = {...errors};
        if (camera_name === "" || camera_name === null) {
            newErrors["camera_name"] = true;
        }
        if (camera_resolution === "" || camera_resolution === null) {
            newErrors["camera_resolution"] = true;
        }
        if (camera_location === null) {
            newErrors["camera_location"] = true;
        }
        if (
            process_fps === null ||
            process_fps === "" ||
            isNaN(process_fps) ||
            parseInt(process_fps) <= 2
        ) {
            newErrors["process_fps"] = true;
        }
        let ip = camera_ip === null ? "" : camera_ip;
        if (
            !ip.match(
                /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            )
        ) {
            newErrors["camera_ip"] = true;
        }
        setErrors(newErrors);
        return newErrors;
    };

    const updateCamera = () => {
        const errorsObj = checkErrors();
        if (!Object.values(errorsObj).includes(true)) {
            const cameraData = {
                rtsp_url,
                camera_name,
                camera_resolution,
                process_fps,
                location_id: camera_location,
                camera_ip,
                roi_type,
                is_active,
                is_processing,
                deployment_job_rtsp_id,
                is_tcp,
                roi_url,
                status,
                id,
            };
            setBlocking(true);
            // updateDeploymentCamera(cameraData).then((res) => {
            //     if (res && res.isSuccess) {
            //         successToast("Camera updated successfully");
            //         props.toogleCameraModal();
            //         props.onHide(false);
            //     }
            //     setBlocking(false);
            // });
        }
    };

    const addCamera = () => {
        const errorsObj = checkErrors();
        if (!Object.values(errorsObj).includes(true)) {
            const addcameraData = {
                rtsp_url,
                camera_name,
                camera_resolution,
                process_fps,
                location_id: camera_location,
                camera_ip,
                deploymentJobId: props.rtspId,
                roi_type: checked,
            };
            setBlocking(true);
            // addDeploymentCamera(addcameraData).then((res) => {
            //     if (res && res.isSuccess) {
            //         successToast("Camera Added Successfully");
            //         props.toogleCameraModal();
            //         props.onHide(false);
            //     }
            //     setBlocking(false);
            // });
        }
    };

    const validateField = (name, value) => {
        let error = false;
        switch (name) {
            case "rtsp_url":
                error = !value || value === "";
                break;
            case "camera_ip":
                error =
                    !value ||
                    !value.match(
                        /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
                    );
                break;
            case "camera_name":
                error = !value || value === "";
                break;
            case "process_fps":
                error =
                    value === null ||
                    value === "" ||
                    isNaN(value) ||
                    parseInt(value) <= 2;
                break;
            case "camera_resolution":
                error = !value || value === "";
                break;
            case "camera_location":
                error = value === null;
                break;
            default:
                break;
        }
        return error;
    };

    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setErrors((prev) => ({ ...prev, [name]: false }));
        switch (name) {
            case "rtsp_url":
                setRtspUrl(value);
                break;
            case "camera_ip":
                setCameraIp(value);
                break;
            case "camera_location":
                setCameraLocation(value);
                break;
            case "camera_name":
                setCameraName(value);
                break;
            case "process_fps":
                setProcessFps(value);
                break;
            case "camera_resolution":
                setCameraResolution(value);
                break;
            default:
                break;
        }
        // Validate on change
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleLocationChange = (selectedLocation) => {
        setErrors((prev) => ({...prev, camera_location: false}));
        setSelectedLocation(selectedLocation);
        setCameraLocation(selectedLocation.value);
    };

    const populateLocationList = () => {
        // getEnabledLocationList()
        //     .then((response) => {
        //         if (response && response.data) {
        //             let list = generateOptions(response.data);
        //             setLocationOptions(list);
        //         }
        //     })
        //     .catch((error) => {
        //         if (error.detail) {
        //             warningToast(error.detail);
        //         } else {
        //             warningToast("Something went Wrong");
        //         }
        //     });
    };

    const generateOptions = (array) => {
        let options = [];
        for (let y = 0; y < array.length; y++) {
            let data = array[y];
            let replaced = data.location_name;
            let id = data.id;
            options.push({
                value: id,
                label: replaced,
            });
        }
        return options;
    };

    const validateRTSPURL = () => {
        if (rtsp_url) {
            setBlocking(true);
            // checkRTSPURL(rtsp_url)
            //     .then((response) => {
            //         if (response && response.data) {
            //             if (response.data === true) {
            //                 setDisableFields(false);
            //                 setDisableButton(false);
            //                 setBlocking(false);
            //             }
            //         } else if (response.data === false) {
            //             setErrors((prev) => ({...prev, rtsp_url: true}));
            //             setDisableButton(true);
            //             setBlocking(false);
            //             warningToast("Please enter valid rtsp url");
            //         }
            //     })
            //     .catch((error) => {
            //         if (error.detail) {
            //             warningToast(error.detail);
            //         } else {
            //             warningToast("Something went Wrong");
            //         }
            //         setBlocking(false);
            //     });
        }
    };

    const handleChange2 = () => {
        setChecked((prev) => !prev);
    };

    const handleOnBlur = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        // For select fields like camera_location, value may be from state
        if (name === "camera_location") {
            value = camera_location;
        }
        // Validate on blur
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        if (name === "rtsp_url") {
            validateRTSPURL();
        }
    };

    return (
        <Fragment>
            <CommonModal
                size="md"
                show={props.modalOpen}
                handleClose={props.toogleCameraModal}
                arialabelledby="example-modal-sizes-title-lg"
                title={props.isUpdate ? "Update Camera" : "Add Camera"}
                closeButtonFlag={true}
                applyButton={false}
                content={
                    <Form>
                        <BlockUi blocking={blocking}>
                            <Row>
                                <Col xl={12}>
                                    <Card>
                                        <CardBody>
                                            <Form.Group controlId="rtspUrl">
                                                <Form.Label>RTSP URL</Form.Label>
                                                <FormFieldCommon
                                                    name="rtsp_url"
                                                    value={rtsp_url}
                                                    onChange={handleOnChange}
                                                    onBlur={handleOnBlur}
                                                    placeholder="RTSP Url"
                                                    required
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors["rtsp_url"]}
                                                    helperText={errors["rtsp_url"] ? "Please Enter valid RTSP URL" : ""}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="cameraIp">
                                                <Form.Label>Camera Ip</Form.Label>
                                                <FormFieldCommon
                                                    name="camera_ip"
                                                    value={camera_ip}
                                                    onChange={handleOnChange}
                                                    onBlur={handleOnBlur}
                                                    placeholder="Camera IP"
                                                    required
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors["camera_ip"]}
                                                    helperText={errors["camera_ip"] ? "Please Enter valid Camera IP" : ""}
                                                    disabled={disableFields}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="cameraLocation">
                                                <Form.Label>Camera Location</Form.Label>
                                                <ReactSelectDropDownCommon
                                                    isSearchable={true}
                                                    placeholder="Select Location"
                                                    value={locationOptions.filter(
                                                        (option) => option.value === camera_location
                                                    )}
                                                    onChange={handleLocationChange}
                                                    onBlur={() => setErrors((prev) => ({ ...prev, camera_location: validateField('camera_location', camera_location) }))}
                                                    options={locationOptions}
                                                    isInvalid={!!errors["camera_location"]}
                                                />
                                                {errors["camera_location"] && (
                                                    <div className="invalid-feedback" style={{ display: 'block' }}>
                                                        Please Select a Camera Location
                                                    </div>
                                                )}
                                            </Form.Group>

                                            <Form.Group controlId="cameraName">
                                                <Form.Label>Camera Name</Form.Label>
                                                <FormFieldCommon
                                                    name="camera_name"
                                                    value={camera_name}
                                                    onChange={handleOnChange}
                                                    onBlur={handleOnBlur}
                                                    placeholder="Camera Name"
                                                    required
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors["camera_name"]}
                                                    helperText={errors["camera_name"] ? "This field is required" : ""}
                                                    disabled={disableFields}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="processFps">
                                                <Form.Label>Process fps</Form.Label>
                                                <FormFieldCommon
                                                    name="process_fps"
                                                    value={process_fps}
                                                    onChange={handleOnChange}
                                                    onBlur={handleOnBlur}
                                                    placeholder="Process FPS"
                                                    required
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors["process_fps"]}
                                                    helperText={errors["process_fps"] ? "Process FPS value must be greater than 3" : ""}
                                                    disabled={disableFields}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="cameraResolution">
                                                <Form.Label>Camera Resolution</Form.Label>
                                                <FormFieldCommon
                                                    name="camera_resolution"
                                                    value={camera_resolution}
                                                    onChange={handleOnChange}
                                                    onBlur={handleOnBlur}
                                                    placeholder="Camera Resolution"
                                                    required
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors["camera_resolution"]}
                                                    helperText={errors["camera_resolution"] ? "This field is required" : ""}
                                                    disabled={true}
                                                />
                                            </Form.Group>

                                            {!props.isUpdate && (
                                                <>
                                                    <Form.Group controlId="roiType">
                                                        <Form.Label>Roi type</Form.Label>
                                                        <br />
                                                        <CustomizedSwitch
                                                            checked={checked}
                                                            onChange={handleChange2}
                                                            color={"primary"}
                                                            className={"cursor-pointer"}
                                                        />
                                                        <br />
                                                    </Form.Group>
                                                </>
                                            )}

                                            <hr />
                                            <div className={"mt-4"} style={{ textAlign: "end" }}>
                                                <CustomizedButtons
                                                    size={"medium"}
                                                    color={"primary"}
                                                    title={props.isUpdate ? "Update" : "Add"}
                                                    flag={disableButton}
                                                    submit={props.isUpdate ? updateCamera : addCamera}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </BlockUi>
                    </Form>
                }
            />
        </Fragment>
    );
};

export default AddDeployedRTSPJobsCamera;
