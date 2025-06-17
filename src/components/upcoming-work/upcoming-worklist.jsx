import React from "react";
import { useAxios } from "../../lib/hooks";
import { Button, Skeleton } from "@mui/material";
import useSWR from "swr";
import { useToast } from "../../lib/store";

const CateringWorkListWithRequest = () => {
  const axios = useAxios();
  const { setToast } = useToast();

  const { data: works, isLoading: isLoadingWorks } = useSWR(
    "/user/admin/catering-work/create/"
  );

  const {
    data: requestedWorks,
    isLoading: isLoadingRequested,
    mutate: requestMutate,
  } = useSWR("/user/user/work-interests/");

  const handleRequest = async (id) => {
    try {
      await axios.post("/user/work-interest/submit/", {
        work_assignment: id,
      });
      setToast({
        message: "Request submitted successfully!",
        type: "success",
        open: true,
      });
      requestMutate();
    } catch (error) {
      console.error("Request submission failed", error);
      setToast({
        message: "Request submitted successfully!",
        type: "error",
        open: true,
      });
    }
  };

  const isRequested = (id) => {
    return requestedWorks?.some((item) => item["id"] === id);
  };

  if (isLoadingWorks || isLoadingRequested)
    return (
      <div className="min-h-[200px] text-center flex flex-col gap-2 p-2">
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="rectangular" height={100} />
      </div>
    );

  return (
    <div className="grid grid-col-1 md:grid-cols-2 gap-4">
      {works?.map((work) => {
        const alreadyRequested = isRequested(work.id);

        return (
          <div
            key={work.id}
            className="rounded-xl border p-4 shadow-sm bg-white mb-4 w-full"
          >
            <h2 className="text-xl font-bold">{work.event_name}</h2>
            <p className="text-gray-700">{work.description}</p>
            <p className="text-sm text-gray-500">
              Date: {new Date(work.event_date).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Type: {work.event_type}</p>
            <div className="mb-4">
              <h3 className="font-semibold text-sm text-gray-800 mb-1">
                Requirements
              </h3>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>
                  Grooming Standard: {work.grooming_standard ? "Yes" : "No"}
                </li>
                <li>White Shirt: {work.white_shirt ? "Yes" : "No"}</li>
                <li>Black Pant: {work.black_pant ? "Yes" : "No"}</li>
                <li>
                  Executive Black Shoe:{" "}
                  {work.executive_black_shoe ? "Yes" : "No"}
                </li>
              </ul>
            </div>
            <Button
              onClick={() => handleRequest(work.id)}
              variant="contained"
              size="small"
              className="mt-5 left-2"
              disabled={alreadyRequested}
            >
              {alreadyRequested ? "Requested" : "Request"}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default CateringWorkListWithRequest;
