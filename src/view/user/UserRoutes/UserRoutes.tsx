import { Outlet } from 'react-router-dom';
import { USER_EP } from '../../routes/endpoints';
import UserPage from '../UserPage/UserPage';

const SharedWrapper = () => (
	<main>
		<Outlet />
	</main>
);

const UserRoutes = {
	path: USER_EP,
	element: <SharedWrapper />,
	children: [
		{ path: '', element: <UserPage /> },
		// { path: 'signup', element: <UserProfile /> },
		// { path: 'login', element: <OwnUserProfile /> },
	],
};

export default UserRoutes;
