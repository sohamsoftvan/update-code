import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import * as action from "../../_redux/DeviceAction";
import { AutoServingStatusChangeAlert } from "../../../../../../utils/AutoServingStatusChangeAlert";
import {useParams} from "react-router-dom";

export function DeviceStatusDialog({show, onHide }) {
  const { entities } = useSelector(
    state => ({
      entities: state.device.entities
    }),
    shallowEqual
  );

  const {id,status} = useParams();
  return (
    <AutoServingStatusChangeAlert
      id={id}
      status={status}
      show={show}
      onHide={onHide}
      entities={entities}
      updateMethod={action.deviceUpdate}
    />
  );
}
