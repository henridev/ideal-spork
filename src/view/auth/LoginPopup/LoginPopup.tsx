import { FC, ReactElement } from 'react';
import {
	UseDisclosureProps,
	FormControl,
	FormLabel,
	Input,
	Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { loginAsync } from '../../../domains/auth/auth.thunks';
import { useAppDispatch } from '../../../shared/hooks/redux.hooks';
import { PopupLayout } from '../../shared/components';

type Props = {popupControl: UseDisclosureProps }

const LoginPopup: FC<Props> = (props): ReactElement => {
	const { popupControl } = props;
	const { register, handleSubmit, formState } = useForm();
	const dispatch = useAppDispatch();

	const { t } = useTranslation();
	const { errors } = formState;

	const onSubmit = (data: any) => {
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
		<PopupLayout
			popupControl={popupControl}
			onSubmit={handleSubmit(onSubmit)}
			title={t('auth:login.title')}
			closeLabel={t('auth:login.button.close')}
			confirmLabel={t('auth:login.button.confirm')}
		>
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
		</PopupLayout>
	);
};

export default LoginPopup;
