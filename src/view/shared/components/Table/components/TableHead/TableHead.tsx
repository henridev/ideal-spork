import classNames from 'classnames';
import { FC, HTMLProps, ReactElement } from 'react';
import { Thead, Tfoot, Tr, Th } from '@chakra-ui/react';
import styles from './TableHead.module.scss';

type Props = {
	titles: {title?:string, label:string, isNumeric?: boolean}[]
	className?: string,
	isFooter?: boolean
} & Partial<HTMLProps<HTMLHeadElement>>

const TableHead: FC<Props> = (props): ReactElement => {
	const { titles, className, isFooter } = props;
	const Head = ({ children }: any) => (isFooter
		? <Tfoot className={classNames(styles.table_head, className)}>
			{children}
		</Tfoot>
		: <Thead className={classNames(styles.table_head, className)}>
			{children}
		</Thead>);

	return (
		<Head>
			<Tr>
				{titles.map((t) => {
					const { title, label, isNumeric } = t;
					return <Th isNumeric={isNumeric} key={label || title}>{label}</Th>;
				})}
			</Tr>
		</Head>
	);
};

TableHead.defaultProps = {
	className: '',
	isFooter: false,
};

export default TableHead;
