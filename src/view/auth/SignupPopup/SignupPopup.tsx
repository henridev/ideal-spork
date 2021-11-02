import { FC, ReactElement, useState } from 'react';
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useColorModeValue,
	UseDisclosureProps,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Text,
	Avatar,
	AvatarBadge,
	IconButton,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { registerAsync } from '../../../domains/auth/auth.thunks';
import { useAppDispatch } from '../../../shared/hooks/redux.hooks';

type Props = {popupControl: UseDisclosureProps }

// eslint-disable-next-line max-len
const getRandomAvatar = () => `https://avatars.dicebear.com/api/${Math.random() < 0.5 ? 'adventurer' : 'avataaars'}/${Math.random()}.svg`;

const SignupPopup: FC<Props> = (props): ReactElement => {
	const { popupControl } = props;
	const { isOpen, onClose } = popupControl;
	const { register, handleSubmit, formState } = useForm();
	const [randomAvatar, setRandomAvatar] = useState(getRandomAvatar());
	const dispatch = useAppDispatch();

	const { t } = useTranslation();
	const { errors } = formState;

	const onSubmit = (data: {username: string, email:string, password: string}) => {
		dispatch(registerAsync({ ...data, avatarUrl: randomAvatar }));
	};

	const resetRandomAvatar = () => {
		setRandomAvatar(getRandomAvatar());
	};

	const inputFields = [
		{
			name: 'email',
			label: t('auth:sign-up.input.email'),
			requirements: {
				required: true,
				maxLength: 20,
				minLength: 5,
				// eslint-disable-next-line max-len
				pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
			},
			type: 'email',
		},
		{
			name: 'username',
			label: t('auth:sign-up.input.username'),
			requirements: { required: true, maxLength: 20, minLength: 2 },
			type: 'text',
		},
		{
			name: 'password',
			label: t('auth:sign-up.input.password'),
			requirements: { required: true, maxLength: 20, minLength: 5 },
			type: 'password',
		},
	];

	return (
		<>
			<Modal isOpen={isOpen as boolean} onClose={onClose as any}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('auth:sign-up.title')}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box
							rounded="lg"
							bg={useColorModeValue('white', 'gray.700')}
							boxShadow="lg"
							p={8}
						>
							<Stack spacing={4} align="center">
								<Avatar size="xl" src={randomAvatar}>
									<AvatarBadge
										as={IconButton}
										size="sm"
										rounded="full"
										top="-10px"
										colorScheme="green"
										aria-label="remove Image"
										icon={<ChevronRightIcon onClick={resetRandomAvatar} />}
									/>
								</Avatar>
								{
									inputFields.map((field) => {
										const { name, label, requirements, type } = field;
										return <FormControl
											isInvalid={errors?.[name]}
											id={name}
										>
											<FormLabel>{label}</FormLabel>
											<Input
												{...register(name as any, requirements)}
												_invalid={{ backgroundColor: 'red.400' }}
												errorBorderColor="red.300"
												type={type}
											/>
											{errors?.[name]
											&& <Text fontSize="xs">
												{t(`auth:sign-up.input-error.${name}.${errors?.[name].type}`)}
											</Text>}
										</FormControl>;
									})
								}
								<Stack spacing={10}>
									<Stack
										direction={{ base: 'column', sm: 'row' }}
										align="start"
										justify="space-between"
									>
										<Checkbox>{t('auth:sign-up.remember')}</Checkbox>
									</Stack>

								</Stack>
							</Stack>
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button
							colorScheme="red"
							mr={3}
							onClick={onClose}
						>
							{t('auth:sign-up.button.close')}
						</Button>
						<Button
							bg="blue.400"
							color="white"
							_hover={{
								bg: 'blue.500',
							}}
							onClick={handleSubmit(onSubmit)}
						>
							{t('auth:sign-up.button.confirm')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SignupPopup;
