import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { warningToast } from "../../../../../../utils/ToastMessage";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import FromLoader from "../../../../../../utils/SuperAdmin/Loader/FromLoader";

export function LocationEditForm({actionsLoading,show, id, saveLocation, locationData, onHide }) {
  const [formData, setFormData] = useState({
    locationName: "",
    id: ""
  });

  const isValidate = () => {
    if (!formData.locationName) warningToast("Please Enter Location Name");
    else return true;

    return false;
  };

  const handleChange = e => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  useEffect(() => {
    setFormData({
      locationName: locationData?.location_name || "",
      id: locationData?.id || null
    });
  }, [locationData]);

  const handleSubmit = () => {
    if (isValidate()) {
      saveLocation(formData);
    }
  };

  return (
    <>
      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={`${id ? "Edit" : "Add New"} Location`}
          closeButtonFlag={true}
          applyButton={true}
          id={id}
          content={
            <>
              {actionsLoading ? (<>
                <FromLoader />
              </>):(<>
                <Form>
                  <Form.Group controlId="locationName" as={Row}>
                    <Form.Label column sm={4}>
                      Location Name
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                          type="text"
                          name="locationName"
                          placeholder="Location name"
                          value={formData.locationName}
                          onChange={handleChange}
                          maxLength={50}
                      />
                      <small className="text-muted">
                        {formData.locationName.length}/50 characters
                      </small>
                    </Col>

                  </Form.Group>
                </Form>
                </>)}

            </>
          }
          submitEmployee={handleSubmit}
      />


    </>
  );
}
