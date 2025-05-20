import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const CustomModal = ({
  isOpen,
  handleClose,
  children,
  title,
  size = "medium",
  boxProps,
}) => {
  // Dynamic width based on `size` prop
  const widthMap = {
    small: "90%",
    medium: "90%",
    large: "95%",
  };

  const maxWidthMap = {
    small: 400,
    medium: 600,
    large: 900,
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: widthMap[size] || "90%",
    maxWidth: maxWidthMap[size] || 600,
    maxHeight: "90vh",
    bgcolor: "transparent",
    borderRadius: "16px",
    boxShadow: 24,
    overflowX: "hidden",
    ...boxProps,
  };

  return (
    <Fragment>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
          <div className="bg-white px-4 rounded-2xl py-4 pb-5 2xl:py-5 2xl:pb-6">
            <header className="flex items-center justify-between mb-3">
              <h1 className="w-[90%] font-semibold text-lg 2xl:text-xl text-ellipsis text-gray-500 pl-0 sm:pl-3">
                {title || ""}
              </h1>
              <IconButton onClick={handleClose} className="modalCloseBtn">
                <XMarkIcon className="w-5 h-5" color="#637895" />
              </IconButton>
            </header>
            <div className="mt-2 2xl:mt-3 mx-0 sm:mx-3">{children}</div>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  boxProps: PropTypes.object,
};
