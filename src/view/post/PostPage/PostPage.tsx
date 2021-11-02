import { FC, ReactElement, useEffect } from 'react';
import { Box, Center, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux.hooks';
import { getAllPostsAsync } from '../../../domains/post';
import { Loader } from '../../shared/components';
import PostList from '../PostList/PostList';
import PostAddButton from '../PostList/components/PostAddButton/PostAddButton';

const PostPage: FC = (): ReactElement => {
	const dispatch = useAppDispatch();
	const postStatus = useAppSelector((state) => state.post.status);

	useEffect(() => {
		dispatch(getAllPostsAsync());
	}, []);

	if (postStatus !== 'idle') {
		return <Center h="90vh">
			<Loader />
		</Center>;
	}

	return (
		<Box as="main" p={4}>
			<Flex pt={2}>
				<Spacer />
				<Heading mr={4}>POSTPAGE</Heading>
				<Spacer />
				<PostAddButton />
			</Flex>
			<PostList />
		</Box>
	);
};

export default PostPage;
