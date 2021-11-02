import { RootState } from '../../config/store';

const selectTodos = (state: RootState) => state.todo.todos;

/**
 * allows us to select a value from
 * the state. Selectors can also be defined inline where
 * they're used instead of in the slice file.
 * For example: `useSelector((state: RootState) => state.counter.value)`
*/

export default selectTodos;
