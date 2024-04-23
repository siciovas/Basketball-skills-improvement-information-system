import {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  MouseEvent,
} from "react";
import toast from "react-hot-toast";
import { STATUSCOLORS, Unauthorized } from "../Helpers/constants";
import eventBus from "../Helpers/eventBus";
import { useParams } from "react-router-dom";
import { Submissions } from "../Types/types";
import Container from "../components/Container";
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Spinner,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import TrainingPlanForm from "../components/forms/TrainingPlanForm";

const ExercisesEvaluation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submissions>();
  const { userId, trainingPlanId } = useParams();
  const [grade, setGrade] = useState<number>();
  const [comment, setComment] = useState<string>("");
  const token = localStorage.getItem("accessToken");

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleChangeGrade = (e: ChangeEvent<HTMLSelectElement>) => {
    setGrade(e.target.value as unknown as number);
  };

  const handleSubmit = async (
    e: MouseEvent<HTMLButtonElement>,
    isValid: boolean,
    id: string
  ) => {
    e.preventDefault();
    if (grade === undefined && isValid) {
      toast.error("Įveskite pažymį!");
    } else {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `exerciseFlow/evaluate/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment,
            grade: isValid ? grade : 4,
          }),
          method: "PUT",
        }
      );
      if (response.status === 200) {
        toast.success("Įvertinimas sėkmingai pateiktas!");
        setIsLoading(true);
        await getSubmissions();
      } else {
        toast.error("Įvyko klaida");
      }
    }
  };

  const getSubmissions = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL +
        `exerciseFlow/getExercisesForEvaluation/${trainingPlanId}/${userId}`,
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
      const submissions = await response.json();
      setSubmissions(submissions);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    getSubmissions();
  }, [getSubmissions]);

  return (
    <>
      <Container minW={1000}>
        {isLoading ? (
          <Center>
            <Spinner size="xl" textAlign="center" />
          </Center>
        ) : (
          <>
            <Heading size="lg">{`Krepšininko ${submissions?.student} pratimų pateikimai`}</Heading>
            {submissions?.isPersonal && (
              <Flex justifyContent="space-between">
                <Flex flexDirection="column">
                  <Heading mt={5} size="md">
                    Krepšininko pageidavimai:
                  </Heading>
                  <Box mt={2}>{submissions.trainingPlanRequest}</Box>
                </Flex>
                <Box mt={5}>
                  <Button
                    borderRadius="full"
                    backgroundColor="#1E99D6"
                    color="white"
                    onClick={onOpen}
                  >
                    Papildyti planą
                  </Button>
                </Box>
              </Flex>
            )}
            <Accordion mt={5} allowToggle>
              {submissions?.submittedExercises.map((exercise) => {
                const status = exercise.grade
                  ? exercise.grade > 4
                    ? "Patvirtinta"
                    : "Atmesta"
                  : "Laukiama";
                return (
                  <AccordionItem>
                    <AccordionButton border="solid" borderColor="#9e9d9d">
                      <Flex gap={3} as="span" flex="1" textAlign="left">
                        <Box textTransform="uppercase" fontWeight="bold">
                          {exercise.title}
                        </Box>
                        <Box
                          fontWeight="bold"
                          textTransform="uppercase"
                          color={
                            STATUSCOLORS[
                              status.toLowerCase() as keyof typeof STATUSCOLORS
                            ]
                          }
                        >
                          {status}
                        </Box>
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel border="solid" borderColor="#9e9d9d" pb={4}>
                      <Flex flexDirection="column">
                        <Box>
                          <ReactPlayer
                            controls={true}
                            url={exercise.videoUrl}
                          />
                        </Box>
                        <Box mt={2}>
                          <Box>Komentaras</Box>
                          {status === "Laukiama" ? (
                            <>
                              <Textarea
                                value={comment}
                                onChange={handleCommentChange}
                                border="solid"
                                borderColor="#9e9d9d"
                              />
                              <Flex mt={3} gap={3} justifyContent="end">
                                <Select
                                  w={16}
                                  border="solid"
                                  borderColor="#9e9d9d"
                                  placeholder="-"
                                  value={grade}
                                  onChange={handleChangeGrade}
                                >
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                </Select>
                                <Flex gap={2} flexDirection="column">
                                  <Button
                                    borderRadius="full"
                                    backgroundColor="#1E99D6"
                                    color="white"
                                    onClick={(e) =>
                                      handleSubmit(e, true, exercise.id)
                                    }
                                  >
                                    Patvirtinti
                                  </Button>
                                  <Button
                                    borderRadius="full"
                                    backgroundColor="red"
                                    color="white"
                                    onClick={(e) =>
                                      handleSubmit(e, false, exercise.id)
                                    }
                                  >
                                    Atmesti
                                  </Button>
                                </Flex>
                              </Flex>
                            </>
                          ) : (
                            <>
                              <Box>{exercise.comment}</Box>
                              <Flex gap={3}>
                                <Box fontWeight="bold">Įvertis</Box>
                                <Box>{exercise.grade}</Box>
                              </Flex>
                            </>
                          )}
                        </Box>
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </>
        )}
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <TrainingPlanForm
              onClose={onClose}
              trainingPlanId={trainingPlanId}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExercisesEvaluation;
