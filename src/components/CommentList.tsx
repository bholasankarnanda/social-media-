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

import {
  addComment,
  deleteComment,
  selectCommentsByPost, // <-- optimized selector
} from "../features/Comments/CommentSlice";

import type { AppDispatch } from "../store/store";

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState("");

  // ✅ Optimized memoized selector (no warn, no rerenders)
  const comments = useSelector(selectCommentsByPost(postId));

  // Add comment
  const handleAddComment = (): void => {
    if (!text.trim()) return;
    dispatch(addComment({ postId, text }));
    setText("");
  };

  // Delete comment
  const handleDeleteComment = (id: string): void => {
    dispatch(deleteComment({ postId, id }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Input */}
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

      {/* Comment List */}
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
              {/* User Name */}
              <Typography variant="subtitle2">Pavan</Typography>

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

        {/* No comments message */}
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
