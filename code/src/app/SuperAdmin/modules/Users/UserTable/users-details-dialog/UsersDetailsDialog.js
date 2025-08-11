import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { UserSlice } from "../../_redux/UserSlice";
import { UsersDetailsForm } from "./UsersDetailsForm";
import { dateTimeFormatter } from "../../../../../../utils/DateTimeFormatter";
import CommonModal from "../../../../../../utils/SuperAdmin/CommonModal";

const { actions } = UserSlice;

export function UsersDetailsDialog({ id, show, onHide }) {
  const dispatch = useDispatch();
  const { actionsLoading, entities, userDetails } = useSelector(
    state => ({
      actionsLoading: state.users.actionsLoading,
      entities: state.users.entities,
      userDetails: state.users.userDetails
    }),
    shallowEqual
  );

  const getUserDetails = id => {
    //eslint-disable-next-line
    entities &&
      entities.map(items => {
        let i = parseInt(id);
        if (items.id === i) {
          const data = {
            viewComapanyAddress: items.company.company_address,
            viewCompanyDescription: items.company.company_description,
            viewCompanyPincode: items.company.company_pin_code,
            viewCompanyPoc: items.company.company_poc,
            viewCompanyPocContact: items.company.company_poc_contact,
            viewCreatedDate: dateTimeFormatter(items.company.created_date),
            viewUpdatedDate: dateTimeFormatter(items.company.updated_date)
          };
          dispatch(actions.viewUserDetails(data));
        }
        return null;
      });
  };

  useEffect(() => {
    getUserDetails(id);
    //eslint-disable-next-line
  }, [id]);

  return (
      <CommonModal
          size="lg"
          show={show}
          handleClose={onHide}
          arialabelledby="example-modal-sizes-title-lg"
          title={"User Details"}
          closeButtonFlag={true}
          applyButton={false}
          content={
            <>
              <UsersDetailsForm
                  actionsLoading={actionsLoading}
                  userDetails={userDetails}
                  onHide={onHide}
              />

            </>
          }
      />
  );
}
