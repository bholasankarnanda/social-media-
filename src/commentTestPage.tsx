import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// ----------------------------------------------------
// Types
// ----------------------------------------------------
export interface Comment {
  id: string;
  postId: string;
  text: string;
  createdAt: string;
}

export interface CommentsState {
  byId: Record<string, Comment>;
  idsByPost: Record<string, string[]>;
}

const initialState: CommentsState = {
  byId: {},
  idsByPost: {},
};

// ----------------------------------------------------
// Slice
// ----------------------------------------------------
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (
      state,
      action: PayloadAction<{ postId: string; text: string }>
    ) => {
      const { postId, text } = action.payload;

      const id = nanoid();
      const newComment: Comment = {
        id,
        postId,
        text,
        createdAt: new Date().toISOString(),
      };

      state.byId[id] = newComment;

      if (!state.idsByPost[postId]) {
        state.idsByPost[postId] = [];
      }

      state.idsByPost[postId].push(id);
    },

    deleteComment: (
      state,
      action: PayloadAction<{ postId: string; id: string }>
    ) => {
      const { postId, id } = action.payload;

      delete state.byId[id];

      if (state.idsByPost[postId]) {
        state.idsByPost[postId] = state.idsByPost[postId].filter(
          (cid) => cid !== id
        );
      }
    },
  },
});

// Export actions
export const { addComment, deleteComment } = commentSlice.actions;

// Export reducer for store
export default commentSlice.reducer;
