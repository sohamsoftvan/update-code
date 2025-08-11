import React, {useEffect, useState} from "react";
import { Col, Form, Row} from "react-bootstrap";
import Rating from '@mui/lab/Rating';
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import BlockUi from "react-block-ui";

export function FeedbackEditForm({
                                     saveFeedback,
                                     feedbackData,
                                     onHide,id,show,actionsLoading
                                 }) {

    const [formData, setFormData] = useState({
        feedbackMessage: '',
        ratings: '',
        id: '',
    });

    const setRating = (rating) => {
        if (rating)
            setFormData({...formData, ratings: rating});
    }

    const handleChange = (e) => {
        let data = {...formData};
        data[e.target.name] = e.target.value;
        setFormData(data);
    }

    useEffect(() => {
        setFormData({
            feedbackMessage: feedbackData?.feedback_message || '',
            ratings: feedbackData?.ratings || 3,
            id: feedbackData?.id || null
        });
    }, [feedbackData])

    const handleSubmit = () => {
        saveFeedback(formData);
    }

    return (
        <>

            <CommonModal
                size="lg"
                show={show}
                handleClose={onHide}
                arialabelledby="example-modal-sizes-title-lg"
                title={`${id ? "Edit" : "Add New"} Feedback`}
                closeButtonFlag={true}
                applyButton={true}
                content={
                    <>
                        <BlockUi tag="div" blocking={actionsLoading} color="#147b82">
                        <Form>
                            <Form.Group controlId="ratings" as={Row}>
                                <Form.Label column sm={12} className="text-center">
                                    <Rating
                                        sizeLarge
                                        name="ratings"
                                        value={formData.ratings}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="feedbackMessage" as={Row}>
                                <Form.Label column sm={12}>
                                    Feedback Message
                                </Form.Label>
                                <Col sm={12}>
                                    <Form.Control as="textarea"
                                                  rows={5}
                                                  name="feedbackMessage"
                                                  placeholder="Feedback Message"
                                                  value={formData.feedbackMessage}
                                                  onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                        </BlockUi>
                    </>
                }
                submitEmployee={handleSubmit}
            />

        </>
    );
}
