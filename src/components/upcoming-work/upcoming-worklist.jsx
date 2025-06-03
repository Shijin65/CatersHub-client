import React, { useEffect, useState } from "react";
import { useAxios } from "../../lib/hooks";
import { Skeleton } from "@mui/material";

const UpcomingWorks = () => {
  const axios = useAxios();

  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const { data } = await axios.get(`/user/work-assignment/upcoming/`);
        setAssignments(data);
      } catch (error) {
        console.error("Failed to fetch assignments", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignment();
  }, []);

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
      {assignments?.map((assignment) => (
        <div
          key={assignment.id}
          className="rounded-xl border p-4 shadow-sm bg-white mb-4"
        >
          <h2 className="text-xl font-bold">{assignment.title}</h2>
          <p className="text-gray-700">{assignment.description}</p>
          <p className="text-sm text-gray-500">
            Deadline: {new Date(assignment.deadline).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Created: {assignment.created_at}
          </p>
          <p className="text-sm text-gray-500">
            Supervisor: {assignment.supervisor_name || "Not Assigned"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UpcomingWorks;
