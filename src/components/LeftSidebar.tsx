import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function LeftSidebar() {
  return (
    <Box sx={{ position: "sticky", top: "70px" }}>
      <Card sx={{ overflow: "hidden" }}>
        {/* Banner Image */}
        <Box sx={{ height: 60, bgcolor: "#A0B4B7" }} />

        <CardContent sx={{ textAlign: "center", mt: -4 }}>
          <Avatar
            sx={{
              width: 72,
              height: 72,
              border: "3px solid white",
              margin: "0 auto",
              bgcolor: "primary.main",
            }}
          >
            Name of user
          </Avatar>

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            XYZ
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Frontend Developer | Backend developer(write bio)
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              Profile viewers
            </Typography>
            <Typography variant="body2" color="primary" fontWeight={600}>
              1,245
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              Post Like
            </Typography>
            <Typography variant="body2" color="primary" fontWeight={600}>
              8,210
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <BookmarkIcon color="action" fontSize="small" />
            <Typography variant="body2" fontWeight={600}>
              Saved items
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
