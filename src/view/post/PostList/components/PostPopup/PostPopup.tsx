import { FC, ReactElement } from 'react';
import { UseDisclosureProps,
	FormControl,
	FormLabel,
	Input,
	Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Post } from '../../../../../domains/post/post.state';
import { useAppDispatch } from '../../../../../shared/hooks/redux.hooks';
import { createPostAsync, putPostAsync } from '../../../../../domains/post';
import { PopupLayout } from '../../../../shared/components';

type Props = {
	popupControl: UseDisclosureProps,
	defaultValues?: Record<string, any>,
	type?: 'create' | 'update'
}

const PostCreationPopup: FC<Props> = (props): ReactElement => {
	const { popupControl, defaultValues, type } = props;
	const { register, handleSubmit, formState } = useForm({
		defaultValues,
	});
	const dispatch = useAppDispatch();

	const { t } = useTranslation();
	const { errors } = formState;

	const onSubmit = (data: Post) => {
		dispatch(type === 'create' ? createPostAsync(data) : putPostAsync(data));
	};

	const inputFields = [
		{
			name: 'author',
			label: t('post:create.input.author'),
			requirements: { required: true, maxLength: 20, minLength: 2 },
			type: 'text',
		},
		{
			name: 'title',
			label: t('post:create.input.title'),
			requirements: { required: true, maxLength: 20, minLength: 2 },
			type: 'text',
		},
		{
			name: 'body',
			label: t('post:create.input.body'),
			requirements: { required: true, maxLength: 200, minLength: 5 },
			type: 'text',
		},
	];

	return (
		<PopupLayout
			popupControl={popupControl}
			onSubmit={handleSubmit(onSubmit)}
			title={t('post:create.title')}
			closeLabel={t('post:create.button.close')}
			confirmLabel={t('post:create.button.confirm')}
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
						{errors?.[name] && <Text fontSize="xs">
							{t(`post:login.input-error.${name}.${errors?.[name].type}`)}
						</Text>}
					</FormControl>;
				})
			}
		</PopupLayout>
	);
};

PostCreationPopup.defaultProps = {
	defaultValues: {},
	type: 'create',
};

export default PostCreationPopup;
