import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../features/post/postSlice";
import type { RootState, AppDispatch } from "../store/store";
import type { Post } from "../features/post/postSlice";

import { Box, Card, Typography, Avatar, Stack, Divider } from "@mui/material";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CommentList from "../components/CommentList";
import { useState } from "react";

// ---------- Component ----------
const ShowPost: React.FC = () => {
  const data = useSelector((state: RootState) => state.post.posts);
  const dispatch = useDispatch<AppDispatch>();

  // store open post id instead of index
  const [openPostId, setOpenPostId] = useState<string | null>(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        p: 2,
      }}
    >
      {data.map((val: Post) => (
        <Card
          key={val.id}
          sx={{
            width: "100%",
            maxWidth: 650,
            mb: 4,
            p: 2,
            borderRadius: 3,
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar />
            <Box>
              <Typography fontWeight="600">Sahil Chandrakar</Typography>
              <Typography fontSize="0.85rem" color="gray">
                1w • 🌐
              </Typography>
            </Box>
          </Stack>

          {/* Title */}
          <Typography sx={{ mt: 2, fontWeight: "bold", fontSize: "1.1rem" }}>
            {val.title}
          </Typography>

          {/* Description */}
          <Typography sx={{ mt: 1 }}>{val.description}</Typography>

          {/* Image */}
          {val.image && (
            <Box
              component="img"
              src={val.image}
              sx={{
                width: "100%",
                mt: 2,
                borderRadius: 3,
                display: "block",
                mx: "auto",
              }}
            />
          )}

          {/* Likes */}
          <Typography
            sx={{
              mt: 1,
              fontSize: "0.9rem",
              color: "gray",
            }}
          >
            👍 {val.likes} likes
          </Typography>

          <Divider sx={{ my: 1 }} />

          {/* Footer Buttons */}
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ mt: 1 }}
          >
            {/* LIKE button using ID */}
            <Box
              onClick={() => dispatch(likePost(val.id))} // Changed here
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 2,
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { backgroundColor: "#f5f5f5" },
                userSelect: "none",
              }}
            >
              <ThumbUpAltOutlinedIcon fontSize="small" />
              <Typography>Like</Typography>
            </Box>

            {/* COMMENT toggle using ID */}
            <Box
              onClick={() =>
                setOpenPostId(openPostId === val.id ? null : val.id)
              } // Changed here
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 2,
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { backgroundColor: "#f5f5f5" },
                userSelect: "none",
              }}
            >
              <ChatBubbleOutlineOutlinedIcon />
              <Typography>Comment</Typography>
            </Box>

            {/* SAVE */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 2,
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { backgroundColor: "#f5f5f5" },
                userSelect: "none",
              }}
            >
              <BookmarkBorderOutlinedIcon />
              <Typography>Save</Typography>
            </Box>
          </Stack>

          {/* comment section — Now based on ID */}
          {openPostId === val.id && ( // Changed here
            <Box sx={{ mt: 2 }}>
              <CommentList postId={val.id} /> {/* Pass real id */}
            </Box>
          )}
        </Card>
      ))}
    </Box>
  );
};
export default ShowPost;
