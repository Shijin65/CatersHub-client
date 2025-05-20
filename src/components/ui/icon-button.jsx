import React from "react";
import { Button } from "@mui/material";

export const IconButton = ({
  size = "small",
  type = "button",
  rounded = false,
  color = "primary",
  children,
  variant = "contained",
  sx = {},
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      color={["primary", "secondary", "success", "error", "warning", "info","teal", "inherit"].includes(color) ? color : "primary"}
      type={type}
      sx={{
        minWidth: 0, // Removes default button width
        padding: size === "small" ? "4px" : size === "large" ? "16px" : "8px",
        borderRadius: rounded ? "9999px" : "6px",
        backgroundColor: !["primary", "secondary", "success", "error", "warning", "info", "inherit"].includes(color) ? color : undefined,
        "&:hover": {
          backgroundColor: !["primary", "secondary", "success", "error", "warning", "info", "inherit"].includes(color) ? color : undefined,
          opacity: 0.9, // Slight hover effect for custom colors
        },
        ...sx, // Allow additional styles
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
