import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { warningToast } from "../../../../../../utils/ToastMessage";
import {SavingDetailsModal} from "../../../../../../utils/SavingDetailsModal";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";

export function FrameworkDetailsEditForm({
  saveFrameworkDetails,
  frameworkData,
  onHide,id,show,loading
}) {
  const [formData, setFormData] = useState({
    frameworkName: "",
    frameworkVersionNo: "",
    deprecated: false,
    status: false,
    id: "",
  });

  const isValidate = () => {
    if (!formData.frameworkName) warningToast("Please Enter Framework Name");
    else if (!formData.frameworkVersionNo)
      warningToast("Please Enter Framework Version");
    else return true;

    return false;
  };

  const handleChange = (e) => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  useEffect(() => {
    setFormData({
      frameworkName: frameworkData.framework_name || "",
      frameworkVersionNo: frameworkData.framework_version_number || "",
      deprecated: frameworkData.is_deprecated || false,
      status: frameworkData.status || false,
      id: frameworkData.id || null,
    });
  }, [frameworkData]);

  const handleSubmit = () => {
    if (isValidate()) {
      saveFrameworkDetails(formData);
    }
  };

  return (
    <>
      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={`${id ? "Edit" : "Add New"} Framework Details`}
          closeButtonFlag={true}
          applyButton={true}
          content={
            <>
            {/*<SavingDetailsModal show={loading} top={"start"} />*/}
              <Form>
                <Form.Group controlId="frameworkName" as={Row}>
                  <Form.Label column sm={4}>
                    Framework Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        type="text"
                        name="frameworkName"
                        placeholder="Framework name"
                        value={formData.frameworkName}
                        onChange={handleChange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group controlId="frameworkVersionNo" as={Row}>
                  <Form.Label column sm={4}>
                    Framework Version Number
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        type="text"
                        name="frameworkVersionNo"
                        placeholder="Framework Version Number"
                        value={formData.frameworkVersionNo}
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
