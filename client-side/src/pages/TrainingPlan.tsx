import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TrainingPlanViewDto } from "../Types/types";
import toast from "react-hot-toast";
import { Unauthorized } from "../Helpers/constants";
import eventBus from "../Helpers/eventBus";
import Container from "../components/Container";

const TrainingPlan = () => {
  const token = localStorage.getItem("accessToken");
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlanViewDto>();
  const [isLoading, setIsLoading] = useState(true);

  const getTrainingPlan = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `trainingPlan/${id}`,
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
      const trainingPlan = await response.json();
      setTrainingPlan(trainingPlan);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    getTrainingPlan();
  }, [getTrainingPlan]);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(import.meta.env.VITE_API_URL + "order", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        trainingPlanId: id,
      }),
    });

    if (response.status === 201) {
      const id = await response.json();
      navigate(`/checkout/${id}`);
    }
  };

  return (
    <Container minW={1000}>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <>
          <Flex
            boxShadow="dark-lg"
            borderRadius="xl"
            border="solid"
            borderColor="#9e9d9d"
            flexDirection="column"
            gap={2}
            p={5}
          >
            <Heading>{trainingPlan?.title}</Heading>
            <Flex>
              <Box fontWeight="bold">Treneris:&nbsp;</Box>
              {trainingPlan?.coach.toUpperCase()}
            </Flex>
            <Box>{trainingPlan?.description}</Box>
            <Flex alignSelf="end" gap={2}>
              <Box fontWeight="bold">KAINA</Box>
              <Box>{trainingPlan?.price} EUR</Box>
            </Flex>
            <Button
              backgroundColor="#1E99D6"
              color="white"
              w={44}
              alignSelf="end"
              onClick={handleSubmit}
            >
              Užsakyti
            </Button>
          </Flex>
          <Heading size="md" mt={5}>
            Treniruočių plano turinys
          </Heading>
          <Flex
            boxShadow="dark-lg"
            borderRadius="xl"
            border="solid"
            borderColor="#9e9d9d"
            flexDirection="column"
            gap={2}
            p={5}
            mt={5}
          >
            <Heading size="md">ĮGŪDŽIAI</Heading>
            <Accordion allowToggle>
              {trainingPlan?.skills.map((skill) => {
                return (
                  <AccordionItem>
                    <AccordionButton border="solid" borderColor="#9e9d9d">
                      <Box as="span" flex="1" textAlign="left">
                        {skill.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel border="solid" borderColor="#9e9d9d" pb={4}>
                      <Flex flexDirection="column">
                        {skill.exercises.map((exercise) => {
                          return (
                            <Flex alignItems="center" gap={2}>
                              <Box className="fa-regular fa-circle-play" />
                              <Box>{exercise}</Box>
                            </Flex>
                          );
                        })}
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Flex>
        </>
      )}
    </Container>
  );
};

export default TrainingPlan;
