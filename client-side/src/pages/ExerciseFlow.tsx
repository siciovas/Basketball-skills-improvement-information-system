import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import ExerciseProgressForm from "../components/forms/ExerciseProgressForm";

const ExerciseFlow = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Box>
        <Heading>Pratimo progresas</Heading>
        <Button onClick={onOpen}>Įkelti progresą</Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ExerciseProgressForm
              onClose={onClose}
              trainingPlanId=""
              exerciseId=""
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExerciseFlow;
