import React from 'react';
import Switch from "@mui/material/Switch/Switch";

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

