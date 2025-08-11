import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import {value} from "lodash/seq";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import {customStyles} from "../../../../../../utils/CustomStyles";

function VideoCameraRtspUploadModal({show ,model , closeImageVideoModal ,nextModal}) {
    const [selectedRoivalue, setSelectedRoivalue] = useState("");
    const handleSelectRoiChange = (value) =>{
        setSelectedRoivalue(value)
    }

    const nextStep = () =>{
        nextModal(selectedRoivalue)
    }

    return (
        <>
            <CommonModal
                size="lg"
                show={show}
                handleClose={closeImageVideoModal}
                arialabelledby="example-modal-sizes-title-xl"
                title={model?.model_name}
                style={{ marginTop: "0vh" }}
                backdrop="static"
                closeButtonFlag={true}
                applyButton={false}
                content={
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label className="mb-4">Select Upload Option</Form.Label>
                            <ReactSelectDropDownCommon
                                placeholder="Select Upload Option"
                                className="select-react-dropdown"
                                value={selectedRoivalue}
                                onChange={handleSelectRoiChange}
                                options={
                                    model?.id === 101
                                        ? [
                                            { label: "Standard Video & Images (No ROI)", value: 1 },
                                            { label: "Live Stream (With ROI)", value: 3 }
                                        ]
                                        : model?.id === 102
                                            ? [
                                                { label: "Standard Video & Images (With ROI)", value: 2 },
                                                { label: "Live Stream (With ROI)", value: 3 }
                                            ]
                                            : [
                                                { label: "Standard Video & Images (No ROI)", value: 1 },
                                                { label: "Standard Video & Images (With ROI)", value: 2 },
                                                { label: "Live Stream (With ROI)", value: 3 }
                                            ]
                                }
                                customStyles={customStyles}
                                isSearchable={true}
                            />
                        </Form.Group>

                    </>
                }
                footerContent={
                <>
                    <div className={"d-flex justify-content-end"}>
                    <CustomizedButtons className={'btn mr-2'} color={'secondary'} title={'Cancel'} submit={closeImageVideoModal}/>
                    <CustomizedButtons className={'btn'} color={'primary'} title={'Next'} submit={nextStep}/>
                    </div>
                </>
                }
                footerCustom={true}

            />
        </>
    );
}

export default VideoCameraRtspUploadModal;