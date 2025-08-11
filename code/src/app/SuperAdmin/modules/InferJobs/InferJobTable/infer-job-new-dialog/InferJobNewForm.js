import React, { useState } from "react";
import {  Col, Form, Row } from "react-bootstrap";
import { warningToast } from "../../../../../../utils/ToastMessage";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import {SavingDetailsModal} from "../../../../../../utils/SavingDetailsModal";

export function InferJobNewForm({ saveInferJob, onHide,show,loading }) {
  const [formData, setFormData] = useState({
    imageSize: "",
    confidenceThreshold: "",
    iouThreshold: "",
    modelId: "",
    status: false,
    userId: "",
  });

  const isValidate = () => {
    if (!formData.imageSize) warningToast("Please Enter Image Size");
    else if (!formData.confidenceThreshold)
      warningToast("Please Enter Confidence Threshold");
    else if (!formData.iouThreshold) warningToast("Please Enter IOU Threshold");
    else if (!formData.modelId) warningToast("Please Enter Model Id");
    else if (!formData.userId) warningToast("Please Enter User Id");
    else return true;

    return false;
  };

  const handleChange = (e) => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  const handleSubmit = () => {
    if (isValidate()) {
      saveInferJob(formData);
    }
  };

  return (
    <>
      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={"Add Infer Jobs"}
          closeButtonFlag={true}
          applyButton={true}
          content={
            <>
              <SavingDetailsModal show={loading} />
              <Form>
                <Form.Group controlId="imageSize" as={Row}>
                  <Form.Label column sm={4}>
                    Image Size
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        type="text"
                        name="imageSize"
                        placeholder="Image Size"
                        value={formData.imageSize}
                        onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group controlId="confidenceThreshold" as={Row}>
                  <Form.Label column sm={4}>
                    Confidence Threshold
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        type="text"
                        name="confidenceThreshold"
                        placeholder="Confidence Threshold"
                        value={formData.confidenceThreshold}
                        onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group controlId="iouThreshold" as={Row}>
                  <Form.Label column sm={4}>
                    IOU Threshold
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        type="text"
                        name="iouThreshold"
                        placeholder="IOU Threshold"
                        value={formData.iouThreshold}
                        onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group controlId="modelId" as={Row}>
                  <Form.Label column sm={4}>
                    Model ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        type="text"
                        name="modelId"
                        placeholder="Model Id"
                        value={formData.modelId}
                        onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group controlId="userId" as={Row}>
                  <Form.Label column sm={4}>
                    User ID
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        type="text"
                        name="userId"
                        placeholder="User Id"
                        value={formData.userId}
                        onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
              </Form>

            </>
          }
          submitEmployee={handleSubmit}
      />
    </>
  );
}
