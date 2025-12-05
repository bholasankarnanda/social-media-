// CommentTestPage.tsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import CommentList from "./components/CommentList";

// // Temporary post ID for frontend-only testing
// const TEMP_POST_ID = "temp-post";

const CommentTestPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Comment Test Page
      </Typography>

      {/* Simulated post */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1">This is a test post</Typography>
        <Typography variant="body2" color="text.secondary">
          Post content goes here. Add and delete comments below.
        </Typography>
      </Paper>

      {/* Comment list for this post */}
      <CommentList />
    </Box>
  );
};

export default CommentTestPage;
