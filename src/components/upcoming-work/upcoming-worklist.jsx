import React, { useEffect, useState } from "react";
import { useAxios } from "../../lib/hooks";

const UpcomingWorks = () => {
  const axios = useAxios();

  const [assignments, setAssignments] = useState([]);
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const { data } = await axios.get(`/user/work-assignment/upcoming/`);
        setAssignments(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch assignments", error);
      }
    };

    fetchAssignment();
  }, []);

  const handleStatusChange = (assignmentId, newStatus) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [assignmentId]: newStatus,
    }));
  };

  const isUserAssigned = (assignment) => {
    return assignment.supervisor_id === user?.id;
  };

  return (
    <div>
      { assignments?.map((assignment) => (
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
            Created: {new Date(assignment.created_at).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Supervisor: {assignment.supervisor_name || "Not Assigned"}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="font-medium">
              Status:{" "}
              <span className="capitalize">
                {statuses[assignment.id] || "pending"}
              </span>
            </span>

            <button
              className="px-3 py-1 bg-green-500 text-white rounded-md"
              onClick={() => handleStatusChange(assignment.id, "accepted")}
            >
              Accept
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-md"
              onClick={() => handleStatusChange(assignment.id, "denied")}
            >
              Deny
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingWorks;
