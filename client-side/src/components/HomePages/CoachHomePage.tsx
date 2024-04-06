import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import NewExerciseForm from "../forms/NewExerciseForm";
import NewSkillForm from "../forms/NewSkillForm";
import { useState } from "react";
import eventBus from "../../Helpers/eventBus";
import { useNavigate } from "react-router";

const CoachHomePage = () => {
  const exerciseModal = useDisclosure();
  const skillModal = useDisclosure();
  const [isExerciseFromSkill, setIsExerciseFromSkill] = useState(false);
  const navigate = useNavigate();

  const addNewExercise = () => {
    setIsExerciseFromSkill(true);
    exerciseModal.onOpen();
  };

  const onExerciseClose = () => {
    if (isExerciseFromSkill) {
      eventBus.dispatch("triggerExercisesList", null);
    }
    exerciseModal.onClose();
  };

  return (
    <>
      <SimpleGrid columns={3} m={10} gap={5}>
        <Flex
          boxShadow="dark-lg"
          borderRadius="xl"
          border="solid"
          borderColor="#9e9d9d"
          flexDirection="column"
          position="relative"
          justifyContent="center"
          alignItems="center"
          py={5}
        >
          <Heading size="lg" position="relative">
            Treniruočių planai
          </Heading>
          <Box className="fa-solid fa-list-check fa-8x" my={2} />
          <Flex flexDirection="column" gap={5} w="70%">
            <Button backgroundColor="#1E99D6" color="white">
              Naujas planas
            </Button>
            <Button>Treniruočių planas</Button>
            <Button>Treniruočių planas</Button>
            <Button>Treniruočių planas</Button>
            <Button>Treniruočių planas</Button>
            <Button backgroundColor="#1E99D6" color="white">
              Visi planai
            </Button>
          </Flex>
        </Flex>
        <Flex
          boxShadow="dark-lg"
          borderRadius="xl"
          border="solid"
          borderColor="#9e9d9d"
          flexDirection="column"
          position="relative"
          justifyContent="center"
          alignItems="center"
          py={5}
        >
          <Heading size="lg" position="relative">
            Įgūdžiai
          </Heading>
          <Box className="fa-solid fa-basketball fa-8x" my={2} />
          <Flex flexDirection="column" gap={5} w="70%">
            <Button
              backgroundColor="#1E99D6"
              color="white"
              onClick={skillModal.onOpen}
            >
              Naujas įgūdis
            </Button>
            <Button>Įgūdis</Button>
            <Button>Įgūdis</Button>
            <Button>Įgūdis</Button>
            <Button>Įgūdis</Button>
            <Button
              backgroundColor="#1E99D6"
              color="white"
              onClick={() => navigate("/skills")}
            >
              Visi įgūdžiai
            </Button>
          </Flex>
        </Flex>
        <Flex
          boxShadow="dark-lg"
          borderRadius="xl"
          border="solid"
          borderColor="#9e9d9d"
          flexDirection="column"
          position="relative"
          justifyContent="center"
          alignItems="center"
          py={5}
        >
          <Heading size="lg" position="relative">
            Pratimai
          </Heading>
          <Box className="fa-solid fa-person-running fa-8x" my={2} />
          <Flex flexDirection="column" gap={5} w="70%">
            <Button
              backgroundColor="#1E99D6"
              color="white"
              onClick={exerciseModal.onOpen}
            >
              Naujas planas
            </Button>
            <Button>Pratimas</Button>
            <Button>Pratimas</Button>
            <Button>Pratimas</Button>
            <Button>Pratimas</Button>
            <Button
              backgroundColor="#1E99D6"
              color="white"
              onClick={() => navigate("/exercises")}
            >
              Visi pratimai
            </Button>
          </Flex>
        </Flex>
      </SimpleGrid>
      <Modal isOpen={exerciseModal.isOpen} onClose={exerciseModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <NewExerciseForm onClose={onExerciseClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={skillModal.isOpen} onClose={skillModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <NewSkillForm
              onClose={skillModal.onClose}
              addNewExercise={addNewExercise}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CoachHomePage;
