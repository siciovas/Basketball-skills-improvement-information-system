import { useCallback, useEffect, useState } from "react";
import Container from "../../../components/Container";
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
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Unauthorized } from "../../../Helpers/constants";
import eventBus from "../../../Helpers/eventBus";
import translations from "../../../Helpers/translations.json";
import { CoachProfile, Feedback } from "../../../Types/types";
import FeedbackForm from "../../../components/forms/FeedbackForm";
import Pagination from "../../../components/Pagination";
import handleErrorMessage from "../../../Helpers/errorHandler";
const stars = ["", "", "", "", ""];

const CoachDetails = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [coach, setCoach] = useState<CoachProfile>();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [canUserReport, setCanUserReport] = useState(false);
  const [canUserFeedback, setCanUserFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");
  const [pages, setPages] = useState({
    total: 0,
    currentPage: 0,
    pageNumbers: [],
  });

  const itemsPerPage = 9;

  const handlePaginate = (page: number) => {
    setPages({ ...pages, currentPage: page });
  };

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
      const hasPlanResponse = await fetch(
        import.meta.env.VITE_API_URL + `order/hasUserTrainingPlan/${coach.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      const canReport = await hasPlanResponse.json();
      setCanUserReport(canReport);
      setCanUserFeedback(canReport);
      setPages({
        ...pages,
        total: Math.ceil(coach.trainingPlans.length / itemsPerPage),
      });
      setCoach(coach);
      await getFeedbacks();
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  }, []);

  const getFeedbacks = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `feedback/fourBest/${id}`,
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
      const feedback = await response.json();
      setFeedbacks(feedback);
      setIsLoading(false);
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  }, []);

  useEffect(() => {
    getCoachDetails();
  }, []);

  return (
    <>
      <Container minW={1400}>
        {isLoading ? (
          <Center>
            <Spinner size="xl" textAlign="center" />
          </Center>
        ) : (
          <>
            <Box cursor="pointer" onClick={() => navigate("/allCoaches")}>
              <Box className="fa-solid fa-arrow-left" mr={2} />
              Grįžti į trenerių sąrašą
            </Box>
            <Box w={1000} m="auto" mt={5}>
              <Box
                borderRadius="xl"
                border="solid"
                borderColor="#9e9d9d"
                borderWidth="2px"
              >
                <Flex gap={5} mt={2}>
                  <Box alignSelf="center" h={60} w={60} ml={5}>
                    <Image
                      w="100%"
                      h="100%"
                      borderRadius="xl"
                      src={"data:image/jpeg;base64," + coach?.avatar}
                    ></Image>
                  </Box>
                  <Flex flexDir="column" justifyContent="space-between">
                    <Heading size="md">{coach?.fullName}</Heading>
                    <Box>{coach?.specialization}</Box>
                    <Flex mb={10} gap={2}>
                      <Box>
                        Planai <b>{coach?.trainingPlansCount}</b>
                      </Box>
                      <Box>
                        Klientai <b>{coach?.clientsCount}</b>
                      </Box>
                      <Box>
                        Patirtis <b>{coach?.experience}m</b>
                      </Box>
                    </Flex>
                    <Flex flexDir="column">
                      <Box>
                        <Box className="fa-solid fa-phone" mr={1} />
                        {coach?.phoneNumber}
                      </Box>
                      <Box>
                        <Box className="fa-solid fa-envelope" mr={1} />
                        {coach?.email}
                      </Box>
                      <Box>
                        <Box className="fa-solid fa-calendar" mr={1} />
                        {coach?.birthDate}
                      </Box>
                      <Box>
                        <Box className="fa-solid fa-graduation-cap" mr={1} />
                        {
                          translations[
                            coach?.education.toLowerCase() as keyof typeof translations
                          ]
                        }
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex flexDir="column" gap={5} mt={10} ml={10}>
                    <Box>
                      <Box
                        className="fa-regular fa-circle-check fa-2xl"
                        style={{ color: "#1E99D6" }}
                        mr={2}
                      />
                      Patvirtintas profilis
                    </Box>
                    <Box>
                      <Box
                        className="fa-solid fa-star fa-2xl"
                        mr={2}
                        style={{ color: "#1E99D6" }}
                      />
                      {coach?.rating == null ? 0 : coach.rating.toFixed(1)}
                    </Box>
                    {canUserFeedback && (
                      <Button
                        textTransform="uppercase"
                        background="#1E99D6"
                        textColor="white"
                        borderRadius="2xl"
                        onClick={() => onOpen()}
                      >
                        RAŠYTI ATSILIEPIMĄ
                      </Button>
                    )}
                    {canUserReport && (
                      <Button
                        textTransform="uppercase"
                        background="red.500"
                        textColor="white"
                        borderRadius="2xl"
                        onClick={() => navigate(`/complaint/${coach?.id}`)}
                      >
                        Teikti skundą
                      </Button>
                    )}
                  </Flex>
                </Flex>
                <Box ml={5} my={5}>
                  {coach?.description}
                </Box>
              </Box>
            </Box>
            <Box mt={5}>
              <Heading size="sm">Atsiliepimai</Heading>
              <Accordion allowToggle mt={5} mb={5}>
                {feedbacks.map((feedback, index) => {
                  return (
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            {++index}. Atsiliepimas
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Flex>
                          {stars.map((_, index) => {
                            return (
                              <Box
                                className={`fa-${
                                  feedback.rating >= index + 1
                                    ? "solid"
                                    : "regular"
                                } fa-star`}
                              ></Box>
                            );
                          })}
                        </Flex>
                        <Box mt={2}>{feedback.feedbackText}</Box>
                        <Box mt={2} fontWeight="bold">
                          {feedback.student}
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </Box>
            <Box mt={5}>
              <Heading size="sm">Trenerio siūlomi treniruočių planai</Heading>
              <SimpleGrid mt={5} columns={3} spacing={10}>
                {coach?.trainingPlans
                  .slice(
                    (pages.currentPage + 1) * itemsPerPage - itemsPerPage,
                    (pages.currentPage + 1) * itemsPerPage
                  )
                  .map((trainingPlan) => {
                    return (
                      <Box
                        borderRadius="xl"
                        border="solid"
                        borderColor="#9e9d9d"
                        borderWidth="2px"
                        p={5}
                      >
                        <Flex flexDirection="column" gap={5}>
                          <Box fontSize="larger" fontWeight="bold">
                            {trainingPlan.title}
                          </Box>
                          <Box h={40} w={96}>
                            <Image
                              w="100%"
                              h="100%"
                              borderRadius="xl"
                              src={
                                "data:image/jpeg;base64," + trainingPlan.avatar
                              }
                            />
                          </Box>
                          <Box fontSize="larger" fontWeight="bold">
                            {trainingPlan.price} Eur
                          </Box>
                          <Flex flexDirection="column" gap={3}>
                            <Box>{trainingPlan.shortDescription}</Box>
                          </Flex>
                        </Flex>
                        <Button
                          w="100%"
                          textTransform="uppercase"
                          background="#1E99D6"
                          textColor="white"
                          borderRadius="2xl"
                          mt={10}
                          onClick={() =>
                            navigate(`/trainingPlan/${trainingPlan.id}`)
                          }
                        >
                          Plačiau
                        </Button>
                      </Box>
                    );
                  })}
              </SimpleGrid>
              <Pagination
                pageCount={pages.total}
                currentPage={pages.currentPage}
                onPageChange={handlePaginate}
              />
            </Box>
          </>
        )}
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <FeedbackForm coachId={coach?.id as string} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CoachDetails;
