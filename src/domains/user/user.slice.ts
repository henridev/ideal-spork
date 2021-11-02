import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '../auth/auth.state';
import todoState from './user.state';

export const userSlice = createSlice({
	name: 'user',
	initialState: todoState,
	reducers: {
		changeStatus: (state, action: PayloadAction<'loading' | 'idle' | 'error'>) => {
			state.status = action.payload;
		},
		addUsers: (state, action: PayloadAction<UserDTO[]>) => {
			state.users = action.payload;
		},
	},
});

export const { addUsers, changeStatus } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
