import {
  Container,
  Center,
  Spinner,
  Heading,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Text,
  Progress,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { DIFFICULTIES, Unauthorized } from "../Helpers/constants";
import eventBus from "../Helpers/eventBus";
import ReactPlayer from "react-player";
import { TrainingPlanExecutionDto } from "../Types/types";
import ExerciseProgressForm from "../components/forms/ExerciseProgressForm";
import moment from "moment";
import handleErrorMessage from "../Helpers/errorHandler";

const TrainingPlanExecution = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlanExecutionDto>();
  const [exerciseId, setExerciseId] = useState<string | null>(null);
  const [skillId, setSkillId] = useState<string | null>(null);

  const getTrainingPlan = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `trainingPlan/planExecution/${id}`,
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

  const handleProgressUpload = (exerciseId: string, skillId: string) => {
    setExerciseId(exerciseId);
    setSkillId(skillId);
    onOpen();
  };

  useEffect(() => {
    getTrainingPlan();
  }, [getTrainingPlan]);

  return (
    <Container minW={1000}>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <>
          <Heading size="md" mt={5}>
            {trainingPlan?.title}
          </Heading>
          <Heading size="sm" mt={2} textTransform="uppercase">
            {trainingPlan?.coach}
          </Heading>
          <Flex align="end">
            <Text fontWeight="bold" mt={2} textTransform="uppercase">
              Terminas:&nbsp;
            </Text>
            <Text>
              {moment(
                new Date(moment(trainingPlan?.deadline).utc(true).toString())
              ).format("YYYY-MM-DD")}
            </Text>
          </Flex>
          <Flex
            borderRadius="xl"
            border="solid"
            borderColor="#9e9d9d"
            borderWidth="2px"
            flexDirection="column"
            p={5}
            mt={5}
          >
            <Heading size="md">{trainingPlan?.title}</Heading>
            <Flex justifyContent="space-between">
              <Progress
                colorScheme="blue"
                value={trainingPlan?.progressCounter as unknown as number}
                w="85%"
                mt={5}
              />
              <Flex flexDir="column" mt={3}>
                <Text>
                  {trainingPlan?.progressCounter === "100.0"
                    ? "Galutinis įvertis"
                    : "Numatomas įvertis"}
                </Text>
                <Flex align="center" w="100%" justify="flex-end">
                  <Box
                    className="fa-solid fa-star fa-2x"
                    style={{ color: "#1E99D6" }}
                  />
                  <Heading textColor="#1E99D6">
                    {trainingPlan?.finalMark}
                  </Heading>
                </Flex>
              </Flex>
            </Flex>
            <Flex>
              <Text fontWeight="bold">Plano progresas:&nbsp;</Text>
              <Text>{trainingPlan?.progressCounter}%</Text>
            </Flex>
          </Flex>
          <Flex
            borderRadius="xl"
            border="solid"
            borderColor="#9e9d9d"
            borderWidth="2px"
            flexDirection="column"
            gap={2}
            p={5}
            mt={5}
            mb={14}
          >
            <Heading size="md">ĮGŪDŽIAI</Heading>
            <Accordion allowToggle>
              {trainingPlan?.skills.map((skill, skillIndex) => {
                const isSkillDisabled =
                  trainingPlan.skills.findIndex((x) => x.isLocked) ===
                  skillIndex
                    ? false
                    : skill.isLocked;
                return (
                  <AccordionItem isDisabled={isSkillDisabled}>
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
                      <Box as="span" flex="1" textAlign="left">
                        {skill.description}
                      </Box>
                      <Accordion allowToggle>
                        <Flex mt={5} flexDirection="column">
                          {skill.exercises.map((exercise, index) => {
                            const isDisabled =
                              skill.exercises.findIndex((x) => x.isLocked) ===
                              index
                                ? false
                                : exercise.isLocked;
                            return (
                              <AccordionItem isDisabled={isDisabled}>
                                <AccordionButton>
                                  <Flex
                                    color={isDisabled ? "black" : "#1E99D6"}
                                    alignItems="center"
                                    gap={2}
                                  >
                                    <Box className="fa-regular fa-circle-play" />
                                    <Box>{exercise.name}</Box>
                                  </Flex>
                                  <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                  <Box as="span" flex="1" textAlign="left">
                                    {exercise.description}
                                  </Box>
                                  <Flex flex="1" textAlign="left">
                                    <Box fontWeight="bold">
                                      Sudėtingumas -&nbsp;
                                    </Box>
                                    <Box>
                                      {
                                        DIFFICULTIES[
                                          exercise.difficulty.toLowerCase() as keyof typeof DIFFICULTIES
                                        ]
                                      }
                                    </Box>
                                  </Flex>
                                  <Box mt={5}>
                                    <ReactPlayer
                                      controls={true}
                                      url={exercise.exerciseVideoUrl}
                                    />
                                    <Flex flexDirection="column">
                                      <Flex gap={3}>
                                        <Box fontWeight="bold">
                                          Pratimo statusas:
                                        </Box>
                                        <Box>
                                          {exercise.grade
                                            ? exercise.grade > 4
                                              ? "Užskaitytas"
                                              : "Neužskaitytas"
                                            : "Laukiama"}
                                        </Box>
                                      </Flex>
                                      <Flex gap={3}>
                                        <Box fontWeight="bold">
                                          Pratimo įvertis:
                                        </Box>
                                        <Box>
                                          {exercise.grade &&
                                            (exercise.grade > 4
                                              ? exercise.grade
                                              : "")}
                                        </Box>
                                      </Flex>
                                      <Flex flexDirection="column">
                                        <Box fontWeight="bold">Komentaras</Box>
                                        <Box>{exercise.comment}</Box>
                                      </Flex>
                                    </Flex>
                                    {((!exercise.isWaitingForGrade &&
                                      exercise.grade === null) ||
                                      (exercise.grade !== null &&
                                        exercise.grade < 5)) && (
                                      <Button
                                        mt={3}
                                        textTransform="uppercase"
                                        background="#1E99D6"
                                        textColor="white"
                                        borderRadius="2xl"
                                        onClick={() =>
                                          handleProgressUpload(
                                            exercise.id,
                                            skill.id
                                          )
                                        }
                                      >
                                        Įkelti progresą
                                      </Button>
                                    )}
                                  </Box>
                                </AccordionPanel>
                              </AccordionItem>
                            );
                          })}
                        </Flex>
                      </Accordion>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Flex>
        </>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ExerciseProgressForm
              onClose={onClose}
              trainingPlanId={trainingPlan?.id as string}
              exerciseId={exerciseId as string}
              skillId={skillId as string}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default TrainingPlanExecution;
