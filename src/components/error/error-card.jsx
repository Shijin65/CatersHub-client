import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button, Typography } from "@mui/material";
import { useUserStore } from "../../lib/store";

function ErrorCard({
  title = "Something went wrong.",
  description = "Please try again later or contact support.",
  showRetryButton = false,
  retryLabel = "Reauthenticate",
}) {
      const removeUser = useUserStore((state) => state.removeUser);
    
  return (
    <div className="h-[90%] flex flex-col justify-center items-center text-center px-8 gap-2">
      <WarningAmberIcon className="w-20 h-20 text-yellow-500" />
      <Typography variant="h6" className="mt-6 text-2xl">
        {title}
      </Typography>
      <Typography className="my-6 text-lg text-gray-500">
        {description}
      </Typography>
      {showRetryButton && (
        <Button
          onClick={async () => await removeUser()}
          color="primary"
          variant="contained"
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

export default ErrorCard;
