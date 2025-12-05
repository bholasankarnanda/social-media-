import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import searhchReducer from "../features/search/searchSlice";

import themeReducer from "../features/theme/themeSlice";
import postReducer from "../features/post/postSlice";
import bookmarkReducer from "../features/search/bookmarkSlice";
import commentReducer from "../features/Comments/CommentSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  post: postReducer,
  comments: commentReducer,
  search: searhchReducer,
  bookmarks: bookmarkReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
