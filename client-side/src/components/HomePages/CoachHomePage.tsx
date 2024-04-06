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

const CoachHomePage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
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
            <Button backgroundColor="#1E99D6" color="white">
              Naujas įgūdis
            </Button>
            <Button>Įgūdis</Button>
            <Button>Įgūdis</Button>
            <Button>Įgūdis</Button>
            <Button>Įgūdis</Button>
            <Button backgroundColor="#1E99D6" color="white">
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
            <Button backgroundColor="#1E99D6" color="white" onClick={onOpen}>
              Naujas planas
            </Button>
            <Button>Pratimas</Button>
            <Button>Pratimas</Button>
            <Button>Pratimas</Button>
            <Button>Pratimas</Button>
            <Button backgroundColor="#1E99D6" color="white">
              Visi pratimai
            </Button>
          </Flex>
        </Flex>
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <NewExerciseForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CoachHomePage;
