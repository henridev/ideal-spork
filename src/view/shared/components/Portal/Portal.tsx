import { FC, HTMLProps, ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// import _styles from './Portal.module.scss';

// const styles = _styles as Record<string, string>;

type Props = { className?: string, el?: string} & Partial<HTMLProps<HTMLDivElement>>

const Portal: FC<Props> = ({ children, className = 'root-portal', el = 'div' }): ReactElement => {
	const [container] = useState(() => document.createElement(el));

	useEffect(() => {
		if (container) {
			container.classList.add(className);
			document.body.appendChild(container);
		}
		return () => {
			document.body.removeChild(container);
		};
	}, [container]);

	return createPortal(children, container);
};

export default Portal;
