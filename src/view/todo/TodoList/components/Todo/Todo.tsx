import classNames from 'classnames';
import { FC, ReactElement } from 'react';
import { toggleTodo, removeTodo } from '../../../../../domains/todo/todo.slice';
import { Todo as TodoType } from '../../../../../domains/todo/todo.state';
import { useAppDispatch } from '../../../../../shared/hooks/redux.hooks';
import { Btn } from '../../../../shared/components';
import styles from './Todo.module.scss';

type Props = {todo: TodoType}

const Todo: FC<Props> = ({ todo }): ReactElement => {
	const dispatch = useAppDispatch();
	const { id, title, completed } = todo;
	const txt = `TODO: (${id}): ${title}`;

	return (
		<li className={styles.listItem}>
			<span className={styles.text}>{txt}</span>
			<div className={styles.buttonContainer}>
				<Btn
					type="button"
					label={completed ? 'done' : 'todo'}
					className={classNames({ 'is-warning': !completed, 'is-success': completed })}
					aria-label="toggle todo"
					onClick={() => dispatch(toggleTodo({ id }))}
				/>
				<Btn
					type="button"
					label="delete"
					className="is-danger"
					aria-label="delete todo"
					onClick={() => dispatch(removeTodo({ id }))}
				/>
			</div>
		</li>
	);
};

export default Todo;
