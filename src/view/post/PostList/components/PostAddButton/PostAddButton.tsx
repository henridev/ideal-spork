import { FC, ReactElement, useEffect } from 'react';
import { Button, ButtonGroup, IconButton, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import PostPopup from '../PostPopup/PostPopup';
// import { useAppDispatch, useAppSelector } from '../../../shared/hooks/redux.hooks';

const PostAddButton: FC = (): ReactElement => {
	const postCreationPopupControl = useDisclosure();
	const { isOpen, onOpen } = postCreationPopupControl;

	useEffect(() => {
	// dispatch(getAllPostsAsync());
	}, []);

	return (
		<>
			{isOpen && <PostPopup popupControl={postCreationPopupControl} />}
			<ButtonGroup onClick={onOpen} size="sm" colorScheme="green" isAttached variant="outline">
				<Button mr="-px" size="md">create</Button>
				<IconButton
					size="md"
					aria-label="Add to friends"
					icon={<AddIcon />}
				/>
			</ButtonGroup>
		</>
	);
};

export default PostAddButton;
