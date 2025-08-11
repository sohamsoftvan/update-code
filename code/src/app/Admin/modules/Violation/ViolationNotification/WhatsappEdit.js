import React, {useEffect, useState} from 'react';
import { Col, Form, Row} from "react-bootstrap";
import {Input} from "reactstrap";
import {warningToast} from "../../../../../utils/ToastMessage";
import {updateNotificationServiceUserConfig} from "../../../../SuperAdmin/modules/CompanyService/_redux";
import CommonModal from "../../../../../utils/SuperAdmin/CommonModal";


function WhatsappEdit({show , onHide ,disabled ,userAccessEditData ,getNotificationServiceConfigByUserID ,id }) {
    const [dataEnter, setDataEnter] = useState("");

    const handleKeyPress = event => {
        if (event.key === "Enter") {
            setDataEnter(event.target.value);
            event.target.value = "";
        }
    };

    useEffect(() => {
        if (dataEnter !== undefined && dataEnter !== null) {
                updateNotificationServiceUserByConfig(dataEnter);
            }
    }, [dataEnter]);

    const updateNotificationServiceUserByConfig = dataEnter => {
        if (userAccessEditData && dataEnter ) {
            let body = {
                id: userAccessEditData?.id,
                config: dataEnter
            };
            updateNotificationServiceUserConfig(body)
                .then(response => {
                    if (response && response.isSuccess) {
                        getNotificationServiceConfigByUserID(id, 1, 5);
                        onHide()
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
        <div>

            <CommonModal
                size="sm"
                show={show}
                handleClose={onHide}
                arialabelledby="example-modal-sizes-title-lg"
                title={"Add NewComplaint"}
                closeButtonFlag={true}
                applyButton={false}
                style={{ background: "#00000080" }}
                content={
                    <>
                        <Form.Group controlId="number" as={Row}>
                            <Col sm={12}>
                                <Input
                                    type="text"
                                    name="number"
                                    defaultValue={userAccessEditData?.config}
                                    placeholder={`Edit Whatsapp No`}
                                    onKeyPress={e => handleKeyPress(e)}
                                    disabled={disabled ? true : false}
                                />
                            </Col>
                        </Form.Group>

                    </>
                }
            />
        </div>
    );
}

export default WhatsappEdit;