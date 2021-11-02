import classNames from 'classnames';
import { FC, HTMLInputTypeAttribute, ReactElement } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './InputField.module.scss';

type Props = {
	name: string,
	register: UseFormRegister<FieldValues>,
	requirements: FieldValues,
	errors: Record<string, any>
	type: HTMLInputTypeAttribute,
	className?: string
}

const InputField: FC<Props> = (props): ReactElement => {
	const { name = '', register, requirements, errors, type = 'text', className } = props;

	return (
		<div className={className}>
			<span className={classNames('tag', 'is-medium', styles.label)}>
				{name}
			</span>
			<input
				{...register(name as any, requirements)}
				className={classNames('input', styles.input)}
				type={type}
			/>
			{errors?.[name]?.type === 'required' && (
				<div className="has-text-danger">
					{name}
					{' '}
					is required
				</div>
			)}
		</div>
	);
};

InputField.defaultProps = {
	className: '',
};

export default InputField;
