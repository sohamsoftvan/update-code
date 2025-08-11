/* eslint-disable */
import React, {Fragment, useEffect, useState} from "react";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";
import CustomizedSwitch from "../../../../../../utils/SuperAdmin/CustomizedSwitch";
import {Form} from "react-bootstrap";
import FormFieldCommon from "../../../../../../utils/SuperAdmin/FormFieldCommon";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import { fireAlert } from "../../../../../../utils/SuperAdmin/SweetAlert";
import {FireAlertMessage} from "../../../../../../utils/SuperAdmin/enums/firAlert.enums";

const AddLocationDialog = ({cameraModalData}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        locationName: "",
        id: ""
    });
    const [errors, setErrors] = useState({});


    const handleChange = e => {
        let data = {...formData};
        data[e.target.name] = e.target.value;
        setFormData(data);

        // Validate on change
        validateField(e.target.name, e.target.value);
    };

    const handleBlur = e => {
        validateField(e.target.name, formData[e.target.name]);
    };



    const toogleCameraModal = () => {
        setModalOpen(false);
    }

    const openAddModal = () => {
        setModalOpen(true)
    }

    const validateField = (name, value) => {
        let tempErrors = {...errors};
        if (name === "locationName") {
            tempErrors.locationName = value ? "" : "Location name is required";
        }
        setErrors(tempErrors);
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.locationName) tempErrors.locationName = "Location name is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const saveLocationDetails = () => {
        if (!validate()) return;

    };

    const handleSwitchChange = (setting) => {
        fireAlert(
            setting, // row (you can pass the whole setting object)
            FireAlertMessage?.statusChanges,
            (id) => {
                // This is the deleteCallback, but you can use it for your status update
                // Call your API or logic to update the status here
                // Return a promise!
                // return updateCameraStatus(id, !setting.status); // You need to implement this function
            },
            () => {
                // This is the getCallback, called after status update
                // Refresh your data here, e.g., refetch cameraModalData
                // fetchCameraData(); // You need to implement this function
            }
        );
    };

    return (
        <Fragment>
                <CustomizedButtons
                    size={"medium"}
                    color={"secondary"}
                    title={"Add new Location"}
                    flag={false}
                    submit={openAddModal}
                    className={"mb-4 mt-3 float-right"}
                />
            {!cameraModalData.length  ? (
                    <div className="row col-12 view-title">
                        <span className="w-100 font-weight-bold">No Cameras Found!</span>
                    </div>
                ) :
                cameraModalData.map((setting, index) => (
                    <Fragment key={setting?.id || index}>
                        <div className="row col-12 view-title">
                        <span className="w-100 font-weight-bold">
                            Location {index + 1} Details
                        </span>
                        </div>
                        <div className="row mt-2 mb-2">
                            <div className="col col-md-6">
                            <span>
                                <b>Location Name</b>
                            </span>
                            </div>
                            <div className="col col-md-6">{setting?.location_name}</div>
                        </div>
                        <div className="row mt-2 mb-2">
                            <div className="col col-md-6">
                            <span>
                                <b>Status</b>
                            </span>
                            </div>
                            <CustomizedSwitch
                                checked={setting?.status}
                                onChange={() => handleSwitchChange(setting)}
                                color={"primary"}
                                className={"cursor-pointer"}
                            />
                        </div>
                    </Fragment>
                ))}


            <CommonModal
                size="md"
                show={modalOpen}
                handleClose={toogleCameraModal}
                arialabelledby="example-modal-sizes-title-lg"
                title={`Add New Location`}
                closeButtonFlag={true}
                applyButton={true}
                content={
                        <>
                            <Form>
                                <Form.Group controlId="locationName">
                                    <Form.Label>Location Name</Form.Label>
                                    <FormFieldCommon
                                        name="locationName"
                                        value={formData.locationName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Location name"
                                        required
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.locationName}
                                        helperText={errors.locationName || `${formData.locationName.length}/50 characters`}
                                        inputProps={{maxLength: 50}}
                                    />
                                </Form.Group>
                            </Form>
                        </>
                }
                submitEmployee={saveLocationDetails}
            />

        </Fragment>
    );
};

export default AddLocationDialog;
