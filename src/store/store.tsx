import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "../slices/usersSlice";
import { currentUserReducer } from "../slices/currentUserSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        currentUser: currentUserReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;