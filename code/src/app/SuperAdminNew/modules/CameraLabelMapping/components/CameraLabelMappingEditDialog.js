import React, {useEffect, useState} from "react";
import CommonModal from "../../../../../utils/SuperAdmin/CommonModal";
import {Form} from "react-bootstrap";
import FromLoader from "../../../../../utils/SuperAdmin/Loader/FromLoader";
import {
    AllCameraOption,
    AllCompanyOption,
} from "../../../../../utils/SuperAdmin/enums/CompanyOption";
import {omit} from "lodash/object";
import CommaChipAutocomplete from "../../../../../utils/SuperAdmin/CommaChipAutocomplete";
import AutocompleteDropDownMenuNew from "../../../../../utils/SuperAdmin/AutocompleteDropDownMenuNew";

export function CameraLabelMappingEditDialog({editModalData, show, onHide,loadingModalData}) {
    const [errors, setErrors] = useState({});
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [labelsValue, setLabelsValue] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const [cameraOptions, setCameraOptions] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState(null);

    const [userRolesOptions, setUserRolesOptions] = useState([]);
    const [selectedUserRoles, setSelectedUserRoles] = useState(null);

    const handleLabelsFocus = () => {
        validateLabels(labelsValue);
    };

    useEffect(() => {
        if (editModalData && editModalData.id) {

            const companyData = editModalData.user_details?.company;
            if (companyData) {
                setSelectedCompany({
                    id: companyData.id,
                    label: companyData.company_name,
                    company_id: companyData.id
                });
            }

            setSelectedCamera({
                id: editModalData.id,
                label: editModalData.camera_name
            });

            const role = editModalData.user_details?.roles?.[0];
            if (role) {
                setSelectedUserRoles({
                    id: role.id,
                    label: role.role
                });
            }

            if (Array.isArray(editModalData.labels)) {
                setLabelsValue(editModalData.labels);
            }
        }
    }, [editModalData]);

    const validateLabels = (value) => {
        if (!value || value.length === 0) {
            setErrors(prev => ({
                ...prev,
                label: "This field is required. Please add at least one label.",
            }));
            return false;
        } else {
            setErrors(prev => omit(prev, ["label"]));
            return true;
        }
    };

    useEffect(() => {
        setCameraOptions(AllCameraOption.map(user => ({
            id: user.id,
            label: user.camera_name
        })))
    },[AllCameraOption]);

    useEffect(() => {
        setCompanyOptions(
            AllCompanyOption.map(user => ({
                id: user.id,
                company_id: user.company?.id,
                label: user.company?.company_name
            }))
        );
    }, [AllCompanyOption]);

    useEffect(() => {
        setUserRolesOptions([{id:1,label:"admin"}])
    },[]);



    const validateField = (fieldName, value) => {
        if (!value || (typeof value === "string" && value.trim() === "")) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: `This field is required. Please select ${fieldName.replace(/([A-Z])/g, ' $1')}.`,
            }));
            return false;
        } else {
            setErrors(prev => omit(prev, [fieldName]));
            return true;
        }
    };

    const handleCameraChange = (event, newValue) => {
        setSelectedCamera(newValue);
        validateField("camera", newValue);
    };


    const handleCameraBlur = () => {
        validateField("camera", selectedCamera);
    }

    const handleCompanyChange = (event, newValue) => {
        setSelectedCompany(newValue);
        validateField("company", newValue);
    };

    const handleCompanyBlur = () => {
        validateField("company", selectedCompany);
    }
    const handleUserRolesChange = (event, newValue) => {
        setSelectedUserRoles(newValue);
        validateField("roles", newValue);
    };

    const handleUserRolesBlur =() =>{
        validateField("roles",selectedUserRoles)
    }

    const saveCameraLabelMappingDetails = () => {
        const isCompanyValid = validateField("company", selectedCompany);
        const isCameraValid = validateField("camera", selectedCamera);
        const isRolesValid = validateField("roles", selectedUserRoles);
        const isLabelsValid = validateLabels(labelsValue);

        if (isCompanyValid && isCameraValid && isRolesValid && isLabelsValid) {
            onHide();
        }
    };

    return (
        <CommonModal
            size="md"
            show={show}
            handleClose={onHide}
            arialabelledby="example-modal-sizes-title-lg"
            title={`${editModalData?.id ? "Edit" : "Add "} Label Mapping `}
            closeButtonFlag={true}
            applyButton={true}
            content={

                loadingModalData ? (
                    <FromLoader/>
                ) : (
                    <>
                    <Form>
                        <Form.Group controlId="companySelect">
                            <Form.Label>Select Company</Form.Label>
                            <AutocompleteDropDownMenuNew
                                sx={{mb: 2}}
                                id="company"
                                loading={false}
                                options={companyOptions}
                                value={selectedCompany}
                                onChange={(event, newValue) =>
                                    handleCompanyChange(event, newValue)
                                }
                                onFocus={handleCompanyBlur}
                                className={"me-2"}
                                placeholder="Select Company"
                                error={errors["company"]}
                                helperText={errors["company"]}
                                disabled={editModalData?.id}
                            />
                        </Form.Group>
                        <Form.Group controlId="cameraSelect">
                            <Form.Label>Select Camera</Form.Label>
                            <AutocompleteDropDownMenuNew
                                sx={{mb: 2}}
                                id="camera"
                                loading={false}
                                value={selectedCamera}
                                options={cameraOptions}
                                onChange={(event, newValue) =>
                                    handleCameraChange(event, newValue)
                                }
                                onFocus={handleCameraBlur}
                                className={"me-2"}
                                placeholder="Select Camera"
                                error={errors["camera"]}
                                helperText={errors["camera"]}
                                disabled={editModalData?.id}
                            />
                        </Form.Group>
                        <Form.Group controlId="rolesSelect">
                            <Form.Label>Select UserRole</Form.Label>
                            <AutocompleteDropDownMenuNew
                                sx={{mb: 2}}
                                id="roles"
                                loading={false}
                                placeholder="Select UserRole"
                                value={selectedUserRoles}
                                options={userRolesOptions}
                                onChange={(event, newValue) =>
                                    handleUserRolesChange(event, newValue)
                                }
                                onFocus={handleUserRolesBlur}
                                className={"me-2"}
                                error={errors["roles"]}
                                helperText={errors["roles"]}
                                disabled={editModalData?.id}
                            />
                        </Form.Group>

                        <Form.Group controlId="labels">
                            <Form.Label>Labels</Form.Label>
                            <CommaChipAutocomplete
                                value={labelsValue}
                                setValue={setLabelsValue}
                                inputValue={inputValue}
                                setInputValue={setInputValue}
                                error={errors.label}
                                helperText={errors.label}
                                validateInput={validateLabels}
                                onFocus={handleLabelsFocus}
                                placeholder={'Add Labels'}

                            />
                        </Form.Group>
                    </Form>
                    </>
                )
            }
            submitEmployee={saveCameraLabelMappingDetails}
            id={editModalData?.id}
        />
    );
}
