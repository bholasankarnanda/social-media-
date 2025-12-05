import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../features/post/postSlice";
import type { RootState, AppDispatch } from "../store/store";
import type { Post } from "../features/post/postSlice"; // keep if you export Post type from your slice

import { Box, Card, Typography, Avatar, Stack, Divider } from "@mui/material";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CommentList from "../components/CommentList";
import { useState } from "react";

/**
 * If your postSlice DOES NOT export a Post type, replace the import above with:
 *
 * interface Post {
 *   id: string;
 *   title: string;
 *   description: string;
 *   image?: string;
 *   likes: number;
 * }
 *
 * (But if you already export Post from your slice, keep the import.)
 */

const ShowPost: React.FC = () => {
  const data = useSelector((state: RootState) => state.post.posts);
  const dispatch = useDispatch<AppDispatch>();

  // store open post id instead of INDEX
  const [openPostId, setOpenPostId] = useState<string | null>(null);

  // Bookmarks stored in localStorage (lazy init so no useEffect needed)
  const [bookmarks, setBookmarks] = useState<Post[]>(() => {
    try {
      const stored = localStorage.getItem("bookmarks");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Toggle bookmark and persist to localStorage
  const handleBookmark = (post: Post) => {
    const isSaved = bookmarks.some((p) => p.id === post.id);
    const updated = isSaved
      ? bookmarks.filter((p) => p.id !== post.id)
      : [...bookmarks, post];
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((p) => {
    const q = (searchQuery ?? "").trim().toLowerCase();
    return (
      (p.title ?? "").toLowerCase().includes(q) ||
      (p.description ?? "").toLowerCase().includes(q)
    );
  });

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
              mt: 1,
              fontSize: "0.9rem",
              color: "gray",
            }}
          >
            👍 {val.likes} likes
          </Typography>

          <Divider sx={{ my: 1 }} />

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
              {/* LIKE button using ID */}
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
                }
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
                onClick={() => handleBookmark(val)}
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
                {isSaved ? (
                  <BookmarkOutlinedIcon />
                ) : (
                  <BookmarkBorderOutlinedIcon />
                )}
                <Typography>{isSaved ? "Saved" : "Save"}</Typography>
              </Box>
            </Stack>

            {/* comment section — Now based on ID */}
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
