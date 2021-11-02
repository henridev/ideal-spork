import { FC, ReactElement } from 'react';
import TodoList from '../TodoList/TodoList';
import styles from './TodoPage.module.scss';

const TodoPage: FC = (): ReactElement => (
	<main className={styles.main}>
		<h1 className={styles.title}>TODO PAGE</h1>
		<TodoList />
	</main>
);

export default TodoPage;
