import {
  FormLabel,
  Box,
  Flex,
  Button,
  Center,
  Spinner,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, ChangeEvent, MouseEvent } from "react";
import toast from "react-hot-toast";
import handleErrorMessage from "../../Helpers/errorHandler";

interface Props {
  trainingPlanId: string;
  exerciseId: string;
  onClose: () => void;
  skillId: string;
}

const ExerciseProgressForm = ({
  trainingPlanId,
  exerciseId,
  onClose,
  skillId,
}: Props) => {
  const [fileState, setFileState] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("accessToken");
  const confirmationModal = useDisclosure();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileState(event.target.files[0]);
    }
  };

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    confirmationModal.onClose();
    e.preventDefault();
    const formData = new FormData();
    formData.append("exerciseProgressVideo", fileState as Blob);
    formData.append("trainingPlanId", trainingPlanId);
    formData.append("exerciseId", exerciseId);
    formData.append("skillId", skillId);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}exerciseFlow/uploadExerciseProgress`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      setIsLoading(false);
      onClose();
      window.location.reload();
      toast.success("Pratimo progresas sėkmingai įkeltas");
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <form>
          <Flex flexDir="column">
            <FormLabel>Progreso įkėlimas</FormLabel>
            <Box>
              <input
                onChange={handleFileChange}
                className="form-control"
                type="file"
                id="formFile"
              />
            </Box>
            <Button
              textTransform="uppercase"
              background="#1E99D6"
              textColor="white"
              borderRadius="2xl"
              mt={10}
              w={52}
              alignSelf="end"
              onClick={confirmationModal.onOpen}
            >
              Įkelti progresą
            </Button>
          </Flex>
        </form>
      )}
      <Modal
        isOpen={confirmationModal.isOpen}
        onClose={confirmationModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Progreso įkėlimas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Ar tikrai norite įkelti progreso įrašą?</ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              borderRadius="2xl"
              textTransform="uppercase"
              onClick={confirmationModal.onClose}
            >
              Ne
            </Button>
            <Button
              onClick={onSubmit}
              textTransform="uppercase"
              background="#1E99D6"
              textColor="white"
              borderRadius="2xl"
            >
              Taip
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExerciseProgressForm;
