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
} from '@chakra-ui/react';

interface Props {
	popupControl: UseDisclosureProps
	onSubmit: any,
	title: string,
	closeLabel: string,
	confirmLabel: string
}

const PopupLayout: FC<Props> = (props): ReactElement => {
	const { popupControl, onSubmit, children, title, closeLabel, confirmLabel } = props;
	const { isOpen, onClose } = popupControl;

	return (
		<Modal isOpen={isOpen as boolean} onClose={onClose as any}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Box
						rounded="lg"
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow="lg"
						p={8}
					>
						<Stack spacing={4}>
							{children}
						</Stack>
					</Box>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme="red"
						mr={3}
						onClick={onClose}
					>
						{closeLabel}
					</Button>
					<Button
						bg="blue.400"
						color="white"
						_hover={{
							bg: 'blue.500',
						}}
						onClick={onSubmit}
					>
						{confirmLabel}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default PopupLayout;
