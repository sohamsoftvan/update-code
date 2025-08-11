import React from 'react';
import {Switch} from "@mui/material";

export default function CustomizedSwitch(props) {
    return (
        <>
            <Switch
                checked={props.checked}
                onChange={props.onChange}
                color={props.color}
                disabled={props.disabled}
                className={props.className}
                name={props.name}
                onBlur={props.onBlur}
            />
        </>
    );
}

