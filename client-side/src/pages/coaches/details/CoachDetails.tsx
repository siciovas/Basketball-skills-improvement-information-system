import { useCallback, useEffect, useState } from "react";
import Container from "../../../components/Container";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Unauthorized } from "../../../Helpers/constants";
import eventBus from "../../../Helpers/eventBus";
import translations from "../../../Helpers/translations.json";
import { CoachProfile } from "../../../Types/types";
import Pagination from "../../../components/Pagination";

const CoachDetails = () => {
  const [coach, setCoach] = useState<CoachProfile>();
  const [canUserReport, setCanUserReport] = useState(false);
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
      setPages({
        ...pages,
        total: Math.ceil(coach.trainingPlans.length / itemsPerPage),
      });
      setCoach(coach);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    getCoachDetails();
  }, [getCoachDetails]);

  return (
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
            <Box border="solid">
              <Flex gap={5} mt={2}>
                <Box alignSelf="center" h={60} w={60} ml={5}>
                  <Image
                    w="100%"
                    h="100%"
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
                    {coach?.rating}
                  </Box>
                  {canUserReport && (
                    <Button
                      textTransform="uppercase"
                      background="red.500"
                      textColor="white"
                      borderRadius="2xl"
                      onClick={() => navigate(`/complaint/${coach?.id}`)}
                    >
                      PRANEŠTI
                    </Button>
                  )}
                </Flex>
              </Flex>
              <Box ml={5} my={5}>
                {coach?.description}
              </Box>
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
                      <Box backgroundColor="#E2E2E2" p={5}>
                        <Flex flexDirection="column" gap={5}>
                          <Box fontSize="larger" fontWeight="bold">
                            {trainingPlan.title}
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
                          backgroundColor="#1E99D6"
                          color="white"
                          borderRadius="2xl"
                          mt={10}
                          textTransform="uppercase"
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
          </Box>
        </>
      )}
    </Container>
  );
};

export default CoachDetails;
