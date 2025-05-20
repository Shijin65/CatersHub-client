import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState, forwardRef } from "react";

// ✅ Wrap the whole component inside forwardRef
const PasswordField = forwardRef(
  (
    {
      id = "password",
      label = "Password",
      error = false,
      helperText = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };

    const iconClasses = "w-5 h-5 text-slate-500 dark:text-slate-300";

    return (
      <TextField
        {...props}
        error={!!error}
        helperText={helperText}
        ref={ref} // ✅ Correctly forwarding the ref
        size="small"
        id={id}
        type={showPassword ? "text" : "password"}
        label={label}
        variant="outlined"
        autoComplete="off"
        className="w-full"
        sx={{
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? (
                  <EyeSlashIcon className={iconClasses} />
                ) : (
                  <EyeIcon className={iconClasses} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

// ✅ Add display name for better debugging
PasswordField.displayName = "PasswordField";

export default PasswordField;
