import React from "react";
import Select from "react-select";

const ReactSelectDropDownCommon = ({
                                       isMulti = false,
                                       placeholder,
                                       value,
                                       onChange,
                                       options = [],
                                       name,
                                       isDisabled,
                                       defaultValue,
                                       isSearchable = false,
                                       loading = false,
                                       customStyles,
                                       className = "",
                                       ...rest
                                   }) => {
    return (
        <Select
            className={className}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary25: "#5DBFC4",
                    primary: "#147b82",
                },
            })}
            styles={{
                ...customStyles,
                menuPortal: base => ({ ...base, zIndex: 9999 }),
            }}
            menuPortalTarget={document.body}
            isLoading={loading}
            isSearchable={isSearchable}
            isMulti={isMulti}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            options={options}
            name={name}
            isDisabled={isDisabled}
            {...rest}
        />
    );
};

export default ReactSelectDropDownCommon;
