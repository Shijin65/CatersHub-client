import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { CustomButton, GlobalLoader } from "../ui";
import { PencilIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Button, Chip } from "@mui/material";
import { useUserStore } from "../../lib/store";
import { useAxios } from "../../lib/hooks";
import { CustomModal as Modal } from "../ui/modal";
import WorkItemAssign from "../work-item/work-item-assign";
import { Assignment } from "@mui/icons-material";
import ErrorCard from "../error/error-card";

const fetcher = (axios) => (url) => axios.get(url).then((res) => res.data);

const statusColorMap = {
  accepted: "success",
  pending: "warning",
  rejected: "error",
};

const WorkItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();
  const user = useUserStore((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [assignment, setAssignment] = useState(null);
  const [assignmentLoading, setAssignmentLoading] = useState(true);

  // SWR Fetching
  const {
    data: work,
    error: workError,
    isLoading: workLoading,
    mutate: mutateWork,
  } = useSWR(`/user/admin/catering-work/update/${id}/`);

  const handleEdit = () => {
    navigate(`/work-item/${id}/edit`);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await axios.get(`/user/work-assignments/${id}/`);
        setAssignment(res.data);
      } catch (err) {
       console.log(err)
      } finally {
        setAssignmentLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);
console.log(assignment)
  if (workLoading || assignmentLoading) return <GlobalLoader loading />;
  if (workError)
    return (
      <p className="p-4 text-red-500">
        Error loading data. Please try again later.
      </p>
    );
  if (!work) return <p className="p-4 text-red-500"><ErrorCard/></p>;

  return (
    <div className="max-w-full md:max-w-[80%] mx-auto p-6 bg-gray-100 shadow rounded-2xl space-y-6">
      <header className="border-b pb-4 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl font-bold">Work Item Details</h1>
          <div className="text-gray-500 gap-3 items-center hidden sm:block ml-auto">
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate(-1)}
              startIcon={<ArrowUturnLeftIcon className="w-5 h-5" />}
            >
              Back
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-lg">
        <div>
          Event Name :
          <span className="text-lg font-semibold text-[var(--primary-gold)] ms-2 capitalize">
            {work.event_name}
          </span>
        </div>
        <span className="text-sm text-green-600 mt-1 md:mt-0">
          {work.event_date}
        </span>
      </div>

      {/* Details */}
      <Section title="Details">
        <Detail label="Event Type" value={work.event_type} />
        <Detail label="Event Date" value={work.event_date} />
        <Detail label="Staff Required" value={work.staff_required} />
        <Detail label="Additional Notes" value={work.additional_notes || "-"} />
        <Detail label="Created At" value={work.created_at} />
        <Detail label="Updated At" value={work.updated_at} />
      </Section>

      {/* Contact */}
      <Section title="Contact">
        <Detail label="Contact Person" value={work.contact_person} />
        <Detail label="Contact Number" value={work.contact_number} />
        <Detail label="Location" value={work.location} />
      </Section>

      {/* Requirements */}
      <Section title="Requirements">
        <Detail
          label="Grooming Standard"
          value={work.grooming_standard ? "Yes" : "No"}
        />
        <Detail label="White Shirt" value={work.white_shirt ? "Yes" : "No"} />
        <Detail label="Black Pant" value={work.black_pant ? "Yes" : "No"} />
        <Detail
          label="Executive Black Shoe"
          value={work.executive_black_shoe ? "Yes" : "No"}
        />
      </Section>

      {/* Assigned Staff & Supervisor */}
      <Section title="Assigned Staff & Supervisor">
        {/* Supervisor */}
        {assignment?.supervisor ? (
          <div className="col-span-2">
            <p className="text-sm text-gray-500 mb-1">Supervisor</p>
            <div className="flex items-center gap-2">
              <span className="text-base text-gray-800">
                {assignment.supervisor}
              </span>
              {assignment.supervisor_status && (
                <Chip
                  label={assignment.supervisor_status}
                  color={
                    statusColorMap[assignment.supervisor_status] || "default"
                  }
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                />
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No supervisor assigned.</p>
        )}

        {/* Staff */}
        {assignment?.staff_members?.length > 0 ? (
          <div className="col-span-2">
            <p className="text-sm text-gray-500 mb-1">Staff Members</p>
            <div className="flex flex-wrap gap-2">
              {assignment.staff_members.map((staff) => (
                <Chip
                  key={staff.id}
                  label={`${staff.name} (${staff.status})`}
                  color={statusColorMap[staff.status] || "default"}
                  size="small"
                  sx={{ textTransform: "capitalize", fontSize: "0.75rem" }}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No staff assigned.</p>
        )}

        <div className="col-span-2 text-end pt-4">
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            {assignment ? "Edit Assignment" : "Assign work"}
          </Button>
        </div>
      </Section>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        {user?.role === "admin" && (
          <CustomButton
            onClick={handleEdit}
            variant="contained"
            size="small"
            color="primary"
            startIcon={<PencilIcon className="w-4 h-4" />}
          >
            Edit
          </CustomButton>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={openModal} handleClose={handleClose} title="Assign Supervisor & Staff">
        <WorkItemAssign workId={id} handleClose={handleClose} mutateWork={mutateWork} />
      </Modal>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="bg-gray-50 p-4 rounded-lg shadow-sm">
    <h2 className="text-lg font-semibold mb-3 text-gray-700">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
      {children}
    </div>
  </section>
);

const Detail = ({ label, value }) => (
  <div className="flex justify-between text-gray-800">
    <span className=" text-black font-[500]">{label}:</span>
    <span className="text-right">{value}</span>
  </div>
);

export default WorkItemPage;
