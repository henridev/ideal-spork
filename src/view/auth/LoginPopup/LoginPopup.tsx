// import { FC, ReactElement } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useForm } from 'react-hook-form';
// import classNames from 'classnames';
// import { PopupControl } from '../../../shared/hooks/usePopup';
// import { InputField, Portal } from '../../shared/components';
// import styles from './LoginPopup.module.scss';
// import { useAppDispatch } from '../../../shared/hooks/redux.hooks';
// import { loginAsync } from '../../../domains/auth/auth.thunks';

// type Props = {popupControl: PopupControl}

// const LoginPopup: FC<Props> = (props): ReactElement => {
// 	const dispatch = useAppDispatch();
// 	const { popupControl } = props;
// 	const { register, handleSubmit, formState } = useForm();
// 	const { t } = useTranslation();
// 	const { errors } = formState;

// 	const onSubmit = (data: {username: string, password: string}) => {
// 		dispatch(loginAsync(data));
// 	};

// 	return (
// 		<Portal>
// 			<div className={classNames('modal', { 'is-active': popupControl.visible })}>
// 				<div className="modal-background" role="presentation" onClick={popupControl.hide} />
// 				<div className="modal-content">
// 					<form onSubmit={handleSubmit(onSubmit)} className="box">
// 						<h3 className="title is-3">{t('auth:login.title')}</h3>
// 						<InputField
// 							className={styles.input_container}
// 							name="username"
// 							register={register}
// 							requirements={{ required: true, maxLength: 20 }}
// 							errors={errors}
// 							type="text"
// 						/>
// 						<InputField
// 							className={styles.input_container}
// 							name="password"
// 							register={register}
// 							requirements={{ required: true, maxLength: 20 }}
// 							errors={errors}
// 							type="password"
// 						/>
// 						<input type="submit" className={classNames('button', 'is-primary', styles.button)} />
// 					</form>
// 				</div>
// 			</div>
// 			<button
// 				type="button"
// 				onClick={popupControl.hide}
// 				className={classNames('modal-close', 'is-large', styles.close)}
// 				aria-label="close"
// 			/>
// 		</Portal>
// 	);
// };

// export default LoginPopup;

import { FC, ReactElement } from 'react';
import { Button,
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
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { loginAsync } from '../../../domains/auth/auth.thunks';
import { useAppDispatch } from '../../../shared/hooks/redux.hooks';

type Props = {popupControl: UseDisclosureProps }

const LoginPopup: FC<Props> = (props): ReactElement => {
	const { popupControl } = props;
	const { isOpen, onClose } = popupControl;
	const { register, handleSubmit, formState } = useForm();
	const dispatch = useAppDispatch();

	const { t } = useTranslation();
	const { errors } = formState;

	const onSubmit = (data: {username: string, password: string}) => {
		dispatch(loginAsync(data));
	};

	const inputFields = [
		{
			name: 'username',
			label: t('auth:login.input.username'),
			requirements: { required: true, maxLength: 20, minLength: 2 },
			type: 'text',
		},
		{
			name: 'password',
			label: t('auth:login.input.password'),
			requirements: { required: true, maxLength: 20, minLength: 5 },
			type: 'password',
		},
	];

	return (
		<>
			<Modal isOpen={isOpen as boolean} onClose={onClose as any}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('auth:login.title')}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box
							rounded="lg"
							bg={useColorModeValue('white', 'gray.700')}
							boxShadow="lg"
							p={8}
						>
							<Stack spacing={4}>
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
												{t(`auth:login.input-error.${name}.${errors?.[name].type}`)}
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
										<Checkbox>{t('auth:login.remember')}</Checkbox>
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
							{t('auth:login.button.close')}
						</Button>
						<Button
							bg="blue.400"
							color="white"
							_hover={{
								bg: 'blue.500',
							}}
							onClick={handleSubmit(onSubmit)}
						>
							{t('auth:login.button.confirm')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default LoginPopup;
