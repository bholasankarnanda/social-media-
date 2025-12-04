import { createTheme, type PaletteMode } from "@mui/material";

export const createAppTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // LIGHT MODE COLORS
            primary: { main: "#0a66c2" },
            background: { default: "#F3F2EF", paper: "#FFFFFF" },
            text: { primary: "#191919", secondary: "#666666" },
          }
        : {
            // DARK MODE COLORS
            primary: { main: "#70b5f9" },
            background: { default: "#000000", paper: "#1D2226" },
            text: { primary: "#E8E6DF", secondary: "#BCBBBA" },
          }),
    },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      h6: {
        fontWeight: 600,
        fontSize: "1rem",
      },
      body1: {
        fontSize: "0.9rem",
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.08)",
            marginBottom: "16px",
            // Add a subtle border in dark mode
            border: mode === "dark" ? "1px solid #333" : "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#FFFFFF" : "#1D2226",
            color: mode === "light" ? "#666666" : "#E8E6DF",
            boxShadow: "none",
            borderBottom: `1px solid ${mode === "light" ? "#EBEBEB" : "#333"}`,
          },
        },
      },
    },
  });
};
