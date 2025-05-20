import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const BasicLayout = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="m-2 p-2 bg-gray-200 rounded-md">
      <div className="flex items-center justify-between">
        <header className="sm:text-md 2xl:text-lg font-semibold flex gap-2 items-center h-10 mt-2">
          {/* Decorative or spacer element if needed */}
          <div className="px-[3px] py-[10px] max-h-5"></div>

          <h1 className="text-black/80 text-[16px] xl:text-[16px] 2xl:text-[18px] font-semibold">
            {title}
          </h1>
        </header>

        <div className="text-gray-500 gap-3 items-center hidden sm:flex ml-auto">
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(-1)}
            color="inherit"
            startIcon={<ArrowUturnLeftIcon className="w-5 h-5" />}
          >
            Back
          </Button>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default BasicLayout;
