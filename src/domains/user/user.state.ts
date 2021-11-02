import { UserDTO } from '../auth/auth.state';

export interface UserState {
	users: UserDTO[];
	status: 'idle' | 'loading' | 'error'
}

const todoState: UserState = {
	users: [],
	status: 'idle',
};

export default todoState;
