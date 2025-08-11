import React, {Fragment, useEffect, useState} from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";
import CustomizedSwitch from "../../../../../../utils/SuperAdmin/CustomizedSwitch";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import FormFieldCommon from "../../../../../../utils/SuperAdmin/FormFieldCommon";
import Form from "react-bootstrap/Form";
import {AllLocationOption, AllRoleOptions} from "../../../../../../utils/SuperAdmin/enums/CompanyOption";


const CompanyAddUserDialog = ({ modalOpen, onHide}) => {
    const [formData, setFormData] = useState({
        role: "",
        email: "",
        password: "",
        location: "",
        enableOtp: false,
    });

    const [locationOptions, setLocationOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState([])

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setRoleOptions(AllRoleOptions)
    }, [AllRoleOptions]);

    useEffect(() => {
        setLocationOptions(AllLocationOption.map(user => ({
            value: user.id,
            label: user.location_name
        })))
    },[AllLocationOption]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSwitchChange = () => {
        setFormData((prev) => ({ ...prev, enableOtp: !prev.enableOtp }));
    };

    const validateField = (name, value) => {
        let error = "";
        if (!value) {
            error = "This field is required";
        } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
            error = "Invalid email format";
        } else if (name === "password" && value.length < 6) {
            error = "Password must be at least 6 characters";
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
        return error;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const handleSubmit = () => {
        const newErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "enableOtp") {
                const error = validateField(key, value);
                if (error) newErrors[key] = error;
            }
        });

        if (Object.keys(newErrors).length === 0) {
            console.log("Submitting:", formData);
            // call API or dispatch action here
        }
    };

    return (
        <Fragment>
            <CommonModal
                size="md"
                show={modalOpen}
                handleClose={onHide}
                arialabelledby="add-user-modal"
                title="Add User"
                closeButtonFlag={true}
                applyButton={false}
                content={
                    <Form>
                        <Row>
                            <Col xl={12}>
                                <Card>
                                    <CardBody>

                                        {/* ➤ Role Dropdown */}
                                        <Form.Group>
                                            <Form.Label>Role</Form.Label>
                                            <ReactSelectDropDownCommon
                                                isSearchable={true}
                                                placeholder="Select Role"
                                                value={roleOptions.find(
                                                    (option) => option.value === formData.role
                                                )}
                                                onChange={(selected) =>
                                                    handleSelectChange("role", selected.value)
                                                }
                                                onBlur={() => validateField("role", formData.role)}
                                                options={roleOptions}
                                                isInvalid={!!errors["role"]}
                                            />
                                            {errors["role"] && (
                                                <div className="invalid-feedback d-block">
                                                    {errors["role"]}
                                                </div>
                                            )}
                                        </Form.Group>

                                        {/* ➤ Email */}
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <FormFieldCommon
                                                name="email"
                                                value={formData.email}
                                                onChange={handleOnChange}
                                                onBlur={handleBlur}
                                                placeholder="Email"
                                                required
                                                fullWidth
                                                variant="outlined"
                                                error={!!errors["email"]}
                                                helperText={errors["email"]}
                                            />
                                        </Form.Group>

                                        {/* ➤ Password */}
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <FormFieldCommon
                                                name="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleOnChange}
                                                onBlur={handleBlur}
                                                placeholder="Password"
                                                required
                                                fullWidth
                                                variant="outlined"
                                                error={!!errors["password"]}
                                                helperText={errors["password"]}
                                            />
                                        </Form.Group>

                                        {/* ➤ Location Dropdown */}
                                        <Form.Group>
                                            <Form.Label>Location</Form.Label>
                                            <ReactSelectDropDownCommon
                                                placeholder="Select Location"
                                                value={locationOptions.find(
                                                    (option) => option.value === formData.location
                                                )}
                                                onChange={(selected) =>
                                                    handleSelectChange("location", selected.value)
                                                }
                                                onBlur={() =>
                                                    validateField("location", formData.location)
                                                }
                                                options={locationOptions}
                                                isInvalid={!!errors["location"]}
                                                isSearchable={true}
                                            />
                                            {errors["location"] && (
                                                <div className="invalid-feedback d-block">
                                                    {errors["location"]}
                                                </div>
                                            )}
                                        </Form.Group>

                                        {/* ➤ OTP Switch */}
                                        <Form.Group>
                                            <Form.Label>Enable OTP</Form.Label>
                                            <br />
                                            <CustomizedSwitch
                                                checked={formData.enableOtp}
                                                onChange={handleSwitchChange}
                                                color="primary"
                                                className="cursor-pointer"
                                            />
                                        </Form.Group>

                                        <hr />

                                        {/* ➤ Save Button */}
                                        <div className="d-flex justify-content-end mt-4">
                                            <CustomizedButtons
                                                size="medium"
                                                color="primary"
                                                title="Save"
                                                submit={handleSubmit}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                }
            />
        </Fragment>
    );
};

export default CompanyAddUserDialog;
