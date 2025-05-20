import { CircularProgress } from "@mui/material";

export const MainLoader = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
    >
      <CircularProgress />
    </div>
  );
};
