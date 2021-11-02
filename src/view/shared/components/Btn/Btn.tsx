import classNames from 'classnames';
import { FC, HTMLProps, ReactElement } from 'react';
import styles from './Btn.module.scss';

type Props = {
	label:string
	className?: string
} & Partial<HTMLProps<HTMLButtonElement>>

const Btn: FC<Props> = (props): ReactElement => {
	const { label, className } = props;
	return (
		<button
			{...props}
			type="button"
			className={classNames('button', className, styles.button)}
		>
			{label}
		</button>
	);
};

Btn.defaultProps = {
	className: '',
};

export default Btn;
