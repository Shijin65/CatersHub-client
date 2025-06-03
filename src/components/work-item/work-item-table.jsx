import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import BasicTable from "../table";
import { useAxios } from "../../lib/hooks";
import { useToast } from "../../lib/store";
import { Skeleton } from "@mui/material";
import useSWR from "swr";
import { CustomModal as Modal } from "../ui/modal";
import WorkItemView from "./work-item-view";
import WorkItemAssign from "./work-item-assign";

const columns = [
  {
    title: "ID",
    id: "id",
  },
  {
    title: "Event Name",
    id: "eventName",
  },
  {
    title: "Event Type",
    id: "eventType",
  },
  {
    title: "Event Date",
    id: "eventDate",
  },
];

const WorkItemTable = () => {
  ``;
  const navigate = useNavigate();
  const { setToast } = useToast();
  const axios = useAxios();
  const [openModal, setOpenModal] = useState(false);
  const [workId, setWorkId] = useState(null);

  const {
    data: workItems,
    error,
    isLoading,
    mutate,
  } = useSWR("/user/admin/catering-work/create/");

  const handleAssign = async (id) => {
setWorkId(id)
setOpenModal(true)
    try {
      // const res = await axios.post("/user/approve-user/", {
      //   email: row.email,
      // });
      // if (res.status === 200) {
      //   setToast({
      //     message: "supervisor approved successfully.",
      //     type: "success",
      //     open: true,
      //   });
      //   mutate();
      // }
    } catch (error) {
      setToast({
        message: error.response?.data?.error || "Failed to approve user.",
        type: "error",
        open: true,
      });
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(`/user/admin/catering-work/update/${id}/`);
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
        message: error.response?.data?.error || "Failed to delete work.",
        type: "error",
        open: true,
      });
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const parsedRow = workItems?.map((row) => ({
    id: row.id,
    eventName: row.event_name,
    eventType: row.event_type,
    eventDate: row.event_date,
  }));

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
        handleView={(id) => {
          navigate(`/work-item/${id}/view`);
        }}
      />
      <Modal isOpen={openModal} handleClose={handleClose} title="Work Assign">
        <WorkItemAssign workId={workId} handleClose={handleClose} />
      </Modal>
    </div>
  );
};

export default WorkItemTable;
