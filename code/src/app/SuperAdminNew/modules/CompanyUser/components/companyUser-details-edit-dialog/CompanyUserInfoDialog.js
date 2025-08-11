import React, {useState} from "react";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";
import CustomizedButtons from "../../../../../../utils/SuperAdmin/CustomizedButtons";
import CustomizedSwitch from "../../../../../../utils/SuperAdmin/CustomizedSwitch";
import {Card} from "reactstrap";
import CompanyAddUserDialog from "./CompanyAddUserDialog";

export function CompanyUserInfoDialog({show, onHide, infoData}) {
    const [showAlert, setShowAlert] = useState(false);
    const [newSetting, setNewSetting] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const ShowAlertForSetting = (id, status) => {
        setNewSetting({id, status});
        setShowAlert(true);
    };




    const openAddModal = () => {
        setModalOpen(true);
    }
    const handleClose = () => {
        setModalOpen(false);
    }



    return (

        <CommonModal
            size="lg"
            show={show}
            handleClose={onHide}
            arialabelledby="example-modal-sizes-title-lg"
            title={`Company User Details`}
            closeButtonFlag={true}
            applyButton={false}
            content={
                <>
                    <div className="p-4 container-fluid" style={{maxHeight: "75vh", overflowY: "auto"}}>
                        <div className="company-details-wrapper">

                            {/* ➤ Add User Button */}
                            <div className="d-flex justify-content-end mb-3">
                                <CustomizedButtons
                                    size="medium"
                                    color="secondary"
                                    title="Add User"
                                    flag={false}
                                    submit={openAddModal}
                                    className="mb-4 mt-3"
                                />
                            </div>

                            {/* ➤ Company Info Section */}
                            <Card className="mb-4 shadow-sm p-3">
                                <h5 className="text-center font-weight-bold text-white p-1"
                                    style={{backgroundColor: "#147b82"}}>
                                    Company Info
                                </h5>
                                <div className="row font-size-base">
                                    <div className="col-md-6 mb-3">
                                        <b>Company Name:</b> <br/>
                                        {infoData.company_name || "-"}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <b>Email:</b> <br/>
                                        {infoData.company_email || "-"}
                                    </div>
                                </div>
                            </Card>

                            {/* ➤ Company Users by Role */}
                            <div className="company-users">

                                {["superadmin", "admin", "developer"].map((role) => {
                                    const roleUsers = infoData.users.filter((user) => user.role === role);
                                    if (!roleUsers.length) return null;

                                    return (
                                        <Card key={role} className="mb-4 p-3 border shadow-sm">
                                            <h5 className="text-center font-weight-bold text-white p-1"
                                                style={{backgroundColor: "#147b82"}}>
                                                {role}s
                                            </h5>

                                            <div className="row">
                                                {roleUsers.map((user) => (
                                                    <div key={user.user_id} className="col-md-6 mb-4">
                                                        <div className="border rounded p-3 bg-white">
                                                            <div><b>Name:</b> {user.name}</div>
                                                            <div><b>Email:</b> {user.email}</div>

                                                            <div>
                                                                <b>Locations:</b>{" "}
                                                                {user.locations.map(loc => loc.name).join(", ")}
                                                            </div>


                                                            <div className="d-flex align-items-center mt-2">
                                                                <b>Status:</b>
                                                                <CustomizedSwitch
                                                                    checked={user.status === "active"}
                                                                    onChange={() => ShowAlertForSetting(user.user_id, user.status !== "active")}
                                                                    color="primary"
                                                                    className="ml-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>

                            {/* ➤ No Camera Section */}
                            {!infoData?.users.length && (
                                <div className="row col-12 view-title text-center mt-4">
                                    <span className="w-100 font-weight-bold text-danger">No Cameras Found!</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <CompanyAddUserDialog
                        onHide={handleClose}
                        modalOpen={modalOpen}
                    />
                </>

            }
        />
    )
}

