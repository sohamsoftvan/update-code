import React, {useEffect, useState} from "react";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import {Form} from "react-bootstrap";
import FormFieldCommon from "../../../../../../utils/SuperAdmin/FormFieldCommon";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import CustomizedSwitch from "../../../../../../utils/SuperAdmin/CustomizedSwitch";

export function AddDeployedRTSPJobsCameraDialog(props) {
    const [rtsp_url, setRtspUrl] = useState(null);
    const [camera_ip, setCameraIp] = useState(null);
    const [camera_location, setCameraLocation] = useState(null);
    const [camera_name, setCameraName] = useState(null);
    const [process_fps, setProcessFps] = useState(null);
    const [camera_resolution, setCameraResolution] = useState("640:640");
    const [locationOptions, setLocationOptions] = useState([]);
    const [disableFields, setDisableFields] = useState(true);
    const [checked, setChecked] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [errors, setErrors] = useState({});
    const [blocking, setBlocking] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        setErrors({});
        populateLocationList();
    }, []);

    const validateField = (name, value) => {
        switch (name) {
            case "rtsp_url":
                return !value || value === "";
            case "camera_ip":
                return (
                    !value ||
                    !value.match(
                        /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
                    )
                );
            case "camera_name":
                return !value || value === "";
            case "process_fps":
                return (
                    value === null ||
                    value === "" ||
                    isNaN(value) ||
                    parseInt(value) <= 2
                );
            case "camera_resolution":
                return !value || value === "";
            case "camera_location":
                return value === null;
            default:
                return false;
        }
    };

    const checkErrors = () => {
        const fieldValues = {
            rtsp_url,
            camera_ip,
            camera_name,
            process_fps,
            camera_resolution,
            camera_location,
        };

        let newErrors = {};
        Object.keys(fieldValues).forEach((key) => {
            newErrors[key] = validateField(key, fieldValues[key]);
        });

        setErrors(newErrors);
        return newErrors;
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
            // API CALL HERE
        }
    };

    const handleOnChange = (event) => {
        const {name, value} = event.target;

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

        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    const handleOnBlur = (event) => {
        const {name, value} = event.target;
        const val = name === "camera_location" ? camera_location : value;

        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, val),
        }));

        if (name === "rtsp_url") {
            validateRTSPURL();
        }
    };

    const handleLocationChange = (selectedLocation) => {
        setSelectedLocation(selectedLocation);
        setCameraLocation(selectedLocation.value);
        setErrors((prev) => ({
            ...prev,
            camera_location: validateField("camera_location", selectedLocation.value),
        }));
    };

    const handleChange2 = () => {
        setChecked((prev) => !prev);
    };

    const validateRTSPURL = () => {
        if (rtsp_url) {
            setBlocking(true);
            // Simulate async check here if needed
            // checkRTSPURL(rtsp_url).then(...)
            setBlocking(false);
        }
    };

    const populateLocationList = () => {
        // getEnabledLocationList().then(...)
    };

    return (
        <CommonModal
            size="md"
            show={props.modalOpen}
            handleClose={props.toogleCameraModal}
            arialabelledby="example-modal-sizes-title-lg"
            title={"Add Camera"}
            closeButtonFlag={true}
            applyButton={true}
            scrollable={true}
            submitEmployee={addCamera}
            content={
                <Form>
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
                            helperText={
                                errors["rtsp_url"] ? "Please Enter valid RTSP URL" : ""
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="cameraIp">
                        <Form.Label>Camera IP</Form.Label>
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
                            helperText={
                                errors["camera_ip"] ? "Please Enter valid Camera IP" : ""
                            }
                            disabled={disableFields}
                        />
                    </Form.Group>

                    <Form.Group controlId="cameraLocation">
                        <Form.Label>Camera Location</Form.Label>
                        <ReactSelectDropDownCommon
                            isSearchable={true}
                            placeholder="Select Location"
                            value={locationOptions.find(
                                (option) => option.value === camera_location
                            )}
                            onChange={handleLocationChange}
                            onBlur={() =>
                                setErrors((prev) => ({
                                    ...prev,
                                    camera_location: validateField(
                                        "camera_location",
                                        camera_location
                                    ),
                                }))
                            }
                            options={locationOptions}
                            isInvalid={!!errors["camera_location"]}
                        />
                        {errors["camera_location"] && (
                            <div
                                className="invalid-feedback"
                                style={{display: "block"}}
                            >
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
                            helperText={
                                errors["camera_name"] ? "This field is required" : ""
                            }
                            disabled={disableFields}
                        />
                    </Form.Group>

                    <Form.Group controlId="processFps">
                        <Form.Label>Process FPS</Form.Label>
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
                            helperText={
                                errors["process_fps"]
                                    ? "Process FPS value must be greater than 3"
                                    : ""
                            }
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
                            helperText={
                                errors["camera_resolution"]
                                    ? "This field is required"
                                    : ""
                            }
                            disabled={true}
                        />
                    </Form.Group>

                    <Form.Group controlId="roiType">
                        <Form.Label>Roi type</Form.Label>
                        <br/>
                        <CustomizedSwitch
                            checked={checked}
                            onChange={handleChange2}
                            color={"primary"}
                            className={"cursor-pointer"}
                        />
                    </Form.Group>

                </Form>
            }
        />
    );
}
