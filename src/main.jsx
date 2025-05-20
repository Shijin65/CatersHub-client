import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme/theme.js";
import { useThemeStore } from "./lib/store/themeStore.js";
import { BaseProvider } from "./lib/baseProvider.jsx";

function ThemeWrapper({ children }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    try {
      if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.setAttribute("data-mode", theme);
        document.documentElement.className = theme;
      }
    } catch (error) {
      console.log(error);
    }
  }, [theme]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BaseProvider>
        <ThemeWrapper>
          <App />
        </ThemeWrapper>
      </BaseProvider>
    </BrowserRouter>
  </StrictMode>
);
