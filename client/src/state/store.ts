import { configureStore } from "@reduxjs/toolkit";
import issuesSlice from "./issuesSlice";
import boardsSlice from "./boardsSlice";
import usersSlice from "./usersSlice";
import modalStateSlice from "./modalStateSlice";
import { api } from "../api/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    issues: issuesSlice,
    boards: boardsSlice,
    users: usersSlice,
    modalState: modalStateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
