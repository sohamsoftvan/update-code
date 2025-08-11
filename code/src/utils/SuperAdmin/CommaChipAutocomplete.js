// CommaChipAutocomplete.js
import React from "react";
import {TextField ,Chip ,Autocomplete} from "@mui/material";

const CommaChipAutocomplete = ({
                                   value,
                                   setValue,
                                   inputValue,
                                   setInputValue,
                                   error,
                                   helperText,
                                   validateInput,
                                   onFocus,
                                   placeholder
                               }) => {
    const handleKeyDown = (e) => {
        if ((e.key === "," || e.key === " ") && e.target.value.trim() !== "") {
            e.preventDefault();
            const newChip = e.target.value.trim();
            if (value && !value.includes(newChip)) {
                setValue((prev) => [...prev, newChip]);
                if (validateInput) validateInput(newChip);
            }
            setInputValue(""); // Clear input
        }
    };

    const handleDelete = (chipToDelete) => () => {
        setValue((chips) => chips.filter((chip) => chip !== chipToDelete));
    };

    return (
        <>
            <Autocomplete
                sx={{ mb: 1, width: "100%" }}
                multiple
                freeSolo
                options={[]}
                value={value}
                inputValue={inputValue}
                onInputChange={(event, newInput) => setInputValue(newInput)}
                onChange={(event, newVal) => setValue(newVal)}
                onFocus={onFocus}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                        <Chip
                            key={index}
                            label={option}
                            onDelete={handleDelete(option)}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder={placeholder}
                        error={!!error}
                        helperText={helperText}
                        onKeyDown={handleKeyDown}
                    />
                )}
            />
            <div className="d-flex justify-content-between">
        <span className="italic-text">
          Note: Press (,) or space key to add this field.
        </span>
            </div>
        </>
    );
};

export default CommaChipAutocomplete;
