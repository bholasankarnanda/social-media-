// CommentSlice.ts
import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store"; // <-- IMPORTANT

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

// MEMOIZED SELECTOR

export const selectCommentsByPost = (postId: string) =>
  createSelector(
    (state: RootState) => state.comments.byId,
    (state: RootState) => state.comments.idsByPost[postId] || [],
    (byId, ids) => ids.map((id) => byId[id])
  );

export const { addComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
