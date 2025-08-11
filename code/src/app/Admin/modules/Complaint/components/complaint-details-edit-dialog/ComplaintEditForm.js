/* eslint-disable */
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { warningToast } from "../../../../../../utils/ToastMessage";
import { ImagePicker } from "react-file-picker";
import { urlToFile } from "../../../../../../utils/FileConverter";
import {Button} from "reactstrap";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";

export function ComplaintEditForm({ saveComplaint, onHide,id,show,actionsLoading }) {
  const [formData, setFormData] = useState({
    message: "",
    image: null,
    imageBase64: ""
  });

  const isValidate = () => {
    if (!formData.message) warningToast("Please enter complaint message");
    else return true;

    return false;
  };

  const handleChange = e => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  const setComplaintImage = base64 => {
    (async () => {
      try {
        const file = await urlToFile(
          base64,
          "complaint-image.jpeg",
          "text/jpeg"
        );
        setFormData({ ...formData, image: file, imageBase64: base64 });
      } catch (e) {
        // warningToast('Something went wrong');
      }
    })();
  };

  const handleSubmit = () => {
    if (isValidate()) {
      saveComplaint(formData);
    }
  };

  return (
    <>
      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={"Add NewComplaint"}
          closeButtonFlag={true}
          applyButton={true}
          content={
            <>
              <Form>
                <Form.Group controlId="message" as={Row}>
                  <Form.Label column sm={4}>
                    Complaint Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        placeholder="Complaint Message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group controlId="message" as={Row}>
                  <Form.Label column sm={4}>
                    Attach Image
                  </Form.Label>
                  <Col sm={8}>
                    <ImagePicker
                        extensions={["jpg", "jpeg", "png"]}
                        dims={{ minWidth: 100, minHeight: 100 }}
                        maxSize={5}
                        onChange={setComplaintImage}
                        onError={errMsg => {
                          warningToast(errMsg);
                        }}
                    >
                      <Button variant="outline-success">Select File To Upload</Button>
                    </ImagePicker>
                  </Col>
                </Form.Group>

                {formData.imageBase64 && (
                    <Form.Group controlId="message" as={Row}>
                      <div className="col-sm-12">
                        <img
                            className="w-100 h-auto"
                            style={{ maxHeight: 500 }}
                            src={formData.imageBase64}
                            alt="complaint Image"
                        />
                      </div>
                    </Form.Group>
                )}
              </Form>

            </>
          }
          submitEmployee={handleSubmit}
      />
    </>
  );
}
