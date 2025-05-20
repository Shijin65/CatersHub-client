import React from "react";
import { IdentificationIcon } from "@heroicons/react/24/outline";

import DeleteForm from "../../ui/delete-form";
import { useAxios } from "../../../lib/hooks";
import { useToast } from "../../../lib/store";

const StaffRemove = ({ id, handleClose, mutate }) => {
  const api = useAxios();
  const { setToast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await api.delete(`/user/admin/user/${id}/`);
      if (response.status === 204) {
        mutate();
        handleClose();
        setToast({
          message: "staff Removed successfully.",
          type: "success",
          open: true,
        });
      }
    } catch (error) {
      setToast({
        message:
          error?.response?.data?.message || "Failed to Remove Staff.",
        type: "error",
        open: true,
      });
    }
  }
  return (
    <DeleteForm
      icon={<IdentificationIcon className="w-12 h-12 text-red-600" />}
      title="Removing Staff?"
      subtitle="Warning: Permanent Removal of Staff."
      buttonLabels={["Remove", "Cancel"]}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
    />
  );
};

export default StaffRemove;
