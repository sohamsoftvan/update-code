import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { warningToast } from "../../../../../../utils/ToastMessage";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import {SavingDetailsModal} from "../../../../../../utils/SavingDetailsModal";

export function DeploymentTypeEditForm({
  deploymentTypeData,
  saveDeploymentType,
  onHide,id,show,loading
}) {
  const [formData, setFormData] = useState({
    deploymentTypeName: "",
    deploymentTypeDescription: "",
    status: false,
    id: ""
  });

  const isValidate = () => {
    if (!formData.deploymentTypeName)
      warningToast("Please Enter Deployment Type Name");
    else if (!formData.deploymentTypeDescription)
      warningToast("Please Enter Deployment Type Description");
    else return true;

    return false;
  };

  const handleChange = e => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  const handleSubmit = () => {
    if (isValidate()) {
      saveDeploymentType(formData);
    }
  };

  useEffect(() => {
    setFormData({
      deploymentTypeName: deploymentTypeData.deployment_type_name || "",
      deploymentTypeDescription:
        deploymentTypeData.deployment_type_description || "",
      status: deploymentTypeData.status || false,
      id: deploymentTypeData.id || null
    });
  }, [deploymentTypeData]);

  return (
    <>
      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={`${id ? "Edit" : "Add New"} Deployment Type`}
          closeButtonFlag={true}
          applyButton={true}
          content={
            <>
              <SavingDetailsModal show={loading} top={"start"} />
              <Form>
                <Form.Group controlId="deploymentTypeName" as={Row}>
                  <Form.Label column sm={4}>
                    Deployment Type Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        type="text"
                        name="deploymentTypeName"
                        placeholder="Deployment Type name"
                        value={formData.deploymentTypeName}
                        onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group controlId="deploymentTypeDescription" as={Row}>
                  <Form.Label column sm={4}>
                    Deployment Type Description
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Deployment Type description"
                        name="deploymentTypeDescription"
                        value={formData.deploymentTypeDescription}
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
