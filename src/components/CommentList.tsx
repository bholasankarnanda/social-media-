// CommentList.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { addComment, deleteComment } from "../features/Comments/CommentSlice";
import type { RootState, AppDispatch } from "../store/store";
import type { Comment } from "../features/Comments/CommentSlice";

// Temporary post ID for frontend-only project
const TEMP_POST_ID = "temp-post";

// Simulated current user (for display only)
const CURRENT_USER = {
  username: "Sahil",
};

const CommentList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState("");

  // Select comments for the post
  const comments: Comment[] = useSelector((state: RootState) => {
    const ids = state.comments.idsByPost[TEMP_POST_ID] || [];
    return ids.map((id) => state.comments.byId[id]);
  });

  // Add comment
  const handleAddComment = () => {
    if (text.trim() === "") return;

    dispatch(addComment({ postId: TEMP_POST_ID, text }));
    setText("");
  };

  // Delete comment
  const handleDeleteComment = (id: string) => {
    dispatch(deleteComment({ postId: TEMP_POST_ID, id }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Input box */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddComment}>
          Post
        </Button>
      </Box>

      {/* Comments list */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {comments.map((comment) => (
          <Paper
            key={comment.id}
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              {/* Display simulated username */}
              <Typography variant="subtitle2">
                {CURRENT_USER.username}
              </Typography>
              <Typography variant="body2">{comment.text}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(comment.createdAt).toLocaleTimeString()}
              </Typography>
            </Box>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDeleteComment(comment.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Paper>
        ))}

        {comments.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No comments yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CommentList;
