import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  addNotificationServiceUserSubscribe,
  getAllServiceForNotificationByUserId
} from "../../_redux";
import { warningToast } from "../../../../../../utils/ToastMessage";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { customStyles } from "../../../../../../utils/CustomStyles";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";

function ServiceAdd({
  onHideAddServiceModal,
  getNotificationServiceAllSubscribeByUserId,
  addSerivceModalShow,
  serviceUserId
}) {
  const [serviceDataLoader, setServiceDataLoader] = useState(false);
  const [serviceDataOption, setServiceDataOption] = useState([]);
  const [serviceDataLabel, setServiceDataLabel] = useState([]);
  const [serviceDataLabelValue, setServiceDataLabelValue] = useState("");
  const [serviceMonthValue, setServiceMonthValue] = useState("");

  useEffect(() => {
    if (addSerivceModalShow === true && serviceUserId) {
      setServiceDataLoader(true);

      getAllServiceForNotificationByUserId(serviceUserId)
        .then(response => {
          if (response && response.isSuccess) {
            setServiceDataLoader(false);
            let serviceOption = [];
            response.data.map(x => {
              serviceOption.push({ label: x.name, value: x.id });
            });
            setServiceDataOption(serviceOption);
          }
        })
        .catch(e => {
          setServiceDataLoader(false);
          if (e.detail) {
            warningToast(e.detail);
          } else {
            warningToast("Something went wrong");
          }
        });
    }
  }, [addSerivceModalShow]);

  const handleServiceDataChange = selectedLabel => {
    let selectedLabelArray = "";
    if (selectedLabel) {
      if (selectedLabel.length === 1) {
        selectedLabelArray = `${selectedLabel[0].value}`;
      } else {
        for (let i = 0; i < selectedLabel.length; i++) {
          selectedLabelArray += `${selectedLabel[i].value}`;
          if (i !== selectedLabel.length - 1) {
            selectedLabelArray += ",";
          }
        }
      }
    }

    setServiceDataLabel(selectedLabel);
    setServiceDataLabelValue(selectedLabelArray);
  };

  const handleServiceMonthChange = event => {
    setServiceMonthValue(event.target.value);
  };

  const serviceSubmit = () => {
    // serviceMonthValue
    // serviceDataLabelValue
    // onHideAddServiceModal
    if (serviceUserId && serviceDataLabelValue && serviceMonthValue) {
      let data = {
        user_id: serviceUserId,
        vendor_id: serviceDataLabelValue
      };

      addNotificationServiceUserSubscribe(data, serviceMonthValue)
        .then(response => {
          if (response && response.isSuccess) {
            getNotificationServiceAllSubscribeByUserId(serviceUserId, 1, 5);
            onHideAddServiceModal();
          }
        })
        .catch(e => {
          if (e.detail) {
            warningToast(e.detail);
          } else {
            warningToast("Something went wrong");
          }
        });
    }
  };

  return (
    <>
      <CommonModal
          size="lg"
          show={addSerivceModalShow}
          handleClose={onHideAddServiceModal}
          arialabelledby="contained-modal-title-vcenter"
          title={"Add Services"}
          style={{ background: "#00000080" }}
          closeButtonFlag={true}
          applyButton={true}
          content={
            <>
              <Form>
                <Form.Group controlId="locationName" as={Row}>
                  <Form.Label column sm={4}>
                    Service Name
                  </Form.Label>
                  <Col xl={12} md={12} lg={12} sm={12} xs={12}>
                    <Form.Group>
                      <ReactSelectDropDownCommon
                          isSearchable={true}
                          placeholder="Select Service"
                          className="select-react-dropdown"
                          options={serviceDataOption}
                          onChange={opt => handleServiceDataChange(opt)}
                          customStyles={customStyles}
                          value={serviceDataLabel}
                          loading={serviceDataLoader}
                          name="serviceOptions"
                          isMulti={true}

                      />
                    </Form.Group>
                  </Col>

                  <Col xl={12} md={12} lg={12} sm={12} xs={12}>
                    <Form.Group controlId="serviceMonth">
                      <Col sm={12}>
                        <RadioGroup
                            aria-labelledby="demo-error-radios"
                            name="serviceMonth"
                            className={"filter-radio"}
                            style={{
                              display: "flex",
                              gap: "2rem",
                              fontSize: "14px",
                              fontWeight: 500,
                              flexDirection: "row"
                            }}
                            value={serviceMonthValue}
                            onChange={handleServiceMonthChange}
                        >
                          <FormControlLabel
                              value="3"
                              control={<Radio />}
                              label="3 Month"
                              color="#147b82"
                          />
                          <FormControlLabel
                              value="6"
                              control={<Radio />}
                              label="6 Month"
                              color="#147b82"
                          />
                          <FormControlLabel
                              value="12"
                              control={<Radio />}
                              label="12 Month"
                              color="#147b82"
                          />
                          <FormControlLabel
                              value="-1"
                              control={<Radio />}
                              label="Life Time"
                              color="#147b82"
                          />
                        </RadioGroup>
                      </Col>
                    </Form.Group>
                  </Col>
                </Form.Group>
              </Form>

            </>
          }
          submitEmployee={serviceSubmit}
      />
    </>
  );
}

export default ServiceAdd;
