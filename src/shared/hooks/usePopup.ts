import { useState, useCallback, useRef } from 'react';

const usePopup = () => {
	const [visible, setVisible] = useState(false);
	const onHide = useRef(() => { });
	const show = useCallback(() => setVisible(true), []);
	const hide = useCallback(() => {
		setVisible(false);
		if (onHide.current) {
			onHide.current();
		}
	}, []);

	return {
		visible,
		setVisible,
		show,
		hide,
		onHide,
	};
};

export type PopupControl = ReturnType<typeof usePopup>

export default usePopup;
