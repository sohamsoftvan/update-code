import React from "react";
import { UsersEditForm } from "./UsersEditForm";

export function UsersEditDialog({ id, show, onHide }) {
  // // Customers UI Context
  // const customersUIContext = useCustomersUIContext();
  // const customersUIProps = useMemo(() => {
  //   return {
  //     initCustomer: customersUIContext.initCustomer,
  //   };
  // }, [customersUIContext]);
  //
  // // Customers Redux state
  // const dispatch = useDispatch();
  // const { actionsLoading, customerForEdit } = useSelector(
  //   (state) => ({
  //     actionsLoading: state.customers.actionsLoading,
  //     customerForEdit: state.customers.customerForEdit,
  //   }),
  //   shallowEqual
  // );
  //
  // useEffect(() => {
  //   // server call for getting Customer by id
  //   dispatch(actions.fetchCustomer(id));
  // }, [id, dispatch]);
  //
  // // server request for saving customer
  // const saveCustomer = (customer) => {
  //   if (!id) {
  //     // server request for creating customer
  //     dispatch(actions.createCustomer(customer)).then(() => onHide());
  //   } else {
  //     // server request for updating customer
  //     dispatch(actions.updateCustomer(customer)).then(() => onHide());
  //   }
  // };

  return (
      <UsersEditForm
        // saveCustomer={saveCustomer}
        // actionsLoading={actionsLoading}
        // customer={customerForEdit || customersUIProps.initCustomer}
        onHide={onHide}
        show={show}
        id={id}
      />
  );
}
