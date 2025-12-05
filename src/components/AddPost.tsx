import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addPost } from "../features/post/postSlice";
import type { AppDispatch } from "../store/store";

import {
  Box,
  Card,
  TextField,
  Button,
  Avatar,
  Typography,
  Stack,
  IconButton,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const AddPost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle form submit
  const handleAddPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addPost({ title, description, image }));
    navigate("/"); // Close modal and return home
  };

  return (
    <Dialog
      open={true}
      onClose={() => navigate("/")}
      fullWidth
      maxWidth="sm"
      sx={{ backdropFilter: "blur(3px)" }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* wrapped inside modal */}
        <Card sx={{ p: 3, borderRadius: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Avatar />
            <Box>
              <Typography fontWeight="bold" fontSize="1.1rem">
                Sahil Chandrakar
              </Typography>
              <Typography fontSize="0.85rem" color="gray">
                Post to Anyone ▼
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* FORM */}
          <form onSubmit={handleAddPost}>
            {/* Title */}
            <TextField
              placeholder="Enter title..."
              fullWidth
              variant="standard"
              sx={{ mb: 2 }}
              autoComplete="off"
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* Description */}
            <TextField
              placeholder="What do you want to talk about?"
              fullWidth
              multiline
              minRows={5}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: "1.2rem", lineHeight: "1.7rem" },
              }}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* Image upload */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 3 }}
            >
              <Stack direction="row" spacing={1}>
                <input
                  type="file"
                  id="upload-img"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />

                <label htmlFor="upload-img">
                  <IconButton component="span">
                    <PhotoCameraIcon />
                  </IconButton>
                </label>
              </Stack>

              <Button variant="contained" type="submit">
                Post
              </Button>
            </Stack>
          </form>

          {/* Image preview */}
          {image && (
            <Box
              component="img"
              src={image}
              sx={{
                width: "90%",
                mt: 2,
                borderRadius: 3,
                display: "block",
                mx: "auto",
              }}
            />
          )}
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AddPost;
