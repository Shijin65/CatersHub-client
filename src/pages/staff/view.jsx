import React from "react";
import { Button } from "@mui/material";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import UserView from "../../components/user/user-view";

const StaffViewPage = () => {
  const navigate = useNavigate();
  return (
    <div className="m-4 p-2 bg-gray-100 rounded-xl shadow-xl">
      <div className="flex items-center justify-between border-b-2 border-b-gray-300">
        <header className="sm:text-md 2xl:text-lg font-semibold px-0 flex gap-2 items-center h-10 mt-2">
          <div className="bg-px-[3px] py-[10px] max-h-5"></div>
          <h1 className="text-black/80 page-title text-[16px] xl:text-[18px] 2xl:text-[18px] font-semibold">
            STAFF DETAILS
          </h1>
        </header>

        <div className="text-gray-500 gap-3 items-center hidden sm:block ml-auto">
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(-1)}
            color="gray"
            startIcon={<ArrowUturnLeftIcon className="w-5 h-5" />}
          >
            Back
          </Button>
        </div>
      </div>
      <div>
        <UserView />
      </div>
    </div>
  );
};

export default StaffViewPage;
