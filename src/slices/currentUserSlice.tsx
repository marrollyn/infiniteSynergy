import { createSlice, createAsyncThunk, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../types";
import { db } from "../db";
import { RootState } from "../store/store";


type TInitialState = {
    currentUser: TUser | null;
}

const initialState: TInitialState = {
    currentUser: null,
};

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<TUser>) {
            state.currentUser = action.payload;
        },
        clearUser(state) {
            state.currentUser = null;
        },
        updateUser(state, action: PayloadAction<TUser>) {
            state.currentUser = action.payload;
        }
    },
    selectors: {
    },
    extraReducers: (builder) => {
            builder
                .addCase(updateUser.pending, (state) => {
                })
                .addCase(updateUser.rejected, (state, action) => {
                })
                .addCase(updateUser.fulfilled, (state, action) => {
                });
        },
})

export const updateUser = createAsyncThunk(
    'currentUser/updateUser',
    async (user: TUser) => {
        await db.table('users').put(user);
        return user;
    }
);

export const currentUserReducer = currentUserSlice.reducer;