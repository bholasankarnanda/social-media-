import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: number;
  title: string;
  description: string;
}

interface BookmarksState {
  posts: Post[];
}

const initialState: BookmarksState = {
  posts: [],
};

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark(state, action: PayloadAction<Post>) {
      // Only add if not already bookmarked
      if (!state.posts.find((p) => p.id === action.payload.id)) {
        state.posts.push(action.payload);
      }
    },
    removeBookmark(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
    clearBookmarks(state) {
      state.posts = [];
    },
  },
});

export const { addBookmark, removeBookmark, clearBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
