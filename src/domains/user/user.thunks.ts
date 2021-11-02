import { AppThunk } from '../../config/store';
import { addUsers, changeStatus } from './user.slice';
import { deleteUser, getUsers } from './user.api';

export const getUsersAsync = (): AppThunk => async (
	dispatch,
) => {
	try {
		dispatch(changeStatus('loading'));
		const users = await getUsers();
		dispatch(addUsers(users));
		dispatch(changeStatus('idle'));
	} catch (error) {
		dispatch(changeStatus('error'));
	}
};

export const deleteUsersAsync = (id: number): AppThunk => async (
	dispatch,
) => {
	try {
		dispatch(changeStatus('loading'));
		await deleteUser(id);
		dispatch(getUsersAsync());
		dispatch(changeStatus('idle'));
	} catch (error) {
		dispatch(changeStatus('error'));
	}
};

export const other = '';
