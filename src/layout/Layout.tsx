import { type ReactNode } from "react";
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
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 3, pb: 4 }}>
        <Grid container spacing={3}>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <LeftSidebar />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <main>{children}</main>
          </Grid>

          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            <Box
              sx={{
                position: "sticky",
                top: "80px",
                bgcolor: "background.paper",
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                News
              </Typography>
              <ul style={{ paddingLeft: 20, margin: 0, fontSize: "14px" }}>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>React 19 Released</strong>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      Top news • 10,934 readers
                    </Typography>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Tech Hiring Trends</strong>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      Hiring • 5,211 readers
                    </Typography>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Redux Toolkit Updates</strong>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      Tech • 2,099 readers
                    </Typography>
                  </Typography>
                </li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
