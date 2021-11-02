import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authReducer } from '../domains/auth/auth.slice';
import { postReducer } from '../domains/post/post.slice';
import userReducer from '../domains/user/user.slice';

/**
 * setup the initial store with optionaly
 * multiple reducers per domain
 */
export const store = configureStore({
	reducer: {
		post: postReducer,
		auth: authReducer,
		user: userReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
