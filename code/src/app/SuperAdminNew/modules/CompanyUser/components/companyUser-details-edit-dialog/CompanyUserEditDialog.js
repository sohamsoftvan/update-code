import React, {useEffect, useState} from "react";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import FromLoader from "../../../../../../utils/SuperAdmin/Loader/FromLoader";
import {CompanyDetailsDialog} from "./CompanyDetailsDialog";
import {initialCompanyValues} from "../../../../../../utils/SuperAdmin/enums/CompanyOption";


export function CompanyUserEditDialog({editModalData, show, onHide, loadingModalData}) {
    const [formData, setFormData] = useState(initialCompanyValues);
    const [errors, setErrors] = useState({});

    const [deploymentRegions, setDeploymentRegions] = useState(null)
    console.log("editModalData",editModalData)
    useEffect(() => {
        if (editModalData) {
            setFormData({
                ...initialCompanyValues,
                ...editModalData
            });
            setDeploymentRegions(editModalData.deployment_region)
        }
    }, [editModalData]);


    const validateForm = () => {
        const newErrors = {};
        Object.entries(formData).forEach(([key, val]) => {
            if (!val) newErrors[key] = `${key.replace(/_/g, " ")} is required`;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const saveCompanyDetails = () => {
        if (!validateForm()) return;

        // Submit logic here
        console.log("Submitted:", formData);
        // dispatch(action.saveCompany(formData)).then(() => onHide());
    };

    return (
        <CommonModal
            size="lg"
            show={show}
            handleClose={onHide}
            arialabelledby="edit-company-modal"
            title={"Edit Company"}
            closeButtonFlag={true}
            applyButton={true}
            scrollable={true}
            id={editModalData.id}
            submitEmployee={saveCompanyDetails}
            content={
                loadingModalData ? (
                    <FromLoader/>
                ) : (
                    <CompanyDetailsDialog
                        formData={formData}
                        errors={errors}
                        setErrors={setErrors}
                        setFormData={setFormData}
                        editData={true}
                        deploymentRegions={deploymentRegions}
                        setDeploymentRegions={setDeploymentRegions}
                    />
                )
            }
        />
    );
}
