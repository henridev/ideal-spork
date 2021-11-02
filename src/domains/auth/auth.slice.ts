import { createSlice } from '@reduxjs/toolkit';
import { checkUserSessionAsync, loginAsync, logoutAsync, registerAsync } from './auth.thunks';
import authState from './auth.state';
import localforageStore from '../../config/localforage';

export const userSlice = createSlice({
	name: 'auth',
	initialState: authState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(registerAsync.fulfilled, (state, action) => {
				state.user = action.payload;
				state.authenticated = true;
				localforageStore.setItem('user', action.payload);
			})
			.addCase(registerAsync.rejected, (state) => {
				state.status = 'error';
			});
		builder
			.addCase(loginAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(loginAsync.fulfilled, (state, action) => {
				state.user = action.payload;
				state.authenticated = true;
				localforageStore.setItem('user', action.payload);
			})
			.addCase(loginAsync.rejected, (state) => {
				state.status = 'error';
			});
		builder
			.addCase(logoutAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(logoutAsync.fulfilled, (state, action) => {
				const success = action.payload;
				if (success) {
					state.user = null;
					state.authenticated = false;
					localforageStore.removeItem('user');
				}
			})
			.addCase(logoutAsync.rejected, (state) => {
				state.status = 'error';
			});
		builder
			.addCase(checkUserSessionAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(checkUserSessionAsync.fulfilled, (state, action) => {
				state.user = action.payload;
				state.authenticated = !!action.payload;
				localforageStore.setItem('user', action.payload);
			})
			.addCase(checkUserSessionAsync.rejected, (state) => {
				state.status = 'error';
			});
	},
});

export default userSlice.reducer;
