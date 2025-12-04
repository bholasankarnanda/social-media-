import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0a66c2", // LinkedIn Blue color
    },
    background: {
      default: "#F3F2EF", // The classic light grey background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#191919",
      secondary: "#666666",
    },
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
      textTransform: "none", // Keeps buttons from being all-caps
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.08)", // Subtle border-like shadow
          marginBottom: "16px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#666666",
          boxShadow: "none",
          borderBottom: "1px solid #EBEBEB",
        },
      },
    },
  },
});
