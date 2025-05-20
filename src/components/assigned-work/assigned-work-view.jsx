import React from "react";
import { Chip } from "@mui/material";
import { CustomButton } from "../ui";

const statusColorMap = {
  accepted: "success",
  pending: "warning",
  rejected: "error",
};

const WorkItemAssignView = ({ data, handleClose }) => {
  if (!data) return null;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-5">
      {/* Title */}
      <div>
        <p className="text-sm text-gray-500 ">Work Item Title</p>
        <p className="text-base font-semibold text-gray-800">{data.title}</p>
      </div>

      {/* Description */}
      <div>
        <p className="text-sm text-gray-500">Description</p>
        <p className="text-base text-gray-800 whitespace-pre-wrap">{data.description}</p>
      </div>

      {/* Deadline */}
      <div>
        <p className="text-sm text-gray-500">Deadline</p>
        <p className="text-base text-gray-800">{data.deadline}</p>
      </div>

      {/* Created At */}
      <div>
        <p className="text-sm text-gray-500">Created On</p>
        <p className="text-base text-gray-800">{data.created_at}</p>
      </div>

      {/* Supervisor */}
      <div>
        <p className="text-sm text-gray-500 mb-1">Supervisor</p>
        <div className="flex items-center gap-2">
          <span className="text-base text-gray-800">{data.supervisor_name || "N/A"}</span>
          {data.supervisor_status && (
            <Chip
              label={data.supervisor_status}
              color={statusColorMap[data.supervisor_status] || "default"}
              size="small"
              sx={{ textTransform: "capitalize" }}
            />
          )}
        </div>
      </div>

      {/* Staff Members */}
      <div>
        <p className="text-sm text-gray-500 mb-1">Staff Members</p>
        {data.staff_members?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.staff_members.map((staff) => (
              <Chip
                key={staff.id}
                label={`${staff.name} (${staff.status})`}
                color={statusColorMap[staff.status] || "default"}
                size="small"
                sx={{ textTransform: "capitalize", fontSize: "0.75rem" }}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No staff assigned.</p>
        )}
      </div>

      {/* Close Button */}
      <div className="flex justify-end pt-4">
        <CustomButton onClick={handleClose} variant="outlined" color="primary">
          Close
        </CustomButton>
      </div>
    </div>
  );
};

export default WorkItemAssignView;
