import { FC, ReactElement, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux.hooks';
import { addTodo, addTodoAsync, selectTodos } from '../../../domains/todo';
import Btn from '../../shared/components/Btn/Btn';
import InputBox from '../../shared/components/InputBox/InputBox';
import styles from './TodoList.module.scss';
import Todo from './components/Todo/Todo';

const TodoList: FC = (): ReactElement => {
	const dispatch = useAppDispatch();
	const todos = useAppSelector(selectTodos);
	const [todoText, setTodoText] = useState('');
	const [todoRandomId, setRodoRandomId] = useState(1);

	const handleTodoAdd = () => dispatch(addTodo({
		todo: {
			id: todos.length + 1,
			userId: -1,
			title: todoText,
			completed: false,
		},
	}));

	const handleRandomTodoAdd = () => dispatch(addTodoAsync(todoRandomId));

	return (
		<div>
			<ul className={styles.list}>
				{todos.map((todo) => <Todo todo={todo} />)}
			</ul>
			<div className={styles.inputContainer}>
				<input
					className={classNames(styles.textbox, 'input')}
					aria-label="Set id"
					value={todoRandomId}
					onChange={(e) => setRodoRandomId(Number(e.target.value))}
				/>
				<Btn
					className="is-primary"
					onClick={handleRandomTodoAdd}
					label="Add TODO by id"
				/>
			</div>
			<div className={styles.inputContainer}>
				<InputBox
					aria-label="Set text"
					value={todoText}
					onChange={(e:any) => setTodoText((e.target as HTMLInputElement).value)}
				/>
				<Btn
					className="is-primary"
					onClick={handleTodoAdd}
					label="Add TODO by input"
				/>
			</div>
		</div>
	);
};

export default TodoList;
