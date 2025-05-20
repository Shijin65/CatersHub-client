import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "hsl(39, 69%, 57%)",
      light: "hsl(39, 85%, 70%)",
      dark: "hsl(39, 85%, 35%)",
      contrastText: "#ffffff",
    },
    background: { default: "#ffffff", paper: "#f5f5f5" },
    text: { primary: "#000000" },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1e90ff" },
    background: { default: "#181818", paper: "#1c1c1c" },
    text: { primary: "#ffffff" },
  },
});
