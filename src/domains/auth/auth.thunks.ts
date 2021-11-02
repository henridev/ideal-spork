import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkSession, login, register, logout } from './auth.api';

// payload returned on fulfilled
const registerPayloadCreator = async (
	args: { username: string, email: string, password: string, avatarUrl: string },
) => {
	const { password, ...user } = args;
	const givenUser = await register(user, password);
	return givenUser;
};

export const registerAsync = createAsyncThunk(
	'auth/register',
	registerPayloadCreator,
);

const loginPayloadCreator = async (args: { username: string, password: string }) => {
	const givenUser = await login(args.username, args.password);
	return givenUser;
};

export const loginAsync = createAsyncThunk(
	'auth/login',
	loginPayloadCreator,
);

const logoutPayloadCreator = async () => {
	const { success } = await logout();
	return success;
};

export const logoutAsync = createAsyncThunk(
	'auth/logout',
	logoutPayloadCreator,
);

const checkUserSessionPayloadCreator = async () => {
	const { connected, user } = await checkSession();
	if (connected) {
		return user;
	}
	return null;
};

export const checkUserSessionAsync = createAsyncThunk(
	'auth/checkSession',
	checkUserSessionPayloadCreator,
);
