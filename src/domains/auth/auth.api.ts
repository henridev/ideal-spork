import api from '../../config/network';
import { User, UserDTO } from './auth.state';

export const register = async (user: User, password: string): Promise<UserDTO> => {
	const res = await api.post('auth/register', { json: { ...user, password } });
	return res.json();
};

export const login = async (username: string, password: string): Promise<UserDTO> => {
	const res = await api.post('auth/login', { json: { username, password } });
	return res.json();
};

export const logout = async (): Promise<{ success: boolean }> => {
	const res = await api.get('auth/logout');
	return res.json();
};

export const checkSession = async (): Promise<{ user?: UserDTO, connected: boolean }> => {
	const res = await api.get('auth/status');
	return res.json();
};
