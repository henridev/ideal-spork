import api from '../../config/network';
import { UserDTO } from '../auth/auth.state';

export const getUsers = async (): Promise<UserDTO[]> => {
	const res = await api.get('user');
	return res.json();
};

export const deleteUser = async (id: number): Promise<void> => {
	const res = await api.delete(`user/${id}`);
	return res.json();
};
