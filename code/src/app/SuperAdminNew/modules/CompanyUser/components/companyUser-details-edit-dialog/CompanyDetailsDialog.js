import { Form, Row, Col } from "react-bootstrap";
import FormFieldCommon from "../../../../../../utils/SuperAdmin/FormFieldCommon";
import React from "react";
import { deploymentRegionsData } from "../../../../../../utils/SuperAdmin/enums/CompanyOption";
import AutocompleteDropDownMenuNew from "../../../../../../utils/SuperAdmin/AutocompleteDropDownMenuNew";

export function CompanyDetailsDialog({ formData, errors, setFormData, setErrors, editData,deploymentRegions,setDeploymentRegions }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...formData, [name]: value };
        setFormData(updated);
        validateField(name, value);
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        validateField(name, formData[name]);
    };

    const handleRegionChange = (event, selected) => {
        const value = selected?.id || "";
        setDeploymentRegions(selected)
        // setFormData((prev) => ({ ...prev, deployment_region: value }));
        validateField("deployment_region", value);
    };

    const validateField = (name, value) => {
        let msg = "";
        if (!value) {
            msg = `${name.replace(/_/g, " ")} is required`;
        } else {
            if (name === "company_email" && !/^\S+@\S+\.\S+$/.test(value)) {
                msg = "Invalid email format";
            }
        }
        setErrors((prev) => ({ ...prev, [name]: msg }));
        return msg;
    };

    const fieldList = [
        { label: "Company Name", name: "company_name" },
        { label: "Company Email", name: "company_email" ,editDataDisabled: editData},
        { label: "Company Description", name: "company_description" },
        { label: "Company Address", name: "company_address" },
        { label: "Pin Code", name: "company_pin_code" },
        { label: "Website", name: "company_website" },
        { label: "Contact", name: "company_contact" },
        { label: "POC Name", name: "company_poc" },
        { label: "POC Contact", name: "company_poc_contact" },
    ];

    console.log("formData",deploymentRegions);
    return (
        <Form>
            <Row>
                {fieldList.map((field, idx) => (
                    <Col md={6} key={field?.name} className="mb-3">
                        <Form.Group controlId={field?.name}>
                            <Form.Label>{field?.label}</Form.Label>
                            <FormFieldCommon
                                name={field?.name}
                                value={formData[field?.name]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={field?.label}
                                fullWidth
                                variant="outlined"
                                error={!!errors[field?.name]}
                                helperText={errors[field?.name]}
                                disabled={field?.editDataDisabled}
                            />
                        </Form.Group>
                    </Col>
                ))}

                <Col md={6} className="mb-3">
                    <Form.Group controlId="deployment_region">
                        <Form.Label>Deployment Region</Form.Label>
                        <AutocompleteDropDownMenuNew
                            sx={{mb: 2}}
                            id="deployment_region"
                            loading={false}
                            options={deploymentRegionsData.map((item) => ({
                                label: item.name,
                                id: item.value,
                            }))}
                            value={deploymentRegions}
                            onChange={(event, newValue) =>
                                handleRegionChange(event, newValue)
                            }
                            onFocus={() => validateField("deployment_region", deploymentRegions?.id)}
                            className={"me-2"}
                            placeholder={"Select Region"}
                            error={errors["deployment_region"]}
                            helperText={errors["deployment_region"]}
                            disabled={editData}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
