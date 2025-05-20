import React, { forwardRef, useId } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { grey } from "@mui/material/colors";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const AutoCompleteMultiple = forwardRef(function AC(props, ref) {
  const {
    placeholder,
    label = "",
    options = [],
    value = [],
    onChange,
    error = false,
    noCheckBox = false,
    disabled = false,
    helperText = "",
    noBorder = false,
    size = "small",
    limitTags = 2,
    ...restProps
  } = props;

  const id = useId();

  const handleChange = (event, selectedValues) => {
    onChange?.(selectedValues);
  };

  return (
    <Autocomplete
      multiple
      size={size}
      id={`autocomplete-multiple-${id}`}
      options={options}
      disableCloseOnSelect
      limitTags={limitTags}
      disabled={disabled}
      getOptionLabel={(option) => option.name}
      getOptionDisabled={(option) => option.disabled}
      value={value}
      onChange={handleChange}
      isOptionEqualToValue={(option, selectedValue) => option.id === selectedValue.id}
      slotProps={{
        listbox: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            overflow: "auto",
          },
        },
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.id}>
          {!noCheckBox && (
            <Checkbox
              size={size}
              sx={{ height: 8 }}
              style={{ marginRight: 6 }}
              color="primary"
              checked={selected}
            />
          )}
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          size={size}
          error={error}
          helperText={helperText}
          disabled={disabled}
          sx={{
            "& fieldset": { border: noBorder ? "none" : undefined },
            "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
              backgroundColor: grey[50],
              fontSize: "13px",
              paddingBottom: "3px",
              minHeight: "37px",
            },
            "& .MuiFormLabel-root.MuiInputLabel-root": {
              fontSize: "13px",
            },
          }}
        />
      )}
      ref={ref}
      {...restProps}
    />
  );
});
