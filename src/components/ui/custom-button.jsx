import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

let isSubmitting = false;

export const CustomButton = ({ onClick, type, children, ...props }) => {
  const handleClick = (event) => {
    if (type === "submit") {
      if (isSubmitting) return;
      isSubmitting = true;

      try {
        const form = event.target.closest("form");
        if (form) {
          const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
          });
          form.dispatchEvent(submitEvent);
        }
      } finally {
        setTimeout(() => {
          isSubmitting = false;
        }, 2000);
      }
    }
    if (onClick) onClick(event);
  };

  return (
    <StyledButton {...props} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)(({ variant }) => ({
  borderRadius: "0.35rem",
  textTransform: "none",
  whiteSpace: "nowrap",

}));
