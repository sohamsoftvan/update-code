import React, {useEffect, useState} from "react";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import {Form} from "react-bootstrap";
import FormFieldCommon from "../../../../../../utils/SuperAdmin/FormFieldCommon";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import FromLoader from "../../../../../../utils/SuperAdmin/Loader/FromLoader";
import {AllCompanyOption} from "../../../../../../utils/SuperAdmin/enums/CompanyOption";

export function LocationEditDialog({editModalData, show, onHide,selectedCompany,loadingModalData}) {
    const [formData, setFormData] = useState({
        locationName: "",
        id: ""
    });
    const [errors, setErrors] = useState({});
    const [companyOptions, setCompanyOptions] = useState([]);

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

    useEffect(() => {
        setFormData({
            locationName: editModalData?.location_name || "",
            id: editModalData?.id || null
        });
    }, [editModalData]);

    useEffect(() => {
        setCompanyOptions(
            AllCompanyOption.map(user => ({
                value: user.id,
                company_id: user.company?.id,
                label: user.company?.company_name
            }))
        );
    }, [AllCompanyOption]);

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
            title={`${formData?.id ? "Edit" : "Add New"} Location`}
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
                )
            }
            submitEmployee={saveLocationDetails}
            id={formData?.id}
        />
    );
}
