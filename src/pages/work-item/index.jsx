import React from "react";
import { Button } from "@mui/material";
import { ArrowUturnLeftIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import WorkItemTable from "../../components/work-item/work-item-table";

const WorkItemPage = () => {
  const navigate = useNavigate();
  return (
    <div className="m-2 p-2 bg-gray-300 rounded-md">
      <div className="flex items-center justify-between">
        <header className="sm:text-md 2xl:text-lg font-semibold px-0 flex gap-2 items-center h-10 mt-2">
          <div className="bg-px-[3px] py-[10px] max-h-5"></div>
          <h1 className="text-black/80 page-title text-[16px] xl:text-[16px] 2xl:text-[18px] font-semibold">
            Catering Works
          </h1>
        </header>

        <div className="text-gray-500 gap-3 items-center hidden sm:block ml-auto">
          <Button
            size="small"
            variant="contained"
            onClick={() => navigate("/work-item/create")}
            color="primary"
            startIcon={<ClipboardDocumentIcon className="w-5 h-5" />}
          >
            Add Work
          </Button>
        </div>
      </div>
      <div>
        <WorkItemTable />
      </div>
    </div>
  );
};

export default WorkItemPage;
