import {
  ThemeProvider,
  CssBaseline,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { appTheme } from "./theme/theme";
import Layout from "./layout/Layout";
const App = () => {
  return (
    // <Provider store={store}>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Layout>
        {/* --- THIS IS THE CENTER FEED SECTION --- */}

        {/* 1. "Start a Post" Input Box */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "grey.300",
              }}
            />
            <Box
              sx={{
                flexGrow: 1,
                border: "1px solid #ccc",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                pl: 2,
                cursor: "pointer",
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.secondary"
              >
                Start a post
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* 2. Example Feed Content (Your Redux Posts will go here) */}
        <Card>
          <CardContent>
            <Typography variant="h6">Post Title</Typography>
            <Typography variant="body2" color="text.secondary">
              This area is the "children" prop of the Layout. Your infinite
              scroll list will render here.
            </Typography>
          </CardContent>
        </Card>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
