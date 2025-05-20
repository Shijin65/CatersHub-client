import React from "react";
import { Button } from "@mui/material";
import { ArrowUturnLeftIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import WorkItemTable from "../../components/work-item/work-item-table";
import AssignedWorkTable from "../../components/assigned-work/assigned-work-table";

const AssignedWorks = () => {
  const navigate = useNavigate();
  return (
    <div className="m-2 p-2 bg-gray-300 rounded-md">
      <div className="flex items-center justify-between">
        <header className="sm:text-md 2xl:text-lg font-semibold px-0 flex gap-2 items-center h-10 mt-2">
          <div className="bg-px-[3px] py-[10px] max-h-5"></div>
          <h1 className="text-black/80 page-title text-[16px] xl:text-[16px] 2xl:text-[18px] font-semibold">
            Assigned Works
          </h1>
        </header>
      </div>
      <div>
        <AssignedWorkTable />
      </div>
    </div>
  );
};

export default AssignedWorks;
