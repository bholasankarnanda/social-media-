import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../features/post/postSlice";
import type { RootState, AppDispatch } from "../store/store";
import type { Post } from "../features/post/postSlice";

import { Box, Card, Typography, Avatar, Stack, Divider } from "@mui/material";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";

import CommentList from "../components/CommentList";

// ----------------------------------------------------

const ShowPost: React.FC = () => {
  const posts = useSelector((state: RootState) => state.post.posts);
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const dispatch = useDispatch<AppDispatch>();

  const [openPostId, setOpenPostId] = useState<string | null>(null);

  // Initialize bookmarks safely
  const [bookmarks, setBookmarks] = useState<Post[]>(() => {
    try {
      const stored = localStorage.getItem("bookmarks");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save bookmarks to localStorage
  const handleBookmark = (post: Post) => {
    const isSaved = bookmarks.some((p) => p.id === post.id);

    const updated = isSaved
      ? bookmarks.filter((p) => p.id !== post.id)
      : [...bookmarks, post];

    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  // Filter posts by search
  const filteredPosts = posts.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  // ----------------------------------------------------

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
      {filteredPosts.map((val: Post) => {
        const isSaved = bookmarks.some((p) => p.id === val.id);

        return (
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
            {/* Header */}
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
            <Typography sx={{ mt: 1, fontSize: "0.9rem", color: "gray" }}>
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
              {/* LIKE */}
              <Box
                onClick={() => dispatch(likePost(val.id))}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  userSelect: "none",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <ThumbUpAltOutlinedIcon fontSize="small" />
                <Typography>Like</Typography>
              </Box>

              {/* COMMENT */}
              <Box
                onClick={() =>
                  setOpenPostId(openPostId === val.id ? null : val.id)
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  userSelect: "none",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <ChatBubbleOutlineOutlinedIcon />
                <Typography>Comment</Typography>
              </Box>

              {/* SAVE */}
              <Box
                onClick={() => handleBookmark(val)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  userSelect: "none",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                {isSaved ? (
                  <BookmarkOutlinedIcon />
                ) : (
                  <BookmarkBorderOutlinedIcon />
                )}
                <Typography>{isSaved ? "Saved" : "Save"}</Typography>
              </Box>
            </Stack>

            {/* Comments */}
            {openPostId === val.id && (
              <Box sx={{ mt: 2 }}>
                <CommentList postId={val.id} />
              </Box>
            )}
          </Card>
        );
      })}
    </Box>
  );
};

export default ShowPost;
