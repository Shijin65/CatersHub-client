import React from "react";
import UserAssignedWorkTable from "../components/user-assigned-works/user-assigned-work-table";

const UserAssignedWorks = () => {
  return (
    <div className="m-2 p-2 bg-gray-100 rounded-md">
      <div className="flex items-center justify-between border-b-2 border-b-gray-300 mb-4">
        <header className="sm:text-md 2xl:text-lg font-semibold px-0 flex gap-2 items-center h-10 mt-2">
          <div className="bg-px-[3px] py-[10px] max-h-5"></div>
          <h1 className="text-black/80 page-title text-[16px] xl:text-[16px] 2xl:text-[18px] font-semibold">
            ASSIGNED WORKS
          </h1>
        </header>
      </div>
      <div>
        <UserAssignedWorkTable />
      </div>
    </div>
  );
};

export default UserAssignedWorks;
