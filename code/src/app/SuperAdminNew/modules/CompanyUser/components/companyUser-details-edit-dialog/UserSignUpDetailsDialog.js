import {Form} from "react-bootstrap";
import FormFieldCommon from "../../../../../../utils/SuperAdmin/FormFieldCommon";
import React, {useState} from "react";

export function UserSignUpDetailsDialog({formData, errors, setFormData, setErrors}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        const updated = {...formData, [name]: value};
        setFormData(updated);
        validateField(name, value);
    };

    const handleBlur = (e) => {
        const {name} = e.target;
        validateField(name, formData[name]);
    };


    const validateField = (name, value) => {
        let msg = "";
        if (!value) {
            msg = `${name.replace(/_/g, " ")} is required`;
        } else {
            if (name === "user_email" && !/^\S+@\S+\.\S+$/.test(value)) {
                msg = "Invalid email format";
            }
            else if(name === "password" && !/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(value) ) {
                msg = "Minimum eight characters, at least one uppercase letter, at least one special character, one lowercase letter and one number required";
            }
            else if(name === "confirm_password" && value !== formData["password"]) {
                msg = "Passwords do not match";
            }
        }
        setErrors((prev) => ({...prev, [name]: msg}));
        return msg;
    };


    return (
        <>

            <Form>
                <Form.Group controlId={"user_email"}>
                    <Form.Label>User Email</Form.Label>
                    <div className={"d-flex"}>
                        <FormFieldCommon
                            className={"w-50"}
                            name={"user_email"}
                            value={formData["user_email"]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={"User Email"}
                            fullWidth
                            variant="outlined"
                            error={!!errors["user_email"]}
                            helperText={errors["user_email"]}
                            type={"text"}
                        />
                    </div>
                </Form.Group>
                <Form.Group controlId={"password"}>
                    <Form.Label>Password</Form.Label>
                    <div className={"d-flex"}>
                        <FormFieldCommon
                            className={"w-50"}
                            name={"password"}
                            value={formData["password"]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={"Password"}
                            fullWidth
                            field
                            variant="outlined"
                            error={!!errors["password"]}
                            helperText={errors["password"]}
                            type={showPassword ? "text" : "password"}
                            showPassword={showPassword}
                            setShowPassword={() => setShowPassword((show) => !show)}

                        />
                    </div>
                </Form.Group>
                <Form.Group  controlId={"confirm_password"}>
                    <Form.Label>Confirm Password</Form.Label>
                    <div className={"d-flex"}>
                        <FormFieldCommon
                            className={"w-50"}
                            name={"confirm_password"}
                            value={formData["confirm_password"]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={"Confirm Password"}
                            fullWidth
                            field
                            variant="outlined"
                            error={!!errors["confirm_password"]}
                            helperText={errors["confirm_password"]}
                            type={showConfirmPassword ? "text" : "password"}
                            showPassword={showConfirmPassword}
                            setShowPassword={() => setShowConfirmPassword((show) => !show)}
                        />
                    </div>
                </Form.Group>
            </Form>
        </>
    )
}
