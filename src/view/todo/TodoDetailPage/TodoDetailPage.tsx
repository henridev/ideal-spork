import { FC, ReactElement } from 'react';
import styles from './TodoDetailPage.module.scss';

const TodoDetailPage: FC = (): ReactElement => (
	<main className={styles.main}>
		<h1 className={styles.title}>TODO Detail</h1>
	</main>
);

export default TodoDetailPage;
