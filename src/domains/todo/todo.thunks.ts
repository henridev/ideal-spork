import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '../../config/store';
import { addTodo } from './todo.slice';
import getTodo from './todo.api';

// payload returned on fulfilled
const addTodoAsyncPayloadCreator = async (id: number) => {
	const todo = await getTodo(id);
	return todo;
};

export const addTodoAsync = createAsyncThunk(
	'todo/fetchTodo',
	addTodoAsyncPayloadCreator,
);

export const addTodoByIdAsync = (id: number): AppThunk => async (
	dispatch,
) => {
	const todo = await getTodo(id);
	dispatch(addTodo({ todo }));
};

/**
 * ex addTodoAsync :
 * thunk and allows us to perform async logic.
 * can be dispatched like a regular action: `dispatch(incrementAsync(10))`.
 * will call the thunk with the `dispatch` function as the first argument.
 * code can then be executed and other actions can be dispatched.
 * Thunks are typically used to make async requests.
 */

/**
 * ex deleteIfStartsWith :
 * We can also write thunks by hand, which may contain both sync and async logic.
 * Here's an example of conditionally dispatching actions based on current state.
 */
