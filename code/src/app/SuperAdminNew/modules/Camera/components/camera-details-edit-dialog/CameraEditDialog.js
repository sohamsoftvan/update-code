import React, {useEffect, useState} from "react";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import {Form} from "react-bootstrap";
import FormFieldCommon from "../../../../../../utils/SuperAdmin/FormFieldCommon";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import {AllCompanyOption, AllLocationOption} from "../../../../../../utils/SuperAdmin/enums/CompanyOption";
import FromLoader from "../../../../../../utils/SuperAdmin/Loader/FromLoader";

export function CameraEditDialog({editModalData, show, onHide,selectedCompany,loadingModalData}) {
    const [formData, setFormData] = useState({
        cameraName: "",
        id: "",
        rtspUrl: "",
        processFps: "",
    });
    const [errors, setErrors] = useState({});

    const [companyOptions, setCompanyOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);

    const [selectedLocation, setSelectedLocation] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
        validate(updatedFormData, selectedLocation);
    };

    const handleBlur = (e) => {
        validate(formData, selectedLocation);
    };

    const handleLocationChange = (selected) => {
        setSelectedLocation(selected);
        validate(formData, selected);
    };

    const handleLocationBlur = () => {
        validate(formData, selectedLocation);
    };

    useEffect(() => {
        setCompanyOptions(
            AllCompanyOption.map(user => ({
                value: user.id,
                company_id: user.company?.id,
                label: user.company?.company_name
            }))
        );
    }, [AllCompanyOption]);
    useEffect(() => {
        setLocationOptions(AllLocationOption.map(user => ({
            value: user.id,
            label: user.location_name
        })))
    },[AllLocationOption]);
    useEffect(() => {
        if(editModalData){
            setFormData({
                cameraName: editModalData?.camera_name || "",
                id: editModalData?.id || null,
                rtspUrl: editModalData?.rtsp_url || "" ,
                processFps: editModalData?.process_fps || "",
            })
            const locationData = locationOptions.find(location => location.label === editModalData?.location_details?.location_name);
            setSelectedLocation(locationData);
        }else {
            setFormData({
                cameraName: "",
                id: "",
                rtspUrl: "",
                processFps: "",
            });
            setSelectedLocation(null);
        }

    }, [editModalData,locationOptions]);


    const validate = (fields = formData, location = selectedLocation) => {
        let tempErrors = {};

        if (!fields.cameraName) tempErrors.cameraName = "Camera name is required";
        if (!fields.rtspUrl) tempErrors.rtspUrl = "RTSP URL is required";
        if (!fields.processFps) tempErrors.processFps = "Process FPS is required";
        if (!location) tempErrors.location = "Location is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };


    const saveCameraDetails = () => {
        if (!validate(formData, selectedLocation)) return;

        const location = {
            ...formData,
            companyId: selectedCompany?.value,
        };

        // if (!id) {
        //   dispatch(action.createLocation(location, user.id)).then(() => {
        //     dispatch(action.fetchLocation());
        //     onHide();
        //   });
        // } else {
        //   dispatch(action.locationUpdate(location, user.company_id)).then(() => {
        //     let data2 = {
        //       notification_message: "Location Updated : " + location.locationName,
        //       user_id: user.id,
        //       type_of_notification: "string",
        //       status: true,
        //       is_unread: true,
        //     };
        //     dispatch(action.fetchLocation());
        //     onHide();
        //     addNotification(data2).then((response) => {
        //       if (response && response.isSuccess) {
        //       }
        //     });
        //   });
        // }
    };

    return (
        <CommonModal
            size="md"
            show={show}
            handleClose={onHide}
            arialabelledby="example-modal-sizes-title-lg"
            title={`${formData?.id ? "Edit" : "Add New"} Camera`}
            closeButtonFlag={true}
            applyButton={true}
            content={

                loadingModalData ? (
                    <FromLoader/>
                ) : (
                    <>
                    <Form>
                        <Form.Group controlId="companySelect">
                            <Form.Label>Select Company</Form.Label>
                            <ReactSelectDropDownCommon
                                isSearchable={true}
                                placeholder="Select Company"
                                value={selectedCompany}
                                options={companyOptions}
                                isDisabled={true}
                            />
                        </Form.Group>

                        <Form.Group controlId="locationSelect">
                            <Form.Label>Select Location</Form.Label>
                            <ReactSelectDropDownCommon
                                isSearchable={true}
                                placeholder="Select Location"
                                value={selectedLocation}
                                options={locationOptions}
                                onChange={handleLocationChange}
                                onBlur={handleLocationBlur}
                                className={errors.location ? 'is-invalid' : ''}
                            />
                            {errors.location && (
                                <div className="invalid-feedback d-block">{errors.location}</div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="cameraName">
                            <Form.Label>Camera Name</Form.Label>
                            <FormFieldCommon
                                name="cameraName"
                                value={formData.cameraName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Camera name"
                                required
                                fullWidth
                                variant="outlined"
                                error={!!errors.cameraName}
                                helperText={errors.cameraName}
                                inputProps={{maxLength: 50}}
                            />
                        </Form.Group>

                        <Form.Group controlId="rtspUrl">
                            <Form.Label>RTSP URL</Form.Label>
                            <FormFieldCommon
                                name="rtspUrl"
                                value={formData.rtspUrl}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="RTSP URL"
                                required
                                fullWidth
                                variant="outlined"
                                error={!!errors.rtspUrl}
                                helperText={errors.rtspUrl}
                            />
                        </Form.Group>

                        <Form.Group controlId="processFps">
                            <Form.Label>Process FPS</Form.Label>
                            <FormFieldCommon
                                name="processFps"
                                value={formData.processFps}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Process FPS"
                                required
                                fullWidth
                                variant="outlined"
                                error={!!errors.processFps}
                                helperText={errors.processFps}
                            />
                        </Form.Group>

                    </Form>
                    </>
                )
            }
            submitEmployee={saveCameraDetails}
            id={formData?.id}
        />
    );
}
