import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Post {
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
    addPost: (state, action: PayloadAction<Omit<Post, "likes">>) => {
      state.posts.push({
        ...action.payload,
        likes: 0,
      });
    },

    likePost: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.posts[index]) {
        state.posts[index].likes += 1;
      }
    },
  },
});

export const { addPost, likePost } = postSlice.actions;

export default postSlice.reducer;
