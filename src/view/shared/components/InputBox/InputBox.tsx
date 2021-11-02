import classNames from 'classnames';
import { ChangeEventHandler, FC, HTMLProps, ReactElement } from 'react';
import styles from './InputBox.module.scss';

type Props = {
	value: string | number
	onChange: ChangeEventHandler<HTMLInputElement>
	className?: string
} & Partial<HTMLProps<HTMLInputElement>>

const InputBox: FC<Props> = (props): ReactElement => (
	<input
		{...props}
		className={classNames(styles.textbox, 'input')}
	/>
);

InputBox.defaultProps = {
	className: '',
};

export default InputBox;
