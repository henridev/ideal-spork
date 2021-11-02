import { Outlet } from 'react-router-dom';
import { TODO_EP } from '../routes/endpoints';
import TodoDetailPage from './TodoDetailPage/TodoDetailPage';
import TodoPage from './TodoPage/TodoPage';

const SharedWrapper = () => (
	<>
		<Outlet />
	</>
);

const TodoRoutes = {
	path: TODO_EP,
	element: <SharedWrapper />,
	children: [
		{ path: '', element: <TodoPage /> }, // /todo
		{ path: ':id', element: <TodoDetailPage /> }, // /todo/:id
	],
};

export default TodoRoutes;
