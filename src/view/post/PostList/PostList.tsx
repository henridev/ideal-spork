import { FC, ReactElement, useMemo, MouseEvent } from 'react';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { Column } from 'react-table';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux.hooks';
import { deletePostAsync, selectPosts } from '../../../domains/post';
import PostPopup from './components/PostPopup/PostPopup';
import { SortedTable } from '../../shared/components';
import { pickPost } from '../../../domains/post/post.slice';
import { selectPickedPost } from '../../../domains/post/post.selector';

const PostList: FC = (): ReactElement => {
	const dispatch = useAppDispatch();
	const postUpdatePopupControl = useDisclosure();
	const posts = useAppSelector(selectPosts);
	const pickedPost = useAppSelector(selectPickedPost);
	// const bg = useColorModeValue('blue.100', 'blue.200');
	const { isOpen, onOpen } = postUpdatePopupControl;

	const handleDelete = (id:number) => {
		dispatch(deletePostAsync(id));
	};

	const handleSelection = (e: MouseEvent<HTMLElement>) => {
		const selectedId = Number(e.currentTarget.dataset.id);
		dispatch(pickPost(selectedId));
	};

	const columns = useMemo<Column[]>(() => [
		{
			Header: 'identification',
			columns: [
				{
					Header: 'Id',
					accessor: 'id',
				},
				{
					Header: 'Author',
					accessor: 'author',
				},
			],
		},
		{
			Header: 'Info',
			columns: [
				{
					Header: 'Title',
					accessor: 'title',
				},
				{
					Header: 'Content',
					accessor: 'body',
				},
			],
		},
		{
			// Make an expander cell
			Header: 'Actions', // No header
			id: 'actions', // It needs an ID
			// eslint-disable-next-line react/prop-types
			Cell: ({ row }) => {
				const rowTwo = row as any;
				return (
					<Flex
						p={2}
						color="white"
					>
						<Button
							onClick={onOpen}
							colorScheme="yellow"
							size="md"
							mr={4}
						>
							Update
						</Button>
						<Button
							// eslint-disable-next-line react/prop-types
							onClick={() => { handleDelete(rowTwo?.original?.id); }}
							colorScheme="red"
							size="md"
							mr={4}
						>
							Delete
						</Button>
					</Flex>
				);
			},
		},
	], []);

	return (
		<>
			{isOpen && <PostPopup
				type="update"
				defaultValues={pickedPost}
				popupControl={postUpdatePopupControl}
			/>}
			<SortedTable
				data={posts}
				columns={columns}
				onSelection={handleSelection}
			/>
		</>
	);
};

export default PostList;
