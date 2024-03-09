import React from "react";
import Container from "../components/Container";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const Checkout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Container minW={1000}>
        <Box border="solid" p={5}>
          <Flex alignItems="center" gap={5}>
            <Box className="fa-solid fa-cart-shopping fa-2xl" />
            <Heading size="lg" mb={2}>
              Jūsų paslaugos
            </Heading>
          </Flex>
          <Divider borderColor="black" />
          <Flex mt={2} flexDirection="column">
            <Box fontWeight="bold">
              Driblingo įgūdžių gerinimo treniruočių planas
            </Box>
            <Box>Treneris: Šarūnas Jasikevičius</Box>
            <Flex alignItems="center" alignSelf="end" gap={10} mb={10}>
              <Box>1 vnt.</Box>
              <Box fontWeight="bold">100 Eur</Box>
              <Box cursor="pointer" onClick={onOpen} className="fa-solid fa-x" />
            </Flex>
            <Divider borderColor="black" />
            <Flex mt={10} gap={5} alignSelf="end">
              <Box fontWeight="bold">Viso suma:</Box>
              <Box fontWeight="bold" fontSize="larger">
                100 Eur
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Box border="solid" mt={5} p={5}>
          <Flex alignItems="center" gap={5}>
            <Box className="fa-regular fa-credit-card fa-2xl" />
            <Heading size="lg" mb={2}>
              Mokėjimo būdas
            </Heading>
          </Flex>
          <Divider borderColor="black" />
          <Image mt={5} w={60} src="/Paysera_logo_2022.png" />
        </Box>
        <Box border="solid" mt={5} p={5}>
          <Flex mb={5} alignItems="center" justifyContent="space-between">
            <Box fontWeight="bold" fontSize="large">
              Viso mokėti:
            </Box>
            <Box fontWeight="bold" fontSize="large">
              100 Eur
            </Box>
          </Flex>
          <Divider borderColor="black" />
          <Flex mt={5} justifyContent="center">
            <Button
              backgroundColor="#1E99D6"
              color="white"
              borderRadius="full"
              w={60}
            >
              Užsakyti
            </Button>
          </Flex>
        </Box>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Paslaugos šalinimas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Ar tikrai norite pašalinti paslaugą?</ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Ne
            </Button>
            <Button
              onClick={() => {}}
              backgroundColor="#1E99D6"
              color="white"
            >
              Taip
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Checkout;
