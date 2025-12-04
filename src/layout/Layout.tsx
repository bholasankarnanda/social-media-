import { ReactNode } from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Navbar from "./Navbar";
import LeftSidebar from "../components/LeftSidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* 1. Navbar at the top */}
      <Navbar />

      {/* 2. Main Content Grid */}
      <Container maxWidth="lg" sx={{ mt: 3, pb: 4 }}>
        <Grid container spacing={3}>
          {/* Left Column: Profile */}
          {/* Hidden on Mobile (xs), Visible on Desktop (md), Width = 3 columns */}
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <LeftSidebar />
          </Grid>

          {/* Center Column: Feed */}
          {/* Full width (12) on Mobile, 6 columns on Desktop */}
          <Grid size={{ xs: 12, md: 6 }}>
            <main>{children}</main>
          </Grid>

          {/* Right Column: Widgets */}
          {/* Hidden on Tablet (md), Visible on Large Desktop (lg), Width = 3 columns */}
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            <Box
              sx={{
                position: "sticky",
                top: "70px",
                bgcolor: "white",
                p: 2,
                borderRadius: 2,
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                News
              </Typography>
              <ul style={{ paddingLeft: 20, margin: 0, fontSize: "14px" }}>
                <li>
                  <Typography variant="body2">React 19 Released</Typography>
                </li>
                <li>
                  <Typography variant="body2">Tech Hiring Trends</Typography>
                </li>
                <li>
                  <Typography variant="body2">Redux Toolkit Updates</Typography>
                </li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
