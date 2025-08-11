import React, { useState, useEffect, Fragment } from "react";
import { Label, Input } from "reactstrap";
import {  warningToast } from "../../../../utils/ToastMessage";
import CommonModal from "../../../../utils/SuperAdmin/CommonModal";

const AddSupervisorModal = ({ modalOpen, toggleSupervisorModal ,handleAssSupervisor}) => {

  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });

  const [errors, setErrors] = useState({
    user_email: "",
    user_password: "",
  });


  const validateFields = (name, value) => {
    let error = "";

    if (name === "user_email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        error = "Invalid email format";
      }
    }

    if (name === "user_password") {
      if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    validateFields(name, value);
  };

  const addSupervisorToList = () => {
    const email = formData.user_email.trim();
    const password = formData.user_password.trim();

    if (!email || !password) {
      warningToast("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      warningToast("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      warningToast("Password must be at least 6 characters long");
      return;
    }

    const param = {
      user_email: email,
      user_status: true,
      user_password: password,
    };
    handleAssSupervisor(param);

  };

  const isSubmitDisabled =
      !formData.user_email ||
      !formData.user_password ||
      !!errors.user_email ||
      !!errors.user_password;

  const modalContent = (
      <>
        <Label for="email">Email *</Label>
        <Input
            onChange={handleOnChange}
            type="email"
            name="user_email"
            value={formData.user_email}
            maxLength={50}
            invalid={!!errors.user_email}
        />
        {errors.user_email && (
            <div style={{ color: "red", fontSize: "0.85em" }}>
              {errors.user_email}
            </div>
        )}

        <Label for="password">Password *</Label>
        <Input
            onChange={handleOnChange}
            type="password"
            name="user_password"
            value={formData.user_password}
            maxLength={50}
            invalid={!!errors.user_password}
        />
        {errors.user_password && (
            <div style={{ color: "red", fontSize: "0.85em" }}>
              {errors.user_password}
            </div>
        )}
      </>
  );

  return (
      <Fragment>
        <CommonModal
            show={modalOpen}
            title="Add Supervisor"
            content={modalContent}
            backdrop="static"
            keyboard={false}
            closeButtonFlag={true}
            handleClose={toggleSupervisorModal}
            submitEmployee={addSupervisorToList}
            flag={isSubmitDisabled}
            applyButton={true}
        />
      </Fragment>
  );
};

export default AddSupervisorModal;
