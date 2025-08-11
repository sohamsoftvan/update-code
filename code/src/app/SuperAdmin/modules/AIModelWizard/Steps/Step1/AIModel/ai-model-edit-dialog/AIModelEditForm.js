// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Form, Col, Row, DropdownButton} from "react-bootstrap";

import * as Yup from "yup";
import DropdownItem from "react-bootstrap/DropdownItem";
import { useDispatch } from "react-redux";
import CommonModal from "../../../../../../../../utils/SuperAdmin/CommonModal";
// Validation schema
const CustomerEditSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Firstname is required"),
  lastName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  userName: Yup.string().required("Username is required"),
  dateOfBbirth: Yup.mixed()
    .nullable(false)
    .required("Date of Birth is required"),
  ipAddress: Yup.string().required("IP Address is required"),
});

export function AIModelEditForm({
  saveCustomer,
  customer,
  actionsLoading,
  onHide,show,id
}) {

  const dispatch = useDispatch();

  // useEffect(() =>{
  //   
  //          dispatch(actions.fetchDevice());
  //        //  dispatch(actions.fetchModelType());
  //        //  dispatch(actions.fetchFramework());
  
  // },[]);

//   useEffect(() => {
//    
//            dispatch(actions.fetchDevice());
//          //  dispatch(actions.fetchModelType());
//          //  dispatch(actions.fetchFramework());
// },[]);


  return (
    <>
      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={"Add AI Model"}
          closeButtonFlag={true}
          applyButton={true}
          content={
            <>
              <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4}>
                    Model Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" placeholder="Model Name" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4}>
                    Model Description
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control as="textarea" rows="3" placeholder="Model Description" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4}>
                    Model GPU Infer Speed
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" placeholder="Model GPU Infer Speed" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4}>
                    Model CPU Infer Speed
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" placeholder="Model CPU Infer Speed" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4}>
                    Model Version Id
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" placeholder="Model Version Id" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4}>
                    Model Accuracy
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" placeholder="Model Accuracy" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4}>
                    Model Size
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" placeholder="Model Size" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4}>
                    Model Depth
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" placeholder="Model Depth" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4}>
                    Framework Version Number
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control type="text" placeholder="Framework Version Number" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4}>
                    Model Type
                  </Form.Label>
                  <Col sm={8}>
                    <DropdownButton id="dropdown-basic-button" title="Model" drop={"right"}>
                      <DropdownItem>Action 1</DropdownItem>
                      <DropdownItem >Action 2</DropdownItem>
                      <DropdownItem>Action 3</DropdownItem>
                      {/*<DropdownItem href="#/action-1">Action</DropdownItem>*/}
                    </DropdownButton>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4}>
                    Model Device
                  </Form.Label>
                  <Col sm={8}>
                    <DropdownButton id="dropdown-basic-button" title="Model" drop={"right"}>
                      <DropdownItem>Action 1</DropdownItem>
                      <DropdownItem >Action 2</DropdownItem>
                      <DropdownItem>Action 3</DropdownItem>
                      {/*<DropdownItem href="#/action-1">Action</DropdownItem>*/}
                    </DropdownButton>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={4}>
                    Framework
                  </Form.Label>
                  <Col sm={8}>
                    <DropdownButton id="dropdown-basic-button" title="Model" drop={"right"}>
                      <DropdownItem>Action 1</DropdownItem>
                      <DropdownItem >Action 2</DropdownItem>
                      <DropdownItem>Action 3</DropdownItem>
                      {/*<DropdownItem href="#/action-1">Action</DropdownItem>*/}
                    </DropdownButton>
                  </Col>
                </Form.Group>

              </Form>

            </>
          }
          // submitEmployee={() => handleSubmit()}
      />
     {/* <Formik
        enableReinitialize={true}
        initialValues={customer}
        validationSchema={CustomerEditSchema}
        onSubmit={(values) => {
          saveCustomer(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-4">
                  First Name
                  </div>
                  <div className="col-lg-8">
                    <Field
                      name="firstName"
                      component={Input}
                      placeholder="First Name"
                      label="First Name"
                    />
                  </div>

                </div>
                 Email
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                   Date of birth
                  <div className="col-lg-4">
                    <DatePickerField
                      name="dateOfBbirth"
                      label="Date of Birth"
                    />
                  </div>
                   IP Address
                  <div className="col-lg-4">
                    <Field
                      name="ipAddress"
                      component={Input}
                      placeholder="IP Address"
                      label="IP Address"
                      customFeedbackLabel="We'll never share customer IP Address with anyone else"
                    />
                  </div>
                </div>
                <div className="form-group row">
                   Gender
                  <div className="col-lg-4">
                    <Select name="Gender" label="Gender">
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </Select>
                  </div>
                   Type
                  <div className="col-lg-4">
                    <Select name="type" label="Type">
                      <option value="0">Business</option>
                      <option value="1">Individual</option>
                    </Select>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>*/}
    </>
  );
}
