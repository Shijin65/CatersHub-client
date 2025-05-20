import { Box, FormHelperText, styled } from "@mui/material";
import { Input as BaseInput } from '@mui/base/input';
import { forwardRef } from "react";
import { red ,grey } from "@mui/material/colors";

export const CustomInputField = forwardRef(function CustomInput(props, ref) {
    const {
      sx = {},
      fontSize = "0.813rem",
      fontWeight = "500",
      error = false,
      helperText = "",
      InputStyle = {},
      ...otherProps
    } = props;
  
    return (
      <Box>
        <BaseInput
        color="primary"
          disabled={props.readOnly}
          readOnly={props.readOnly}
          slots={{ input: InputElement }}
          {...otherProps}
          ref={ref}
          slotProps={{
            input: {
              sx: {
                fontSize: {
                  xs: "13px",
                  sm: "13px",
                  md: "13px",
                  lg: "14px",
                },
                color: "#373737",
                padding: "8px",
                ...sx,
              },
              style: InputStyle,
              fontSize,
              fontWeight,
              error,
              value: props.value,
              readOnly: props.readOnly,
              ...props?.slotProps?.input,
            },
            root: {
              ...props?.slotProps?.root,
            },
          }}
        />
        <FormHelperText className="ps-2" sx={{ fontSize: "0.7em" }} error={error}>
          {helperText}
        </FormHelperText>
      </Box>
    );
  });
  
  const InputElement = styled("input")(
    ({ theme, fontSize, fontWeight, readOnly = false, error }) => `
      width: 100%;
      height: 32px;
      font-size: ${fontSize};
      font-weight: ${fontWeight};
      line-height: 1.5;
      padding: 4px 0px;
      padding-left: 10px;
      pointer-events: ${readOnly ? "none" : "auto"};
      border-radius: 0.375rem; /* rounded-md */
      border: 1px solid ${error ? red[200] : grey[400]};
      background: ${
        readOnly ? "transparent" : "rgb(243 244 246 / var(--tw-bg-opacity, 2))"
      }; /* bg-slate-200 */
      resize: auto;
      outline: none; /* outline-none */
      transition:  box-shadow 0.2s, border-color 0.2s;
  
      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 1px ${error ? red[300] : "primary"};
        border-color: ${error ? red[300] : "inherit"};
      }
      ${
        readOnly
          ? `
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
      `
          : ""
      }
      cursor: ${readOnly ? "default" : "text"};
      ${
        !readOnly &&
        `&:hover {
          background: ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
          border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
        }`
      }
    `
  );