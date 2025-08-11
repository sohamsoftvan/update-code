import * as React from "react";
import {TextField ,Autocomplete} from "@mui/material";

export default function AutocompleteDropDownMenuNew({
                                                        style,
  id,
  options = [],
  value,
  onChange,
  onFocus,
  placeholder,
  className,
  error,
  helperText,
  disabled,
  link,
  linkName,loading,convertToReadableStringFlag
}) {
  const getOptionLabel = option => {
    if (typeof option === "string") {
      return option;
    } else if (typeof option === "object" && option !== null) {
      return  option.label;
    }
    return option; // Fallback for unexpected types
  };

  return (
    <Autocomplete
      loading={loading}
      style={style}
      id={id}
      options={options || []}
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      disabled={disabled}
      isOptionEqualToValue={(option, value) => {
        // Check if both option and value have an id property
        if (option?.id && value?.id) {
          return option.id === value.id;
        }
        // Fallback for when one or both do not have an id
        return option === value;
      }}
      noOptionsText={
      <>
        <div>
          No options
        </div>
      </>
      }
      renderInput={params => (
        <TextField
          {...params}
          placeholder={placeholder}
          className={className}
          error={error}
          helperText={helperText}
          variant="outlined"
        />
      )}
    />
  );
}
