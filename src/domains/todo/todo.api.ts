import api from '../../config/network';
import { Todo } from './todo.state';

const getTodo = async (id: number): Promise<Todo> => {
	const res = await api.get(`todos/${id}`, { prefixUrl: 'https://jsonplaceholder.typicode.com' });
	return res.json();
};

export default getTodo;
