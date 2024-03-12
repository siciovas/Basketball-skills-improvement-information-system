import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Container from "../components/Container";
import {
  Button,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_ADDRESS, Unauthorized } from "../Helpers/constants";
import toast from "react-hot-toast";
import eventBus from "../Helpers/eventBus";

const Complaint = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [complaint, setComplaint] = useState<string>("");
  const [coach, setCoach] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const getCoachDetails = useCallback(async () => {
    const response = await fetch(URL_ADDRESS + `user/coachDetails/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const coach = await response.json();
      setCoach(coach.fullName);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    getCoachDetails();
  }, [getCoachDetails]);

  const onComplaintChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComplaint(event.target.value);
  };

  const submitComplaint = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(URL_ADDRESS + "complaint", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        text: complaint,
        coachId: id,
      }),
    });
    if (response.status === 201) {
      toast.success("Skundas pateiktas sėkmingai!");
      navigate("/");
    } else {
      toast.error("Įvyko klaida");
    }
  };

  return (
    <>
      <Container>
        {isLoading ? (
          <Center>
            <Spinner size="xl" textAlign="center" />
          </Center>
        ) : (
          <>
            <Heading textAlign="center">Skundo pateikimo forma</Heading>
            <Flex
              mt={10}
              p={5}
              boxShadow="dark-lg"
              w={600}
              borderRadius="xl"
              border="solid"
              borderColor="#9e9d9d"
              flexDirection="column"
              gap={5}
            >
              <Heading size="md">{coach}</Heading>
              <Textarea
                onChange={onComplaintChange}
                placeholder="Skundo aprašymas"
              ></Textarea>
              <Button
                alignSelf="end"
                w={28}
                backgroundColor="#1E99D6"
                color="white"
                onClick={onOpen}
              >
                Pateikti
              </Button>
            </Flex>
          </>
        )}
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Skundo pateikimas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Ar tikrai norite pateikti skundą?</ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Ne
            </Button>
            <Button
              onClick={submitComplaint}
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

export default Complaint;
