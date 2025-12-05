import React, { useMemo } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import type { RootState } from "./store/store";

import { createAppTheme } from "./theme/theme";
import Layout from "./layout/Layout";
import ShowPost from "./components/ShowPost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPost from "./components/AddPost";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

// Wrapper component to access Redux state for Theme
const ThemeWrapper = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const navigate = useNavigate();

  // Memoize theme creation so it only runs when mode changes
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        {/* --- THIS IS THE CENTER FEED SECTION --- */}
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
              onClick={() => navigate("/add-post")}
              sx={{
                flexGrow: 1,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                pl: 2,
                cursor: "pointer",
                "&:hover": { bgcolor: "action.hover" },
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

        <Card>
          <CardContent>
            <ShowPost />
          </CardContent>
        </Card>
        {/* allow /add-post to appear as modal */}
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
};

// Main App Component
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* wrapping for achieving routing */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ThemeWrapper />}>
              <Route path="add-post" element={<AddPost />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
