import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from '@reduxjs/toolkit';
import { TUser } from '../types';
import { db } from '../db';
import { RootState } from '../store/store';

type TInitialState = {
	users: TUser[];
	loading: boolean;
	error: string | null;
	offset: number;
	countToDisplay: number;
	currentPage: number;
	countDB: number;
	ableData: boolean;
	nulledDB: boolean;
};

const initialState: TInitialState = {
	users: [],
	loading: false,
	error: null,
	offset: 0,
	countToDisplay: 100,
	currentPage: 0,
	countDB: 0,
	ableData: true,
	nulledDB: false,
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		clearUsers(state) {
			state = initialState;
		},
		setNulledDB(state) {
			state.nulledDB = true;
		}
	},
	selectors: {
		getUsersSelector: (state) => state.users,
		getCurrentPageSelector: (state) => state.currentPage,
		getUsersSliceInfoSelector: (state) => {
			return {
				loading: state.loading,
				error: state.error,
				ableData: state.ableData,
				countDB: state.countDB,
				offset: state.offset,
				countToDisplay: state.countToDisplay,
				currentPage: state.currentPage,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				if (action.error.message) {
					state.error = action.error.message;
				}
				// state.users = [];
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.users = action.payload.users;
				state.countDB = action.payload.countDB;
				state.currentPage = action.payload.currentPage;
				state.offset = state.currentPage * state.countToDisplay;
				state.ableData =
					state.currentPage * state.countToDisplay <
					action.payload.countDB;
			});
	},
});

export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async ({
		countToDisplay,
		currentPage,
	}: {
		countToDisplay: number;
		currentPage: number;
	}) => {
		const offset = currentPage * countToDisplay;
		const countDB = await db.table('users').count();
		const users = await db
			.table('users')
			.orderBy('userOrderNumber')
			.offset(offset)
			.limit(countToDisplay)
			.toArray();
		return { users: users, countDB: countDB, currentPage: currentPage };
	}
);

const selectUsersSlice = (state: RootState) => state.users;

export const { clearUsers, setNulledDB } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const { getUsersSelector } = usersSlice.selectors;

export const getUsersSliceInfoSelector = createSelector(
	[selectUsersSlice],
	(usersState) => ({
		loading: usersState.loading,
		error: usersState.error,
		ableData: usersState.ableData,
		countDB: usersState.countDB,
		offset: usersState.offset,
		countToDisplay: usersState.countToDisplay,
		currentPage: usersState.currentPage,
		nulledDB: usersState.nulledDB
	})
);
