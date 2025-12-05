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
  title: string;
  description: string;
  image?: string;
  likes: number;
}

const ShowPost: React.FC = () => {
  const posts = useSelector((state: RootState) => state.post.posts);
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const dispatch = useDispatch<AppDispatch>();

  const [openPostId, setOpenPostId] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState<Post[]>([]);

  // Load bookmarks from localStorage on mount
 useEffect(() => {
  const storedBookmarks = localStorage.getItem("bookmarks");
  if (storedBookmarks) {
    setTimeout(() => {
      setBookmarks(JSON.parse(storedBookmarks));
    }, 0);
  }
}, []);
        

  const handleBookmark = (post: Post) => {
    const isSaved = bookmarks.some((p) => p.title === post.title && p.description === post.description);

    if (isSaved) {
      // Remove bookmark
      const updated = bookmarks.filter(
        (p) => !(p.title === post.title && p.description === post.description)
      );
      setBookmarks(updated);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
    } else {
      // Add bookmark
      const updated = [...bookmarks, post];
      setBookmarks(updated);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
    }
  };

  const filteredPosts = posts.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    const title = (p.title ?? "").trim().toLowerCase();
    const description = (p.description ?? "").trim().toLowerCase();
    return title.includes(q) || description.includes(q);
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
      {filteredPosts.map((val: Post, index: number) => {
        const isSaved = bookmarks.some(
          (p) => p.title === val.title && p.description === val.description
        );

        return (
          <Card
            key={index}
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
              <Box
                onClick={() => dispatch(likePost(index))}
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

              <Box
                onClick={() => setOpenPostId(openPostId === index ? null : index)}
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
                }}
              >
                {isSaved ? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon />}
                <Typography>{isSaved ? "Saved" : "Save"}</Typography>
              </Box>
            </Stack>

            {openPostId === index && (
              <Box sx={{ mt: 2 }}>
                <CommentList postId={String(index)} />
              </Box>
            )}
          </Card>
        );
      })}
    </Box>
  );
};

export default ShowPost;
