import { useNavigate } from "react-router-dom";
import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button, Typography } from "@mui/material";

export function ErrorSection() {
  const navigate = useNavigate();
  return (
    <div className="h-[90%] flex flex-col justify-center items-center text-center px-8 gap-2">
      <WarningAmberIcon className="w-20 h-20 mx-auto" />

      <Typography variant="h6" color="blue-gray" className="mt-6 text-2xl  ">
        Error 404 <br /> It looks like something went wrong.
      </Typography>
      <Typography className="my-6  text-lg text-gray-500">
        Don&apos;t worry, our team is already on it. Please try refreshing the
        page or come back later.
      </Typography>
      <Button
        onClick={() => navigate(-1)}
        color="primary"
        variant="contained"
        className=" w-full md:w-32"
      >
        Back Home
      </Button>
    </div>
  );
}

export default ErrorSection;
