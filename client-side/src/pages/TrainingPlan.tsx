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
import handleErrorMessage from "../Helpers/errorHandler";

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
      const err = await handleErrorMessage(response);
      toast.error(err);
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
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
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
            borderRadius="xl"
            border="solid"
            borderColor="#9e9d9d"
            borderWidth="2px"
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
              textTransform="uppercase"
              background="#1E99D6"
              textColor="white"
              borderRadius="2xl"
              w={44}
              alignSelf="end"
              onClick={handleSubmit}
            >
              Užsakyti
            </Button>
          </Flex>
          {!trainingPlan?.isPersonal && (
            <>
              <Heading size="md" mt={5}>
                Treniruočių plano turinys
              </Heading>
              <Flex
                borderRadius="xl"
                border="solid"
                borderColor="#9e9d9d"
                borderWidth="2px"
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
                        <AccordionButton
                          borderRadius="xl"
                          border="solid"
                          borderColor="#9e9d9d"
                          borderWidth="2px"
                        >
                          <Box as="span" flex="1" textAlign="left">
                            {skill.name}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel
                          borderRadius="xl"
                          border="solid"
                          borderColor="#9e9d9d"
                          borderWidth="2px"
                          pb={4}
                        >
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
        </>
      )}
    </Container>
  );
};

export default TrainingPlan;
