import React, { useEffect, useState } from "react";
import BasicTable from "../../table";
import { useAxios } from "../../../lib/hooks";
import { useToast } from "../../../lib/store";
import { Skeleton } from "@mui/material";
import useSWR from "swr";
import { CustomModal as Modal } from "../../ui/modal";
import StaffRemove from "./staff-remove";
import ErrorCard from "../../error/error-card";
import { useNavigate } from "react-router-dom";

const columns = [
  { title: "ID", id: "id" },
  { title: "Name", id: "name" },
  { title: "Email", id: "email" },
  // { title: "Role", id: "role" },
  { title: "Status", id: "status" },
];

const StaffTable = () => {
  const { setToast } = useToast();
  const [open, setOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ type: "", id: null });

  const {
    data: staffData,
    error,
    isLoading,
    mutate,
  } = useSWR("/user/admin/staff/");

  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false);
    setModalInfo({ type: "", id: null });
  };

  const handleRemove = (id) => {
    setModalInfo({ type: "remove", id });
    setOpen(true);
  };

  const parsedRow = staffData?.map((row) => ({
    id: row.id,
    name: row.user_name ?? "-",
    email: row.email,
    status: row.is_active,
    approveStatus: row.is_approved,
  }));

  if (error) {
    return (
      <ErrorCard
        title="An Error occurred"
        description="You have a connection error. Please log in again."
        showRetryButton={true}
        retryLabel="Reauthenticate"
      />
    );
  }

  if (isLoading)
    return (
      <div className="min-h-[200px] text-center flex flex-col gap-2 p-2">
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="rectangular" height={100} />
      </div>
    );

  return (
    <>
      <BasicTable
        rows={parsedRow}
        columns={columns}
        canView={true}
        handleView={(id) => {
          navigate(`/staff/${id}/view`);
        }}
        canRemove={true}
        handleRemove={handleRemove}
      />
      <Modal
        isOpen={open}
        size="small"
        handleClose={handleClose}
        title="Remove Staff"
      >
        <StaffRemove
          handleClose={handleClose}
          id={modalInfo.id}
          mutate={mutate}
        />
      </Modal>
    </>
  );
};

export default StaffTable;
