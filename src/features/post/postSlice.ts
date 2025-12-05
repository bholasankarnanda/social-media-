import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  likes: number;
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Omit<Post, "likes" | "id">>) => {
      state.posts.push({
        id: crypto.randomUUID(), // auto unique id
        ...action.payload,
        likes: 0,
      });
    },

    likePost: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
  },
});

export const { addPost, likePost } = postSlice.actions;

export default postSlice.reducer;
