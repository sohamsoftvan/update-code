import React from "react";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";

function UserServiceInfo({ infoModalShow, handleInfoClose, infoData }) {
  return (
    <>
      <CommonModal
          size="lg"
          show={infoModalShow}
          handleClose={handleInfoClose}
          arialabelledby="contained-modal-title-vcenter"
          style={{ background: "#00000080" }}
          title={"User Service Information"}
          closeButtonFlag={true}
          applyButton={false}
          content={
            <>
              <div className="row col-12 view-title text-center">
            <span
                className="w-100 font-weight-bold"
                style={{
                  background: "#147b82",
                  color: "white",
                  margin: "20px auto"
                }}
            >
              User Service
            </span>
              </div>
              <div className="row">
                <div className="col col-md-6">
              <span>
                <b>Company Name</b>
              </span>
                </div>
                <div className="col col-md-6">
                  {infoData?.company?.company_address}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col col-md-6">
              <span>
                <b>Whatsapp Number</b>
              </span>
                </div>
                <div className="col col-md-6">
                  {infoData?.company?.company_description}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col col-md-6">
              <span>
                <b>Company Due Date</b>
              </span>
                </div>
                <div className="col col-md-6">
                  {infoData?.company?.company_pin_code}
                </div>
              </div>
            </>
          }
      />
    </>
  );
}

export default UserServiceInfo;
