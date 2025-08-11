import React from 'react';
import {Col, Form, Row} from "react-bootstrap";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import ReactSelectDropDownCommon from "../../../../../../utils/SuperAdmin/ReactSelectDropDownCommon";

function ServiceAdd({onHideAddServiceModal ,showAddSerivceModal}) {
    return (
         <>

             <CommonModal
                 size="lg"
                 show={showAddSerivceModal}
                 handleClose={onHideAddServiceModal}
                 arialabelledby="contained-modal-title-vcenter"
                 style={{ background: "#00000080" }}
                 title={"Add Services"}
                 closeButtonFlag={true}
                 applyButton={true}
                 content={
                     <>
                         <Form>
                             <Form.Group controlId="locationName" as={Row}>
                                 <Form.Label column sm={4}>
                                     Service Name
                                 </Form.Label>
                                 <Col sm={8}>
                                     <Form.Group>
                                         <ReactSelectDropDownCommon
                                             placeholder="Select Service"
                                             className="select-react-dropdown"
                                             // options={labelOptions}
                                             // onChange={(opt) => handleLabelChange(opt)}
                                             // value={selectedLabel}
                                             // loading={labelLoading}
                                             name="labelOptions"
                                             isMulti={true}
                                             isSearchable={true}
                                         />
                                     </Form.Group>
                                 </Col>
                             </Form.Group>
                         </Form>

                     </>
                 }
                 submitEmployee={onHideAddServiceModal}
             />
        </>
    );
}

export default ServiceAdd;