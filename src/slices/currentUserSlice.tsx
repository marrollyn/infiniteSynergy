import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../types';
import { db } from '../db';

type TInitialState = {
	currentUser: TUser | null;
	error: string | null;
	loading: boolean;
};

const initialState: TInitialState = {
	currentUser: null,
	error: null,
	loading: false,
};

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<TUser>) {
			state.currentUser = action.payload;
		},
		clearCurrentUser(state) {
			state.currentUser = null;
		},
	},
	selectors: {
		getCurrentUsersState: (state) => state,
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateUserDB.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateUserDB.rejected, (state, action) => {
				state.loading = false;
				if (action.error.message) {
					state.error = action.error.message;
				}
			})
			.addCase(updateUserDB.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				state.error = null;
				state.loading = false;
			});
	},
});

export const updateUserDB = createAsyncThunk(
	'currentUser/updateUserDB',
	async (user: TUser) => {
		await db.table('users').put(user);
		return user;
	}
);

export const currentUserReducer = currentUserSlice.reducer;
export const { setUser, clearCurrentUser } = currentUserSlice.actions;
export const { getCurrentUsersState } = currentUserSlice.selectors;
