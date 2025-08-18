import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { warningToast } from "../../../../../../utils/ToastMessage";
import {SavingDetailsModal} from "../../../../../../utils/SavingDetailsModal";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";

export function ModelTypeEditForm({ saveModelType, modelTypeData, onHide,id,loading ,show}) {
  const [formData, setFormData] = useState({
    modelTypeName: "",
    modelTypeDescription: "",
    status: false,
    id: "",
  });

  const isValidate = () => {
    if (!formData.modelTypeName) warningToast("Please Enter Model Type Name");
    else if (!formData.modelTypeDescription)
      warningToast("Please Enter Model Type Description");
    else return true;

    return false;
  };

  const handleChange = (e) => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  const handleSubmit = () => {
    if (isValidate()) saveModelType(formData);
  };

  useEffect(() => {
    setFormData({
      modelTypeName: modelTypeData.model_type_name || "",
      modelTypeDescription: modelTypeData.model_type_description || "",
      status: modelTypeData.status || false,
      id: modelTypeData.id || null,
    });
  }, [modelTypeData]);

  return (
    <>
      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={`${id ? "Edit" : "Add New"} Model Type`}
          closeButtonFlag={true}
          applyButton={true}
          id={id}
          content={
            <>
              {/*<SavingDetailsModal show={loading} top={"start"} />*/}
              <Form>
                <Form.Group controlId="ModelTypeName" as={Row}>
                  <Form.Label column sm={4}>
                    Model Type Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        type="text"
                        name="modelTypeName"
                        placeholder="Model Type name"
                        value={formData.modelTypeName}
                        onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group controlId="ModelTypeDescription" as={Row}>
                  <Form.Label column sm={4}>
                    Model Type Description
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Model Type description"
                        name="modelTypeDescription"
                        value={formData.modelTypeDescription}
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
