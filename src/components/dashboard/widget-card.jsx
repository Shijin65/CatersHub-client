import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { CircularProgress } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const WidgetCard = ({ icon, title, value, path, color, isLoading }) => {
  const navigate = useNavigate();

  return (
    <div className={`rounded-2xl p-4 shadow-md text-white ${color} h-32`}>
      <div className="flex justify-between items-center">
        <div>
          <div>{icon}</div>
          <div className="mt-4 text-sm">{title}</div>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <div className="text-2xl font-bold">{value}</div>
          )}
        </div>
        <div className={`${color}`}>
          <ChevronDoubleRightIcon
            onClick={() => navigate(path || null)}
            className="w-6 h-6 hover:text-2xl hover:text-neutral-700"
          />
        </div>
      </div>
    </div>
  );
};

export default WidgetCard;
