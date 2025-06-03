import React, { useState } from "react";
import { Skeleton } from "@mui/material";
import useSWR from "swr";
import { CustomModal as Modal } from "../ui/modal";
import { useToast, useUserStore } from "../../lib/store";
import { useAxios } from "../../lib/hooks";

const UserAssignedWorkTable = () => {
  const { setToast } = useToast();
  const axios = useAxios();
  const user = useUserStore((state) => state.user);

  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const {
    data: assignedWorks,
    isLoading,
    mutate,
  } = useSWR("user/staff/assigned-works/");

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleView = (id) => {
    const row = assignedWorks.find((item) => item.id === id);
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleDecision = async (status) => {
    if (!selectedRow) return;

    const id = selectedRow.id;
    const endpoint =
      user.role === "supervisor"
        ? `/user/work-assign/${id}/supervisor-status/`
        : `/user/work-assign/${id}/staff-status/`;

    try {
      const res = await axios.patch(endpoint, { status }); // status: "approved"/"denied"
      if (res.status === 200) {
        setToast({
          message: `Work ${status} successfully.`,
          type: "success",
          open: true,
        });
        mutate();
        setOpenModal(false);
      }
    } catch (error) {
      setToast({
        message: error?.response?.data?.error || "Failed to update status",
        type: "error",
        open: true,
      });
    }
  };

  if (isLoading)
    return (
      <div className="p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={100} />
        ))}
      </div>
    );

  if (!isLoading && assignedWorks?.length === 0)
    return (
      <div className="p-4 space-y-4 text-center text-gray-600">
        <p>This user currently has no assigned work.</p>
      </div>
    );

  return (
    <div>
      <div className="grid gap-4 p-4 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full">
        {assignedWorks?.map((work) => (
          <div
            key={work.id}
            className="w-full max-w-sm  p-4 rounded-md shadow hover:shadow-md border-2 border-gray-300  transition cursor-pointer "
            onClick={() => handleView(work.id)}
          >
            <h2 className="font-semibold text-lg">{work.title}</h2>
            <p className="text-sm text-gray-600">Deadline: {work.deadline}</p>
            <p className="text-sm text-gray-600">
              Supervisor: {work.supervisor_name}
            </p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={openModal}
        handleClose={handleClose}
        title="Assigned Work Details"
      >
        {selectedRow && (
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{selectedRow.title}</h2>
            <p>
              <strong>Description:</strong> {selectedRow.description}
            </p>
            <p>
              <strong>Deadline:</strong> {selectedRow.deadline}
            </p>
            <p>
              <strong>Created At:</strong> {selectedRow.created_at}
            </p>
            <p>
              <strong>Supervisor:</strong> {selectedRow.supervisor_name}
            </p>

            <div className="mt-2">
              <h3 className="font-medium">Staff Members:</h3>
              <ul className="list-disc pl-5 text-sm">
                {selectedRow.staff_members?.map((member) => (
                  <li key={member.id}>
                    {member.name} –{" "}
                    <span className="italic">{member.status}</span>
                  </li>
                )) ?? <p className="text-gray-500">No staff members</p>}
              </ul>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleDecision("accepted")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleDecision("rejected")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserAssignedWorkTable;
