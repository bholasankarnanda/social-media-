import { useMemo } from "react";
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

// Wrapper component to access Redux state for Theme
const ThemeWrapper = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);

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
            <Typography variant="h6">Post Title</Typography>
            <Typography variant="body2" color="text.secondary">
              This area is the "children" prop of the Layout. Infinite scroll
              list will render here.
            </Typography>
          </CardContent>
        </Card>
      </Layout>
    </ThemeProvider>
  );
};

// Main App Component
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeWrapper />
      </PersistGate>
    </Provider>
  );
};

export default App;
