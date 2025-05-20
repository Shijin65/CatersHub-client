import { useNavigate } from "react-router-dom";
import BasicTable from "../../table";
import { Skeleton } from "@mui/material";
import useSWR from "swr";
import ErrorCard from "../../error/error-card";
import { CustomModal as Modal } from "../../ui/modal";
import SupervisorRemove from "./supervisor-remove";
import { useState } from "react";

const columns = [
  {
    title: "ID",
    id: "id",
  },
  {
    title: "Name",
    id: "name",
  },
  {
    title: "Email",
    id: "email",
  },
  {
    title: "Role",
    id: "role",
  },
  {
    title: "Status",
    id: "status",
  },
];

const SupervisorTable = () => {
  const {
    data: staffData,
    error,
    isLoading,
    mutate,
  } = useSWR("/user/admin/supervisors/");

  const [open, setOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ type: "", id: null });

  const navigate = useNavigate();

  const handleRemove = (id) => {
    setModalInfo({ type: "remove", id });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalInfo({ type: "", id: null });
  };

  const parsedRow = staffData?.map((row) => ({
    id: row.id,
    name: row.user_name ?? "-",
    email: row.email,
    role: row.role,
    status: row.is_active,
  }));

  if (error) {
    return (
      <ErrorCard
        title="An Error occurred"
        description="You have a connection error. Please log in again."
        showRetryButton={true}
        retryLabel="Reauthenticate"
        onRetry={() => {
          console.log("Retry clicked");
        }}
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
          navigate(`/supervisors/${id}/view`);
        }}
        canRemove={true}
        handleRemove={handleRemove}
      />
      <Modal
        isOpen={open}
        size="small"
        handleClose={handleClose}
        title="Remove Supervisor"
      >
        <SupervisorRemove
          handleClose={handleClose}
          id={modalInfo.id}
          mutate={mutate}
        />
      </Modal>
    </>
  );
};

export default SupervisorTable;
