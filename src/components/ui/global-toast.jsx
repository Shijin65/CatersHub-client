import React from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { IconButton, Portal, Snackbar, SnackbarContent } from "@mui/material";

const colors = {
    success: "#15803d", // Dark Green
    info: "#0369a1", // Dark Blue
    error: "#b91c1c", // Dark Red
    warning: "#a16207", // Dark Yellow
  };
  
const icons = {
  success: <CheckCircleIcon className="w-6 h-6" />,
  info: <InformationCircleIcon className="w-6 h-6" />,
  error: <XCircleIcon className="w-6 h-6" />,
  warning: <ExclamationTriangleIcon className="w-6 h-6" />,
};

export const GlobalToast = ({ open, type = "success", message, handleClose }) => {
  return (
    <Portal>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000} // Auto-close after 5 seconds
      >
        <SnackbarContent
          sx={{
            backgroundColor: colors[type] || "#22c55e", // Default to green
            color: "#ffffff", // White text
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: "12px 16px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          }}
          message={
            <div className="flex items-center gap-4">
              {icons[type] || <CheckCircleIcon className="w-6 h-6" />}
              <span>{message}</span>
            </div>
          }
          action={
            <IconButton onClick={handleClose} color="inherit">
              <XMarkIcon className="w-6 h-6" />
            </IconButton>
          }
        />
      </Snackbar>
    </Portal>
  );
};
