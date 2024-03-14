import { Modal, Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { MouseEvent } from "react";

type ModalWindowProps = {
    title: string;
    text: string;
    isOpen: boolean;
    onClose: () => void;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};
export default function ModalWindow(props: ModalWindowProps) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{props.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{props.text}</ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={props.onClose}>
                        Ne
                    </Button>
                    <Button
                        onClick={(e) => props.onClick(e)}
                        backgroundColor="#1E99D6"
                        color="white"
                    >
                        Taip
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}