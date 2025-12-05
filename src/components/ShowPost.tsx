import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../features/post/postSlice";
import type { RootState, AppDispatch } from "../store/store";

import { Box, Card, Typography, Avatar, Stack, Divider } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";

import CommentList from "../components/CommentList";

interface Post {
  id: string; // 🔥 added id here so TS knows it exists
  title: string;
  description: string;
  image?: string;
  likes: number;
}

const ShowPost: React.FC = () => {
  const posts = useSelector((state: RootState) => state.post.posts);
  const searchQuery = useSelector((state: RootState) => state.search.query);
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
          key={val.id} // 🔥 correct key
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
              }}
            >
              <ThumbUpAltOutlinedIcon fontSize="small" />
              <Typography>Like</Typography>
            </Box>

            {/* 💬 COMMENT toggle using ID */}
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
              }}
            >
              <BookmarkBorderOutlinedIcon />
              <Typography>Save</Typography>
            </Box>
          </Stack>

          {/* COMMENT SECTION — Now based on ID */}
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
