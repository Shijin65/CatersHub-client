import React from "react";
import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { CustomButton } from "./custom-button";

const DeleteForm = ({
  handleSubmit,
  handleClose,
  icon,
  title,
  subtitle,
  buttonLabels = ["Delete", "Cancel"],
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col text-black gap-6 items-center justify-center">
        <div className="p-[34px] rounded-full bg-[hsl(12,67%,80%)]">{icon}</div>
        <div className="text-center space-y-3">
          <p className="text-gray-600 text-lg font-semibold">
            {title}
          </p>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>
      <div className="text-gray-500 flex gap-2 items-center justify-center pt-6">
        <CustomButton
          type="submit"
          variant="contained"
          color="error"
          startIcon={<TrashIcon className="w-5 h-5" />}
        >
          {buttonLabels[0]}
        </CustomButton>
        <CustomButton
          variant="outlined"
          startIcon={<XCircleIcon className="w-5 h-5" />}
          onClick={handleClose}
        >
          {buttonLabels[1]}
        </CustomButton>
      </div>
    </form>
  );
};
DeleteForm.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default DeleteForm;
