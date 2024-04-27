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
import Container from "../components/Container";
import {
  Image,
  Text,
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
  Progress,
  Select,
  Spinner,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import TrainingPlanForm from "../components/forms/TrainingPlanForm";
import { AllEvaluationDto } from "../Types/types";

const ExercisesEvaluation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [submissions, setSubmissions] = useState<AllEvaluationDto>();
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
        `exerciseFlow/getExercisesForEvaluation/${userId}`,
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
            <Heading size="lg">{`Klientas ${submissions?.student}`}</Heading>
            <Box
              m="auto"
              borderRadius="xl"
              border="solid"
              borderColor="#9e9d9d"
              borderWidth="2px"
            >
              <Flex gap={5} mt={5} mb={5}>
                <Box alignSelf="center" h={60} w={60} ml={5}>
                  <Image
                    w="100%"
                    h="100%"
                    src={"data:image/jpeg;base64," + submissions?.userAvatar}
                  ></Image>
                </Box>
                <Flex flexDir="column" gap={5}>
                  <Flex>
                    <Text fontWeight="bold">Vardas:&nbsp;</Text>
                    <Text>{submissions?.student.split(" ")[0]}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold">Pavardė:&nbsp;</Text>
                    <Text>{submissions?.student.split(" ")[0]}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold">Gimimo data:&nbsp;</Text>
                    <Text>{submissions?.birthDate}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold">Pėdos dydis:&nbsp;</Text>
                    <Text>{submissions?.footSize}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold">Ūgis:&nbsp;</Text>
                    <Text>{submissions?.height}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold">Svoris:&nbsp;</Text>
                    <Text>{submissions?.weight}</Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold">Metabolinis amžius:&nbsp;</Text>
                    <Text>{submissions?.metabolicAge}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
            {submissions?.trainingPlansEvaluations.map(
              (trainingPlanEvaluation) => {
                return (
                  <Box
                    mt={3}
                    borderRadius="xl"
                    border="solid"
                    borderColor="#9e9d9d"
                    borderWidth="2px"
                  >
                    {trainingPlanEvaluation?.isPersonal && (
                      <Flex justifyContent="space-between">
                        <Flex flexDirection="column">
                          <Heading mt={5} size="md">
                            Krepšininko pageidavimai:
                          </Heading>
                          <Box mt={2}>
                            {trainingPlanEvaluation.trainingPlanRequest}
                          </Box>
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
                    <Heading mt={2} mx={5} size="md">
                      Treniruočių plano progresas
                    </Heading>
                    <Flex
                      borderRadius="xl"
                      border="solid"
                      borderColor="#9e9d9d"
                      flexDirection="column"
                      p={5}
                      mt={3}
                      mx={5}
                    >
                      <Heading size="md">
                        {trainingPlanEvaluation?.title}
                      </Heading>
                      <Flex justifyContent="space-between">
                        <Progress
                          colorScheme="blue"
                          value={
                            trainingPlanEvaluation?.progressCounter as unknown as number
                          }
                          w="80%"
                          mt={5}
                        />
                        <Flex flexDir="column" mt={3}>
                          <Text>
                            {trainingPlanEvaluation?.progressCounter === "100.0"
                              ? "Galutinis įvertis"
                              : "Numatomas įvertis"}
                          </Text>
                          <Flex align="center" w="100%" justify="flex-end">
                            <Box
                              className="fa-solid fa-star fa-2x"
                              style={{ color: "#1E99D6" }}
                            />
                            <Heading textColor="#1E99D6">
                              {trainingPlanEvaluation?.finalMark}
                            </Heading>
                          </Flex>
                        </Flex>
                      </Flex>
                      <Flex>
                        <Text fontWeight="bold">Plano progresas:&nbsp;</Text>
                        <Text>{trainingPlanEvaluation?.progressCounter}%</Text>
                      </Flex>
                    </Flex>
                    {trainingPlanEvaluation?.submittedExercises.length > 0 && (
                      <Heading mt={2} mx={5} size="md">
                        Pratimų pateikimai
                      </Heading>
                    )}
                    <Accordion m={5} mt={3} allowToggle>
                      {trainingPlanEvaluation?.submittedExercises.map(
                        (exercise) => {
                          const status = exercise.grade
                            ? exercise.grade > 4
                              ? "Patvirtinta"
                              : "Atmesta"
                            : "Laukiama";
                          return (
                            <AccordionItem
                              borderRadius="xl"
                              border="solid"
                              borderColor="#9e9d9d"
                              mt={2}
                            >
                              <AccordionButton>
                                <Flex
                                  gap={3}
                                  as="span"
                                  flex="1"
                                  textAlign="left"
                                >
                                  <Box
                                    textTransform="uppercase"
                                    fontWeight="bold"
                                  >
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
                              <AccordionPanel pb={4}>
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
                                        <Flex
                                          mt={3}
                                          gap={3}
                                          justifyContent="end"
                                        >
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
                                                handleSubmit(
                                                  e,
                                                  true,
                                                  exercise.id
                                                )
                                              }
                                            >
                                              Patvirtinti
                                            </Button>
                                            <Button
                                              borderRadius="full"
                                              backgroundColor="red"
                                              color="white"
                                              onClick={(e) =>
                                                handleSubmit(
                                                  e,
                                                  false,
                                                  exercise.id
                                                )
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
                        }
                      )}
                    </Accordion>
                  </Box>
                );
              }
            )}
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
