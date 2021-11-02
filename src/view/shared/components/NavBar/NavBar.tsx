import { FC, useEffect } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import {
	Box,
	Flex,
	Avatar,
	HStack,
	Link,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	useColorMode,
	Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { POST_EP, USER_EP } from '../../../routes/endpoints';
import { SignupPopup, LoginPopup } from '../../../auth';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux.hooks';
import { logoutAsync } from '../../../../domains/auth/auth.thunks';
import selectUser from '../../../../domains/auth/auth.selector';

const Links = [
	{ title: 'Home', ep: '/' },
	{ title: 'Users', ep: USER_EP },
	{ title: 'Posts', ep: POST_EP },
];

const NavLink: FC<{to: string}> = (props) => {
	const { children, to } = props;
	return (
		// eslint-disable-next-line jsx-a11y/anchor-is-valid
		<Link
			px={2}
			py={1}
			rounded="md"
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.200', 'gray.700'),
			}}
		>
			<LinkRouter to={to}>
				{children}
			</LinkRouter>
		</Link>
	);
};

export default function withAction() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	const loginPopupControl = useDisclosure();
	const signupPopupControl = useDisclosure();
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);

	const handleLogout = () => {
		dispatch(logoutAsync());
	};

	useEffect(() => {
		if (user) {
			loginPopupControl.onClose();
			signupPopupControl.onClose();
		}
	}, [user]);

	return (
		<>
			{signupPopupControl.isOpen && <SignupPopup popupControl={signupPopupControl} />}
			{loginPopupControl.isOpen && <LoginPopup popupControl={loginPopupControl} />}
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
				<Flex h={16} alignItems="center" justifyContent="space-between">
					<IconButton
						size="md"
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label="Open Menu"
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems="center">
						<Box>
							<Image
								boxSize="100px"
								objectFit="contain"
								// eslint-disable-next-line max-len
								src="https://res.cloudinary.com/dri8yyakb/image/upload/v1635843381/Untitled_1_j28z66.svg"
								alt="logo"
								style={{ filter: 'invert(1)' }}
							/>
						</Box>
						<HStack
							as="nav"
							spacing={4}
							display={{ base: 'none', md: 'flex' }}
						>
							{Links.map(({ title, ep }) => (
								<NavLink key={title} to={ep}>{title}</NavLink>
							))}
						</HStack>
					</HStack>
					<Flex alignItems="center">
						<Button
							mr={4}
							onClick={toggleColorMode}
						>
							{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						</Button>
						<Menu>
							<MenuButton
								as={Button}
								rounded="full"
								variant="link"
								cursor="pointer"
								minW={0}
							>
								<Avatar
									size="sm"
									src={user?.avatarUrl}
								/>
							</MenuButton>
							<MenuList>
								{!user && <MenuItem onClick={signupPopupControl.onOpen}>Sign up</MenuItem>}
								{!user && <MenuItem onClick={loginPopupControl.onOpen}>Log in</MenuItem>}
								{user && <MenuItem>
									Welcome
									{' '}
									{user.username}
									!
								</MenuItem>}
								<MenuDivider />
								{user && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
							</MenuList>
						</Menu>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as="nav" spacing={4}>
							{Links.map(({ title, ep }) => (
								<NavLink key={title} to={ep}>{title}</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
