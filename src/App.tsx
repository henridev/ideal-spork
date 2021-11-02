// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useAppDispatch } from './shared/hooks/redux.hooks';
import { checkUserSessionAsync } from './domains/auth/auth.thunks';
import { NavBar } from './view/shared/components';
import { PostRoutes } from './view/post';
import { UserRoutes } from './view/user';
import LandingPage from './view/shared/LandingPage/LandingPage';
import './App.scss';

const App = () => {
	const dispatch = useAppDispatch();

	const element = useRoutes([
		{ path: '/', element: <LandingPage /> },
		PostRoutes,
		UserRoutes,
	]);

	const checkUserStatus = () => dispatch(checkUserSessionAsync());

	useEffect(() => {
		checkUserStatus();
	}, []);

	return (
		<>
			<NavBar />
			{element}
		</>
	);
};

export default App;
