import { Outlet } from 'react-router-dom';
import { POST_EP } from '../../routes/endpoints';
import PostPage from '../PostPage/PostPage';

const SharedWrapper = () => (
	<>
		<Outlet />
	</>
);

const PostRoutes = {
	path: POST_EP,
	element: <SharedWrapper />,
	children: [
		{ path: '', element: <PostPage /> }, // /post
		// { path: ':id', element: <PostDetailPage /> }, // /post/:id
	],
};

export default PostRoutes;
