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
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Unauthorized } from "../Helpers/constants";
import eventBus from "../Helpers/eventBus";
import ReactPlayer from "react-player";
import { TrainingPlanExecutionDto } from "../Types/types";
import ExerciseProgressForm from "../components/forms/ExerciseProgressForm";

const TrainingPlanExecution = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlanExecutionDto>();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
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
      toast.error("Netikėta klaida!");
    }
  }, []);

  const handleVideoShow = async (videoUrl: string) => {
    setVideoUrl(null);
    const response = await fetch(videoUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    setVideoUrl(blobUrl);
  };

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
          <Heading size="xs" mt={2} textTransform="uppercase">
            {"Terminas:"}
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
                                <AccordionButton
                                  onClick={() =>
                                    handleVideoShow(exercise.exerciseVideoUrl)
                                  }
                                >
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
                                  {!videoUrl ? (
                                    <Center>
                                      <Spinner size="xl" textAlign="center" />
                                    </Center>
                                  ) : (
                                    <Box mt={5}>
                                      <ReactPlayer
                                        controls={true}
                                        url={videoUrl}
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
                                      </Flex>
                                      <Button
                                        borderRadius="full"
                                        backgroundColor="#1E99D6"
                                        color="white"
                                        textTransform="uppercase"
                                        onClick={() =>
                                          handleProgressUpload(
                                            exercise.id,
                                            skill.id
                                          )
                                        }
                                      >
                                        Įkelti progresą
                                      </Button>
                                    </Box>
                                  )}
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
