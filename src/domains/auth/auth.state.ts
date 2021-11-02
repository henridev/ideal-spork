/* eslint-disable no-unused-vars */

export enum RoleEnum {
	ADMIN = 0,
	USER
}

export interface User {
	username: string,
	email: string,
	avatarUrl: string

}

export interface UserDTO extends User {
	id: number
	roleId: RoleEnum
	roleName: 'Administrator' | 'User'
	roleCode: 'ADMIN' | 'USER',
}

export interface AuthState {
	user?: UserDTO | null;
	authenticated: boolean
	status: 'idle' | 'loading' | 'error'
}

const authState: AuthState = {
	user: undefined,
	authenticated: false,
	status: 'idle',
};

export default authState;
