import React from "react";
import { useLoader, useToast } from "../lib/store/index";
import { GlobalLoader,GlobalToast} from "../components/ui";

const BaseProvider = ({ children }) => {
  const { loading } = useLoader();
  const { toast, closeToast } = useToast()
  return (
    <>
      <GlobalLoader loading={loading} />
      <GlobalToast open={toast.open} handleClose={closeToast} message={toast.message} type={toast.type} />
      {children}
    </>
  );
};

export { BaseProvider };
