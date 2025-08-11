import React from "react";
import TextField from "@mui/material/TextField";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const CommonInputAdornment = ({showPassword, onClick}) => (
    <InputAdornment position="end">
        <IconButton onClick={onClick} edge="end">
            {showPassword ?  <Visibility /> : <VisibilityOff />}
        </IconButton>
    </InputAdornment>
);


const FormFieldCommon = ({
                             value,
                             error,
                             name,
                             sx,
                             placeholder,
                             onChange,
                             onBlur,
                             helperText,
                             className,
                             margin,
                             required,
                             variant,
                             type,
                             disabled,
                             fullWidth,
                             field,
                             setShowPassword,
                             showPassword,
                             label,
                             multiline,
                             rows,
                             testId,
                             step

                         }) => {
    const inputAdornment = field &&
        <CommonInputAdornment showPassword={showPassword} onClick={() => setShowPassword(!showPassword)}/>

    return (

        <TextField sx={sx} placeholder={placeholder} variant={variant} name={name} value={value} error={error}
                   onChange={onChange} onBlur={onBlur} helperText={helperText} className={className} margin={margin}
                   fullWidth={fullWidth && fullWidth} label={label} multiline={multiline && multiline} rows={rows}
                   required={required && required}
                   InputProps={{
                       endAdornment: inputAdornment,
                       ...(type === "number" && step ? { inputProps: { step } } : {}) // Add step for number type
                   }}
                   type={type}
                   data-testid={testId} disabled={disabled}/>);
}


export default FormFieldCommon;

