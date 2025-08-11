import React, {Fragment} from "react";
import {
    Label,
    Input,
    Form,
} from "reactstrap";
import "react-block-ui/style.css";
import BlockUi from "react-block-ui";
import {connect} from "react-redux";
import * as auth from "../Auth";
import {ImagePicker} from "react-file-picker";
import {addEmployee, updateEmployee} from "../Employee/_redux";
import {urlToFile} from "../../../../utils/FileConverter";
import {successToast} from "../../../../utils/ToastMessage";
import {Button as BootButton} from "react-bootstrap";
import CommonModal from "../../../../utils/SuperAdmin/CommonModal";
import ReactSelectDropDownCommon from "../../../../utils/SuperAdmin/ReactSelectDropDownCommon";

class AddEmployee extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addEmployee: {
                employee_name: "",
                employee_description: "",
                employee_profession: "",
                employee_contact_number: "",
                employee_id: "",
                trained_status: false,
                external_name: "",
                company_id: this.props.user.company_id,
                location_id: "",
                status: true,
                employee_image: "",
            },
            errors: {},
            modelHeaderLabel: "Add Employee",
            modelSubmitButtonLabel: "Add Employee",
            imageViewFlag: false,
            imageView: "",
            changeImageFlag: false,
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let addEmployee = {
            employee_name: "",
            employee_description: "",
            employee_profession: "",
            employee_contact_number: "",
            employee_id: "",
            trained_status: false,
            external_name: "",
            company_id: this.props.user.company_id,
            location_id: "",
            status: true,
            employee_image: "",
        };
        this.setState({
            addEmployee: addEmployee,
        });
    }

    componentDidMount() {
        let addEmployee = {
            employee_name: "",
            employee_description: "",
            employee_profession: "",
            employee_contact_number: "",
            employee_id: "",
            trained_status: false,
            external_name: "",
            company_id: this.props.user.company_id,
            location_id: "",
            status: true,
            employee_image: "",
        };
        this.setState({
            addEmployee: addEmployee,
        });
    }

    changeLocationOptions = (e) => {
        let value = e.value;
        this.setState({
            addEmployee: {
                ...this.state.addEmployee,
                location_id: value,
            },
        });
    };

    changeEmployeeImage = (e) => {
        (async () => {
            try {
                const file = await urlToFile(e, "image.jpeg", "text/jpeg");
                this.setState(
                    {
                        addEmployee: {
                            ...this.state.addEmployee,
                            employee_image: file,
                        },
                        imageView: e,
                        changeImageFlag: true,
                        imageViewFlag: true,
                    },
                    () => {
                        this.setState({
                            otherFileType: false,
                        });
                    }
                );
            } catch (e) {
            }
        })();
    };

    changeEmployeeData = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let formData = {...this.state.addEmployee};
        formData[name] = value;
        this.setState({
            addEmployee: formData,
        });
    };

    addEmployeeDetails = (data) => {
        this.props.blockAddEmployee();
        data.trained_status = false;
        data.company_id = this.props.user.company_id;
        data.status = true;
        addEmployee(data).then((response) => {
            this.props.addEmployeeModal();
            if (response && response.isSuccess) {
                this.setState(
                    {
                        addEmployee: {},
                        errors: {},
                    },
                    () => {
                        successToast("Employee Added Successfully");
                        this.props.blockAddEmployee();
                        this.props.getAllEnabledEmployeeByCompanyId();
                    }
                );
            }
        });
    };

    updateEmployeeDetails = (id, url, key, data) => {
        this.props.blockAddEmployee();
        updateEmployee(id, url, key, data).then((response) => {
            this.props.addEmployeeModal();
            if (response && response.isSuccess) {
                this.setState(
                    {
                        addEmployee: {},
                        imageView:
                            response.data.employee_s3_image_url + "?" + new Date().getTime(),
                        imageViewFlag: false,
                        errors: {},
                    },
                    () => {
                        successToast("Employee Updated Successfully");
                        this.props.blockAddEmployee();
                        this.props.getAllEnabledEmployeeByCompanyId();
                    }
                );
            }
        });
    };
    submitEmployee = (e) => {
        if (this.validate()) {
            if (this.props.editEmployeeDetails && this.props.editEmployeeDetails) {
                this.updateEmployeeDetails(
                    this.props.editEmployeeDetails.id,
                    this.props.editEmployeeDetails.employee_s3_image_url,
                    this.props.editEmployeeDetails.employee_s3_image_key,
                    this.state.addEmployee
                );
            } else {
                this.addEmployeeDetails(this.state.addEmployee);
            }
        }
    };

    validate = () => {
        let addEmployee = {...this.state.addEmployee};
        let fileType =
            addEmployee &&
            addEmployee["employee_image"] &&
            addEmployee["employee_image"].type
                ? addEmployee["employee_image"].type
                : "";

        let errors = {};
        let isValid = true;
        if (addEmployee["employee_name"] === "") {
            isValid = false;
            errors["employee_name"] = "*Please Enter Employee Name";
        } else if (!addEmployee["employee_name"].match(/^[a-zA-Z ]{2,30}$/)) {
            isValid = false;
            errors["employee_name"] = "*Please Enter Valid Employee Name";
        }

        if (addEmployee["employee_description"] === "") {
            isValid = false;
            errors["employee_description"] = "*Please Enter Employee Description";
        }
        if (addEmployee["employee_profession"] === "") {
            isValid = false;
            errors["employee_profession"] = "*Please Enter Employee Profession";
        }
        if (addEmployee["employee_contact_number"] === "") {
            isValid = false;
            errors["employee_contact_number"] = "*Please Enter Employee Contact";
        } else {
            if (typeof addEmployee["employee_contact_number"] !== "undefined") {
                var pattern = new RegExp(/^[0-9]{10}$/);
                if (!addEmployee["employee_contact_number"].match(pattern)) {
                    isValid = false;
                    errors["employee_contact_number"] =
                        "*Please Enter Valid Employee Contact";
                }
            }
        }
        if (addEmployee["employee_id"] === "") {
            isValid = false;
            errors["employee_id"] = "*Please Enter Employee Id";
        } else {
            let val = addEmployee["employee_id"];
            if (!/^[0-9]+$/.test(val)) {
                isValid = false;
                errors["employee_id"] = "*Please Enter numeric";
            }
        }
        if (addEmployee["external_name"] === "") {
            isValid = false;
            errors["external_name"] = "*Please Enter External Name";
        }

        if (addEmployee["location_id"] === "") {
            isValid = false;
            errors["location_id"] = "*Please Select Location";
        }
        if (this.state.otherFileType) {
            isValid = false;
            errors["employee_image"] = "*Please Select Valid Image";
        } else {
            if (
                !(
                    this.props.editEmployeeDetails &&
                    this.props.editEmployeeDetails.id &&
                    this.props.editEmployeeDetails.id > 0
                ) &&
                fileType !== "text/jpeg" &&
                fileType !== "text/jpg" &&
                fileType !== "text/png"
            ) {
                isValid = false;
                errors["employee_image"] = "*Please Select Valid Employee Image";
            } else {
                if (
                    this.state.changeImageFlag &&
                    fileType !== "text/jpeg" &&
                    fileType !== "text/jpg" &&
                    fileType !== "text/png"
                ) {
                    isValid = false;
                    errors["employee_image"] = "*Please Select Valid Employee Image";
                }
            }
        }

        this.setState({
            errors: errors,
        });

        return isValid;
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.editEmployeeDetails !== undefined) {
            let editDropDownDetails =
                nextProps.locationDropDownDetails &&
                nextProps.locationDropDownDetails.filter((items) => {
                    if (items.value === nextProps.editEmployeeDetails.location_id) {
                        return items;
                    }
                    return null;
                });

            this.setState(
                {
                    addEmployee: nextProps.editEmployeeDetails,
                    locationDropDownDetails: editDropDownDetails[0],
                    modelHeaderLabel: "Edit Employee",
                    modelSubmitButtonLabel: "Update Employee",

                    imageViewFlag: true,
                },
                () => {
                    this.setState({
                        imageView: nextProps.editEmployeeDetails.employee_s3_image_url,
                    });
                }
            );
        }

        if (!nextProps.isUpdate) {
            this.setState({
                modelHeaderLabel: "Add Employee",
                modelSubmitButtonLabel: "Add Employee",
            });
        }
    }

    render() {
        const {
            modalOpen,
            addEmployeeModal,
            locationDropDownDetails,
            editEmployeeDetails,
            isUpdate,
        } = this.props;
        const {
            errors,
            modelHeaderLabel,
            modelSubmitButtonLabel,
            imageView,
            imageViewFlag,
        } = this.state;

        // Move the form JSX into a variable
        const formContent = (
            <Form method="post">
                    <BlockUi tag="div" blocking={this.props.blocking} color="#014f9f">
                        <Label for="employee_name">Employee Name *</Label>
                        <Input
                            type="text"
                            name="employee_name"
                            value={this.state.addEmployee["employee_name"]}
                            onChange={(e) => this.changeEmployeeData(e)}
                        />
                        <div style={{color: "red"}}>{errors["employee_name"]}</div>
                        <Label for="employee_description">Employee Description *</Label>
                        <Input
                            type="text"
                            name="employee_description"
                            value={this.state.addEmployee["employee_description"]}
                            onChange={(e) => this.changeEmployeeData(e)}
                        />
                        <div style={{color: "red"}}>
                            {errors["employee_description"]}
                        </div>
                        <Label for="employee_profession">Employee Profession *</Label>
                        <Input
                            type="text"
                            name="employee_profession"
                            value={this.state.addEmployee["employee_profession"]}
                            onChange={(e) => this.changeEmployeeData(e)}
                        />
                        <div style={{color: "red"}}>
                            {errors["employee_profession"]}
                        </div>
                        <Label for="employee_contact_number">
                            Employee Contact No *
                        </Label>
                        <Input
                            type="text"
                            name="employee_contact_number"
                            value={this.state.addEmployee["employee_contact_number"]}
                            onChange={(e) => this.changeEmployeeData(e)}
                        />
                        <div style={{color: "red"}}>
                            {errors["employee_contact_number"]}
                        </div>

                        <Label for="employee_id">Employee Id *</Label>
                        <Input
                            type="text"
                            name="employee_id"
                            value={this.state.addEmployee["employee_id"]}
                            onChange={(e) => this.changeEmployeeData(e)}
                        />
                        <div style={{color: "red"}}>{errors["employee_id"]}</div>
                        <Label for="external_name">External Name *</Label>
                        {editEmployeeDetails ? (
                            <>
                                <Input
                                    readOnly
                                    className="bg-secondary"
                                    type="text"
                                    name="external_name"
                                    value={this.state.addEmployee["external_name"]}
                                    onChange={(e) => this.changeEmployeeData(e)}
                                />
                                <div style={{color: "red"}}>
                                    {errors["external_name"]}
                                </div>
                            </>
                        ) : (
                            <>
                                <Input
                                    type="text"
                                    name="external_name"
                                    value={this.state.addEmployee["external_name"]}
                                    onChange={(e) => this.changeEmployeeData(e)}
                                />
                                <div style={{color: "red"}}>
                                    {errors["external_name"]}
                                </div>
                            </>
                        )}
                        <Label for="location_id">Location *</Label>
                        <ReactSelectDropDownCommon
                            name="location_id"
                            isSearchable={true}
                            className="select-react-dropdown"
                            options={locationDropDownDetails}
                            onChange={(e) => this.changeLocationOptions(e)}
                            defaultValue={this.state.locationDropDownDetails}
                        />
                        <div style={{color: "red"}}>{errors["location_id"]}</div>
                        {isUpdate ? (
                            <Label for="employee_image">Image </Label>
                        ) : (
                            <Label for="employee_image">Image *</Label>
                        )}
                        <ImagePicker
                            extensions={["jpg", "jpeg", "png"]}
                            dims={{minWidth: 100, minHeight: 100}}
                            maxSize={5}
                            onChange={(e) => this.changeEmployeeImage(e)}
                            onError={(errMsg) => {
                                this.setState({otherFileType: true});
                            }}
                            name="employee_image"
                        >
                            <BootButton variant="outline-success">
                                Select File To Upload
                            </BootButton>
                        </ImagePicker>
                        {errors["employee_image"] && (
                            <div style={{color: "red"}}>{errors["employee_image"]}</div>
                        )}
                        {imageViewFlag && (
                            <div class="row justify-content-md-center">
                                <div className="col col-sm-9">
                                    <div class="mt-1 text-center" style={{width: "100%"}}>
                                        <img
                                            alt=""
                                            className="w-100 h-auto"
                                            src={
                                                imageView && imageView.startsWith("http")
                                                    ? imageView + "?" + new Date().getTime()
                                                    : imageView
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </BlockUi>
            </Form>
        );

        return (
            <Fragment>
                <CommonModal
                    show={modalOpen}
                    handleClose={addEmployeeModal}
                    title={modelHeaderLabel}
                    content={formContent}
                    applyButton={true}
                    submitEmployee={this.submitEmployee}
                    flag={isUpdate} // set this as needed
                    id={editEmployeeDetails ? editEmployeeDetails.id : null}
                />
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const {auth} = state;
    return {user: auth.user};
}

export default connect(mapStateToProps, auth.actions)(AddEmployee);
