export interface Todo {
	userId: number,
	id: number,
	title: string,
	completed: boolean
}

export interface TodoState {
	todos: Todo[];
	status: 'idle' | 'loading' | 'error'
}

const todoState: TodoState = {
	todos: [],
	status: 'idle',
};

export default todoState;
