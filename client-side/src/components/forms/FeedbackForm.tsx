import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, MouseEvent, ChangeEvent } from "react";
import ModalWindow from "../ModalWindow";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import handleErrorMessage from "../../Helpers/errorHandler";

interface Props {
  coachId: string;
}

const FeedbackForm = ({ coachId }: Props) => {
  const [stars, setStars] = useState<string[]>(Array(5).fill("regular"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<string>("");

  const handleClick = (index: number) => {
    const updatedStars = stars.map((_, i) => {
      if (i <= index) {
        return "solid";
      } else {
        return "regular";
      }
    });
    setStars(updatedStars);
  };

  const onFeedbackChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(event.target.value);
  };

  const submitFeedback = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (feedback.replace(/\s/g, "").length < 1 || !stars.includes("solid")) {
      toast.error("Neužpildėte visų reikšmių");
      return;
    }

    const response = await fetch(import.meta.env.VITE_API_URL + "feedback", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        feedbackText: feedback,
        rating: stars.filter((x) => x === "solid").length,
        coachId: coachId,
      }),
    });
    if (response.status === 201) {
      toast.success("Atsiliepimas pateiktas sėkmingai!");
      navigate("/allCoaches");
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  };

  return (
    <>
      <Flex flexDir="column" gap={5} mb={5} mt={5}>
        <Text>Įvertinkite trenerį</Text>
        <Flex>
          {stars.map((star, index) => (
            <Box
              cursor="pointer"
              key={index}
              className={`fa-${star} fa-star fa-2x`}
              onClick={() => handleClick(index)}
            ></Box>
          ))}
        </Flex>
        <Text>Atsiliepimas apie trenerį: </Text>
        <Textarea
          onChange={onFeedbackChange}
          border="solid"
          borderWidth="1px"
        />
        <Flex justify="flex-end" mr={5}>
          <Button
            textTransform="uppercase"
            background="#1E99D6"
            textColor="white"
            borderRadius="2xl"
            onClick={onOpen}
          >
            PATEIKTI
          </Button>
        </Flex>
      </Flex>
      <ModalWindow
        title="Atsiliepimo pateikimas"
        text="Ar tikrai norite pateikti atsiliepimą?"
        isOpen={isOpen}
        onClose={onClose}
        onClick={submitFeedback}
      />
    </>
  );
};

export default FeedbackForm;
