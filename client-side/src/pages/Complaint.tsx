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
  Spinner,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Unauthorized } from "../Helpers/constants";
import toast from "react-hot-toast";
import eventBus from "../Helpers/eventBus";
import ModalWindow from "../components/ModalWindow";
import handleErrorMessage from "../Helpers/errorHandler";

const Complaint = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [complaint, setComplaint] = useState<string>("");
  const [coach, setCoach] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const getCoachDetails = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `user/coachDetails/${id}`,
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
      const coach = await response.json();
      setCoach(coach.fullName);
      setIsLoading(false);
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
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

    if (complaint.replace(/\s/g, "").length < 1) {
      toast.error("Neužpildėte skundo reikšmės");
      return;
    }

    const response = await fetch(import.meta.env.VITE_API_URL + "complaint", {
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
      navigate("/allCoaches");
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
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
            <Heading textAlign="center">Trenerio skundas: {coach}</Heading>
            <Flex
              mt={10}
              p={5}
              w={600}
              borderRadius="xl"
              border="solid"
              borderColor="#9e9d9d"
              borderWidth="2px"
              flexDirection="column"
              gap={5}
            >
              <Heading size="md">Skundo aprašymas</Heading>
              <Textarea
                onChange={onComplaintChange}
                placeholder="Skundo aprašymas"
                border="solid"
                borderWidth="1px"
              ></Textarea>
              <Button
                alignSelf="end"
                w={28}
                textTransform="uppercase"
                background="#1E99D6"
                textColor="white"
                borderRadius="2xl"
                onClick={onOpen}
              >
                Pateikti
              </Button>
            </Flex>
          </>
        )}
      </Container>
      <ModalWindow
        title="Skundo pateikimas"
        text="Ar tikrai norite pateikti skundą?"
        isOpen={isOpen}
        onClose={onClose}
        onClick={submitComplaint}
      />
    </>
  );
};

export default Complaint;
