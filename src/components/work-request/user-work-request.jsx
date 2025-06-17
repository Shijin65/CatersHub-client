import React from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import useSWR from "swr";
import { useAxios } from "../../lib/hooks";

const UserWorkRequestList = () => {
  const axios = useAxios();
  const navigate = useNavigate();

  const {
    data: requests,
    error,
    isLoading,
  } = useSWR("/user/work-interest/requests/");

  if (isLoading)
    return (
      <div className="min-h-[200px] text-center flex flex-col gap-2 p-2">
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="rectangular" height={100} />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600">Failed to load requests.</div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {requests.map((req) => {
        const work = req.work_assignment;
        return (
          <div
            key={req.id}
            className="rounded-xl border p-4 shadow-sm bg-white mb-4 w-full"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Requested by: <span className="text-[var(--primary-gold)]">{req.name}</span>
            </h2>
            <p className="text-sm mt-2">
              <span className="font-medium">Event:</span>{" "}
              <span
                className="text-blue-700 hover:underline cursor-pointer"
                onClick={() => navigate(`/work-item/${work.id}/view`)}
              >
                {work.event_name}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Type:</span> {work.event_type}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Date:</span>{" "}
              {new Date(work.event_date).toLocaleDateString()}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default UserWorkRequestList;
