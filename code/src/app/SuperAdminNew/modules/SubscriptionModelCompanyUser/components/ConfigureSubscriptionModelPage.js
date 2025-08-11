import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import ReactSelectDropDownCommon from "../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import {AllUserTypeOption} from "../../../../../utils/SuperAdmin/enums/CompanyOption";
import {fireAlert} from "../../../../../utils/SuperAdmin/SweetAlert";
import {FireAlertMessage} from "../../../../../utils/SuperAdmin/enums/firAlert.enums";
import CommonModal from "../../../../../utils/SuperAdmin/CommonModal";


function ConfigureSubscriptionModelPage({show, onHide}) {
    const [userTypeOption, setUserTypeOption] = useState([]);
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setUserTypeOption(AllUserTypeOption)
    }, [AllUserTypeOption]);

    const validateField = (name, value) => {
        let msg = "";
        if (!value) {
            msg = `${name.replace(/_/g, " ")} is required`;
        }
        setErrors((prev) => ({...prev, [name]: msg}));
        return msg;
    };

    const handleFinish = () => {
        fireAlert(
            selectedUserType?.value,
            FireAlertMessage.changeAction
        );
    }

    const handleUserTypeChange = (selected) => {
        const value = selected?.value || "";
        setSelectedUserType(selected)
        validateField("userType", value);
    };

    return (
        <>

            <CommonModal
                size="md"
                show={show}
                handleClose={onHide}
                arialabelledby="example-modal-sizes-title-lg"
                title={`User Type`}
                closeButtonFlag={true}
                applyButton={true}
                content={<>
                    <Form.Group controlId="userType">
                        <Form.Label>Select User Type</Form.Label>
                            <ReactSelectDropDownCommon
                                isSearchable={true}
                                placeholder="Select User Type"
                                options={userTypeOption}
                                value={selectedUserType}
                                onChange={handleUserTypeChange}
                                onBlur={() => validateField("userType", selectedUserType?.value)}
                                isInvalid={!!errors["userType"]}
                            />
                        {errors["userType"] && (
                            <div className="invalid-feedback d-block">
                                {errors["userType"]}
                            </div>
                        )}
                    </Form.Group>
                </>

                }
                submitEmployee={handleFinish}
            />

        </>
    );
}

export default ConfigureSubscriptionModelPage;
