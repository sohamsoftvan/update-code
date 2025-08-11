import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import {
  getEnabledLocationList,
} from "../AddSupervisor/_redux";
import { warningToast } from "../../../../utils/ToastMessage";
import { Input, Label } from "reactstrap";
import CommonModal from "../../../../utils/SuperAdmin/CommonModal";
import ReactSelectDropDownCommon from "../../../../utils/SuperAdmin/ReactSelectDropDownCommon";
import FromLoader from "../../../../utils/SuperAdmin/Loader/FromLoader";
const AssignLocationModal = ({
                               modalOpen,
                               specific_user_id,
                               selectedUser,
                               selectedUserLocation,
                               toggleLocationModal,
                               handleAssignLocation,assignLoading
                             }) => {
  const user = useSelector((state) => state.auth.user);

  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedLocationList, setSelectedLocationList] = useState([]);
  const [userEmail, setUserEmail] = useState(selectedUser?.email || "");



  const initializeLocationState = () => {
    const existingLocations = selectedUserLocation || [];
    const selectedArray = existingLocations.map((loc) => loc.value);
    setSelectedLocation(existingLocations);
    setSelectedLocationList(selectedArray);
    setUserEmail(selectedUser?.email || "");
  };

  const populateLocationList =  () => {
      getEnabledLocationList(user.roles[0].role)
          .then(response => {
              if (response?.data) {
                  const options = response.data.map((location) => ({
                      value: location.id,
                      label: location.location_name,
                  }));
                  setLocationOptions(options);
              }
          })
          .catch(error => {
              if (error.detail) {
                  console.error("error.detail",error.detail)
              }
          });
  };
  useEffect(() => {
    if (modalOpen) {
      populateLocationList();
      initializeLocationState();
    }
  }, [modalOpen, selectedUser, selectedUserLocation]);

  const handleLocationChange = async (newSelection) => {
    const locationValues = newSelection?.map((item) => item.value) || [];
    setSelectedLocation(newSelection);
    setSelectedLocationList(locationValues);
  };


  const assignLocation = () => {
    if (!selectedLocationList.length) {
      warningToast("Please fill required fields");
      return;
    }

    const params = { location_list: selectedLocationList };
    handleAssignLocation(params, specific_user_id,selectedLocation)

  };

  const modalContent = (
      <>
          {assignLoading ? (<>
              <FromLoader />
          </>):(<>
              <Label for="user_email">User Email</Label>
              <Input disabled type="email" value={userEmail} name="user_email" />

              <Label className="mt-2" for="assign_location">
                  Assign Location *
              </Label>
              <ReactSelectDropDownCommon
                  isMulti
                  placeholder="Assign Location"
                  isSearchable={true}
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  options={locationOptions}
              />
          </>)}
      </>
  );

  return (
      <Fragment>
        <CommonModal
            show={modalOpen}
            title="Assign Location"
            content={modalContent}
            backdrop="static"
            keyboard={false}
            closeButtonFlag
            handleClose={toggleLocationModal}
            submitEmployee={assignLocation}
            flag={false}
            applyButton
        />
      </Fragment>
  );
};

export default AssignLocationModal;
