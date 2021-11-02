import classNames from 'classnames';
import { Tr, Td, Button, Box } from '@chakra-ui/react';
import { FC, ReactElement, useEffect, useState } from 'react';
import { UserDTO } from '../../../domains/auth/auth.state';
import { getUsersAsync } from '../../../domains/user';
import { deleteUsersAsync } from '../../../domains/user/user.thunks';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux.hooks';
import TableComponent from '../../shared/components/Table/Table';
import selectUsers from '../../../domains/user/user.selector';
import styles from './UserPage.module.scss';

const UserPage: FC = (): ReactElement => {
	const [selectedId, setSelectedId] = useState<number>(-1);
	const dispatch = useAppDispatch();
	const users = useAppSelector(selectUsers);
	const titles = [
		{ label: 'id', isNumeric: true },
		{ label: 'name', title: 'username' },
		{ label: 'email' },
		{ label: 'role id', title: 'roleId', isNumeric: true },
		{ label: 'role name', title: 'roleName' },
		{ label: 'role code', title: 'roleCode' },
		{ label: 'actions', title: 'actions' },
	];

	useEffect(() => {
		dispatch(getUsersAsync());
	}, []);

	const handleSelection = (id:number) => () => {
		setSelectedId((previousSelectedId) => {
			if (previousSelectedId !== id) return id;
			return -1;
		});
	};

	const handleDelete = (id:number) => () => {
		dispatch(deleteUsersAsync(id));
	};

	const handleUpdate = (id:number) => () => {
		// eslint-disable-next-line no-console
		console.log({ id });
		// dispatch(deleteUsersAsync(id));
	};

	const displayData = (data: UserDTO) => {
		const { id, email, username, roleId, roleName, roleCode } = data;
		return <Tr
			key={data.id}
			onClick={handleSelection(id)}
			className={classNames({ 'is-selected': selectedId === id })}
		>
			<Td isNumeric>{id}</Td>
			<Td>{username}</Td>
			<Td>{email}</Td>
			<Td isNumeric>{roleId}</Td>
			<Td>{roleName}</Td>
			<Td>{roleCode}</Td>
			<Td>
				<Box
					p={2}
					color="white"
				>
					<Button
						onClick={handleUpdate(id)}
						colorScheme="yellow"
						size="md"
						mr={4}
					>
						Update
					</Button>
					<Button
						onClick={handleDelete(id)}
						colorScheme="red"
						size="md"
						mr={4}
					>
						Delete
					</Button>
				</Box>
			</Td>
		</Tr>;
	};

	return (
		<main className={styles.main}>
			<TableComponent
				datas={users}
				titles={titles}
				displayData={displayData}
				caption="user table"
			/>
		</main>
	);
};

export default UserPage;
