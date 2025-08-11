import React, {useEffect, useState} from "react";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import {Form} from "react-bootstrap";
import FormFieldCommon from "../../../../../../utils/SuperAdmin/FormFieldCommon";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import FromLoader from "../../../../../../utils/SuperAdmin/Loader/FromLoader";
import {AllLocationOption} from "../../../../../../utils/SuperAdmin/enums/CompanyOption";

export function AssignLocationDialog({editModalData, show, onHide,loadingModalData}) {
    const [formData, setFormData] = useState({
        id: "",
        email: "",
    });
    const [errors, setErrors] = useState({});

    const [locationOptions, setLocationOptions] = useState([]);

    const [selectedLocation, setSelectedLocation] = useState(null);

    const validate = (locations = selectedLocation) => {
        let tempErrors = {};
        if (!locations || locations.length === 0) tempErrors.location = "At least one location is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    }

    const handleLocationChange = (selected) => {
        setSelectedLocation(selected || []);
        validate(selected || []);
    };

    const handleLocationBlur = () => {
        validate(selectedLocation);
    };
    useEffect(() => {
        setLocationOptions(AllLocationOption.map(user => ({
            value: user.id,
            label: user.location_name
        })))
    },[AllLocationOption]);

    useEffect(() => {
        setFormData({
            id: editModalData?.id || null,
            email: editModalData?.user_email || "",
        });

        // Map editModalData.locations to the dropdown option format
        const selectedLocations = locationOptions.filter(option =>
            editModalData?.locations?.some(loc => loc.location_name === option.label)
        );

        setSelectedLocation(selectedLocations);
    }, [editModalData, locationOptions]);





    const saveLocationDetails = () => {
        if (!validate(selectedLocation)) return;


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
            title={"Assign Location"}
            closeButtonFlag={true}
            applyButton={true}
            content={

                loadingModalData ? (
                    <FromLoader/>
                ) : (
                    <>
                        <Form>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <FormFieldCommon
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    placeholder="Email"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    disabled={true}
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
                                    isMulti={true}
                                />
                                {errors.location && (
                                    <div className="invalid-feedback d-block">{errors.location}</div>
                                )}
                            </Form.Group>

                        </Form>
                    </>
                )
            }
            submitEmployee={saveLocationDetails}
            id={formData?.id}
        />
    );
}
