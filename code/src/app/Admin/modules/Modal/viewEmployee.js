/* eslint-disable */
import React from "react";
import { dateTimeFormatter } from "../../../../utils/DateTimeFormatter";
import CommonModal from "../../../../utils/SuperAdmin/CommonModal";
import CustomizedSwitch from "../../../../utils/SuperAdmin/CustomizedSwitch";

class ViewEmployee extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      employeeDetails,
      viewEmployeeDetails,
      toggleEmployeeDetailsModal,
      locationDropDownDetails
    } = this.props;

    // eslint-disable-next-line
    const locationValue =
      locationDropDownDetails &&
      locationDropDownDetails.filter(items => {
        if (items.value === employeeDetails.location_id) {
          return { value: items.id, label: items.location_name };
        }
      });

    return (
      <>

        <CommonModal
            size="lg"
            show={viewEmployeeDetails}
            handleClose={toggleEmployeeDetailsModal}
            arialabelledby="example-modal-sizes-title-lg"
            title={"Employee Details"}
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
                Employee details
              </span>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col col-md-6">
                <span>
                  <b>Company Id</b>
                </span>
                  </div>
                  <div className="col col-md-6">{employeeDetails.company_id}</div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col col-md-6">
                <span>
                  <b>Name</b>
                </span>
                  </div>
                  <div className="col col-md-6">
                    {employeeDetails.employee_name}
                  </div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col col-md-6">
                <span>
                  <b>Description</b>
                </span>
                  </div>
                  <div className="col col-md-6">
                    {employeeDetails.employee_description}
                  </div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col col-md-6">
                <span>
                  <b>Contact Number</b>
                </span>
                  </div>
                  <div className="col col-md-6">
                    {employeeDetails.employee_contact_number}
                  </div>
                </div>

                <div className="row mt-2 mb-2">
                  <div className="col col-md-6">
                <span>
                  <b>Employee Id</b>
                </span>
                  </div>
                  <div className="col col-md-6">{employeeDetails.employee_id}</div>
                </div>

                <div className="row mt-2 mb-2">
                  <div className="col col-md-6">
                <span>
                  <b>Profession</b>
                </span>
                  </div>
                  <div className="col col-md-6">
                    {employeeDetails.employee_profession}
                  </div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col col-md-6">
                <span>
                  <b>External Name</b>
                </span>
                  </div>
                  <div className="col col-md-6">
                    {employeeDetails.external_name}
                  </div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col col-md-6">
                <span>
                  <b>Id</b>
                </span>
                  </div>
                  <div className="col col-md-6">{employeeDetails.id}</div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col col-md-6">
                <span>
                  <b>Location</b>
                </span>
                  </div>
                  {locationValue && locationValue.length > 0 ? (
                      <div className="col col-md-6">{locationValue[0].label}</div>
                  ) : (
                      <div className="col col-md-6"> - </div>
                  )}
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col col-md-6">
                <span>
                  <b>Created Date</b>
                </span>
                  </div>
                  <div className="col col-md-6">
                    {dateTimeFormatter(employeeDetails.created_date)}
                  </div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col col-md-6">
                <span>
                  <b>Updated Date</b>
                </span>
                  </div>
                  <div className="col col-md-6">
                    {dateTimeFormatter(employeeDetails.updated_date)}
                  </div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col col-md-6 my-widget8">
                <span>
                  <b>Status</b>
                </span>
                  </div>
                  <div className="col col-md-6">
                    <CustomizedSwitch
                        checked={employeeDetails.status}
                        color={"primary"}
                        className={"cursor-pointer"}
                    />
                  </div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col col-md-6 my-widget8">
                <span>
                  <b>Trained Status</b>
                </span>
                  </div>
                  <div className="col col-md-6">
                    <CustomizedSwitch
                        checked={employeeDetails.trained_status}
                        color={"primary"}
                        className={"cursor-pointer"}
                    />
                  </div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col col-md-6">
                    {" "}
                    <span>
                  <b>S3 Image Url</b>
                </span>
                  </div>
                  <div className="col col-md-6">
                    <img
                        className="w-100"
                        alt="no image found"
                        src={employeeDetails.employee_s3_image_url}
                    />
                  </div>
                </div>

              </>
            }
        />
      </>
    );
  }
}

export default ViewEmployee;
