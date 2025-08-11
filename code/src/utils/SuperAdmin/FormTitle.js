import React from 'react';
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";
import {Edit} from "@mui/icons-material";

const FormTitle = ({title, variant, sx, className, color, align, optional,link ,linkVariant ,linkTo,linkTittle,additionalContent ,isEditing,handleEdit}) => {
    return (
        <Typography variant={variant} style={sx} className={className} color={color} align={align}>
            {title}
            {isEditing && ( // Render the edit button only if not in editing mode
                <Edit className={'ms-4'} onClick={handleEdit}/> // Clicking this icon enables editing mode
            )}
            {optional && <span className={"float-end "}>(Optional)</span>}
            {link &&
            <Link variant={linkVariant} to={linkTo}>
                {linkTittle}
            </Link>}
            {additionalContent && additionalContent}
        </Typography>

    );
};

export default FormTitle;



