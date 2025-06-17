import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import BasicTable from "../table";
import { useAxios } from "../../lib/hooks";
import { useToast } from "../../lib/store";
import { Skeleton } from "@mui/material";
import useSWR from "swr";
import { CustomModal as Modal } from "../ui/modal";
import WorkItemAssignView from "./assigned-work-view";
// import { CustomModal as Modal } from "../ui/modal";
// import WorkItemView from "./work-item-view";

const columns = [
  {
    title: "ID",
    id: "id",
  },
  {
    title: "Title",
    id: "title",
  },
  {
    title: "Deadline",
    id: "deadline",
  },
  {
    title: "Created At",
    id: "created_at",
  },
];

const AssignedWorkTable = () => {
  const navigate = useNavigate();
  const { setToast } = useToast();
  const axios = useAxios();

  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClose = () => {
    setOpenModal(false);
  };

  const {
    data: assignedWorks,
    error,
    isLoading,
    mutate,
  } = useSWR("/user/admin/assign-work/list/");

  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(`/user/work-assignments/${id}/`);
      if (res.status === 204) {
        setToast({
          message: "Work deleted successfully.",
          type: "success",
          open: true,
        });
        mutate();
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.error || "Failed to delete Assignment.",
        type: "error",
        open: true,
      });
    }
  };

  const parsedRow = assignedWorks?.map((row) => ({
    id: row.id,
    title: row.title,
    deadline: row.deadline,
    created_at: row.created_at,
  }));

  const handleView = (id) => {
    const row = assignedWorks.find((item) => item.id === id);
    setSelectedRow(row);
    setOpenModal(true);
  };

  if (isLoading)
    return (
      <div className="min-h-[200px] text-center flex flex-col gap-2 p-2">
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="rectangular" height={100} />
      </div>
    );

  return (
    <div>
      <BasicTable
        rows={parsedRow}
        columns={columns}
        canView={true}
        canRemove={true}
        handleRemove={handleRemove}
        handleView={handleView}
      />
      <div>
        <Modal
          isOpen={openModal}
          handleClose={handleClose}
          title="Assigned Work Details"
        >
          <WorkItemAssignView data={selectedRow} handleClose={handleClose} />
        </Modal>
      </div>
    </div>
  );
};

export default AssignedWorkTable;
