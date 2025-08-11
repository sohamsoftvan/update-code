import React, { useEffect, useState } from "react";
import {  Col, Form, Row } from "react-bootstrap";
import { warningToast } from "../../../../../../utils/ToastMessage";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import {SavingDetailsModal} from "../../../../../../utils/SavingDetailsModal";

export function DeviceEditForm({ saveDevice, deviceData, onHide,show,id,loading }) {
  const [formData, setFormData] = useState({
    deviceName: "",
    deviceDescription: "",
    status: false,
    id: ""
  });

  const isValidate = () => {
    if (!formData.deviceName) warningToast("Please Enter Device Name");
    else if (!formData.deviceDescription)
      warningToast("Please Enter Device Description");
    else return true;

    return false;
  };

  const handleChange = e => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  const handleSubmit = () => {
    if (isValidate()) saveDevice(formData);
  };

  useEffect(() => {
    setFormData({
      deviceName: deviceData.device_name || "",
      deviceDescription: deviceData.device_description || "",
      status: deviceData.status || false,
      id: deviceData.id || null
    });
  }, [deviceData]);

  return (
    <>
      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={`${id ? "Edit" : "Add New"} Device`}
          closeButtonFlag={true}
          applyButton={true}
          content={
            <>
              <SavingDetailsModal show={loading} top={"start"} />
              <Form>
                <Form.Group as={Row} controlId="deviceName">
                  <Form.Label column sm={4}>
                    Device Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        type="text"
                        placeholder="Device Name"
                        value={formData.deviceName}
                        name="deviceName"
                        onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="deviceDescription">
                  <Form.Label column sm={4}>
                    Device Description
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Device Description"
                        name="deviceDescription"
                        value={formData.deviceDescription}
                        onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
              </Form>

            </>
          }
          submitEmployee={handleSubmit}
          id={id}
      />
    </>
  );
}
