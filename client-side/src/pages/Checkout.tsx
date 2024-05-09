import { useNavigate, useParams } from "react-router-dom";
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
  Spinner,
  Center,
  Textarea,
} from "@chakra-ui/react";
import {
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  ChangeEvent,
} from "react";
import toast from "react-hot-toast";
import { Unauthorized } from "../Helpers/constants";
import eventBus from "../Helpers/eventBus";
import { CheckoutDto } from "../Types/types";
import handleErrorMessage from "../Helpers/errorHandler";

const Checkout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDto>();
  const [trainingPlanRequest, setTrainingPlanRequest] = useState<string | null>(
    null
  );
  const token = localStorage.getItem("accessToken");
  const { id } = useParams();
  const navigate = useNavigate();

  const getCheckoutDetails = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `order/checkout/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const details = await response.json();
      setCheckoutDetails(details);
      setIsLoading(false);
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  }, []);

  const handleTrainingPlanRequestChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTrainingPlanRequest(e.target.value);
  };

  const submitCheckout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(import.meta.env.VITE_API_URL + "paysera", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        orderNumber: id,
        amount: checkoutDetails?.price,
        trainingPlanRequest,
      }),
    });

    if (response.status === 200) {
      const url = await response.text();
      window.location.replace(url);
    }
  };

  const cancelOrder = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(import.meta.env.VITE_API_URL + `order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });

    if (response.status === 204) {
      toast.success("Užsakymas sėkmingai pašalintas!");
      onClose();
      navigate("/");
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  };

  useEffect(() => {
    getCheckoutDetails();
  }, [getCheckoutDetails]);

  return (
    <>
      <Container minW={1000}>
        {isLoading ? (
          <Center>
            <Spinner size="xl" textAlign="center" />
          </Center>
        ) : (
          <>
            <Box
              borderRadius="xl"
              border="solid"
              borderColor="#9e9d9d"
              borderWidth="2px"
              p={5}
            >
              <Flex alignItems="center" gap={5}>
                <Box className="fa-solid fa-cart-shopping fa-2xl" />
                <Heading size="lg" mb={2}>
                  Jūsų paslaugos
                </Heading>
              </Flex>
              <Divider borderColor="black" />
              <Flex mt={2} flexDirection="column">
                <Box fontWeight="bold">
                  {checkoutDetails?.trainingPlanTitle}
                </Box>
                <Box>{`Treneris: ${checkoutDetails?.coachFullName}`}</Box>
                <Flex alignItems="center" alignSelf="end" gap={10} mb={10}>
                  <Box>1 vnt.</Box>
                  <Box fontWeight="bold">{`${checkoutDetails?.price} Eur`}</Box>
                  <Box
                    cursor="pointer"
                    onClick={onOpen}
                    className="fa-solid fa-x"
                  />
                </Flex>
                <Divider borderColor="black" />
                <Flex mt={10} gap={5} alignSelf="end">
                  <Box fontWeight="bold">Viso suma:</Box>
                  <Box fontWeight="bold" fontSize="larger">
                    {`${checkoutDetails?.price} Eur`}
                  </Box>
                </Flex>
              </Flex>
            </Box>
            {checkoutDetails?.isPersonal && (
              <Box
                borderRadius="xl"
                border="solid"
                borderColor="#9e9d9d"
                borderWidth="2px"
                p={5}
                mt={5}
              >
                <Flex alignItems="center" gap={5}>
                  <Box className="fa-solid fa-cart-shopping fa-2xl" />
                  <Heading size="lg" mb={2}>
                    Individualaus plano užklausa
                  </Heading>
                </Flex>
                <Divider borderColor="black" />
                <Flex mt={2} flexDirection="column">
                  <Box>
                    Nurodykite savo lūkesčius individualiam treniruočių planui:
                  </Box>
                  <Textarea
                    value={trainingPlanRequest as string}
                    onChange={handleTrainingPlanRequestChange}
                    borderRadius="xl"
                    border="solid"
                    borderColor="#9e9d9d"
                    borderWidth="2px"
                    mt={5}
                  />
                </Flex>
              </Box>
            )}
            <Box
              borderRadius="xl"
              border="solid"
              borderColor="#9e9d9d"
              borderWidth="2px"
              mt={5}
              p={5}
            >
              <Flex alignItems="center" gap={5}>
                <Box className="fa-regular fa-credit-card fa-2xl" />
                <Heading size="lg" mb={2}>
                  Mokėjimo būdas
                </Heading>
              </Flex>
              <Divider borderColor="black" />
              <Image
                borderRadius="xl"
                mt={5}
                w={60}
                src="/Paysera_logo_2022.png"
              />
            </Box>
            <Box
              borderRadius="xl"
              border="solid"
              borderColor="#9e9d9d"
              borderWidth="2px"
              mt={5}
              p={5}
            >
              <Flex mb={5} alignItems="center" justifyContent="space-between">
                <Box fontWeight="bold" fontSize="large">
                  Viso mokėti:
                </Box>
                <Box fontWeight="bold" fontSize="large">
                  {`${checkoutDetails?.price} Eur`}
                </Box>
              </Flex>
              <Divider borderColor="black" />
              <Flex mt={5} justifyContent="center">
                <Button
                  textTransform="uppercase"
                  background="#1E99D6"
                  textColor="white"
                  borderRadius="2xl"
                  w={60}
                  onClick={submitCheckout}
                >
                  Užsakyti
                </Button>
              </Flex>
            </Box>
          </>
        )}
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Paslaugos šalinimas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Ar tikrai norite pašalinti paslaugą?</ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              textTransform="uppercase"
              borderRadius="2xl"
              onClick={onClose}
            >
              Ne
            </Button>
            <Button
              onClick={cancelOrder}
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

export default Checkout;
