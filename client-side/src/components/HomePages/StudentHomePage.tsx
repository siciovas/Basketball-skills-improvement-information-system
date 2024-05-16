import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Progress,
  SimpleGrid,
  Spinner,
  Image,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Unauthorized } from "../../Helpers/constants";
import eventBus from "../../Helpers/eventBus";
import Container from "../Container";
import moment from "moment";
import { StudentHomePageDto } from "../../Types/types";
import { useNavigate } from "react-router-dom";
import handleErrorMessage from "../../Helpers/errorHandler";

const StudentHomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homePage, setHomePage] = useState<StudentHomePageDto>();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const getHomePage = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "user/studentHome",
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
      const homePage = await response.json();
      setHomePage(homePage);
      setIsLoading(false);
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  }, []);

  useEffect(() => {
    getHomePage();
  }, [getHomePage]);

  return (
    <>
      <Container minW={1400}>
        {isLoading ? (
          <Center>
            <Spinner size="xl" textAlign="center" />
          </Center>
        ) : (
          <>
            <Heading>
              {homePage!.plans.length > 0
                ? "Tęskite treniruotes"
                : "Treniruočių neturite"}
            </Heading>
            {homePage!.plans.length > 0 && (
              <Box
                borderRadius="xl"
                border="solid"
                borderColor="#9e9d9d"
                borderWidth="2px"
                mt={5}
              >
                <Heading
                  cursor="pointer"
                  textDecoration="underline"
                  size="sm"
                  textAlign="right"
                  mx={10}
                  mt={2}
                  onClick={() => navigate("/myPlans")}
                >
                  Mano treniruotės
                </Heading>
                <SimpleGrid columns={3} spacing={10} p={5}>
                  {homePage?.plans.map((plan) => (
                    <Box
                      borderRadius="xl"
                      border="solid"
                      borderColor="#9e9d9d"
                      borderWidth="2px"
                      p={5}
                    >
                      <Flex flexDir="column">
                        <Box h={40} w="100%">
                          <Image
                            w="100%"
                            h="100%"
                            borderRadius="xl"
                            src={"data:image/jpeg;base64," + plan.avatar}
                          />
                        </Box>
                        <Heading size="md" mt={5}>
                          {plan.name}
                        </Heading>
                        <Text mt={2}>{plan.coachFullName}</Text>
                        <Flex justify="flex-end" ml={5}>
                          <Button
                            textTransform="uppercase"
                            background="#1E99D6"
                            textColor="white"
                            borderRadius="2xl"
                            onClick={() =>
                              navigate(
                                `/trainingPlanExecution/${plan.trainingPlanId}`
                              )
                            }
                          >
                            VYKDYTI
                          </Button>
                        </Flex>
                        <Progress
                          colorScheme="blue"
                          value={plan.progressCounter as unknown as number}
                          mt={5}
                        />
                        <Flex justify="space-between" mt={2}>
                          <Flex>
                            <Text fontWeight="bold">Progresas:&nbsp;</Text>
                            <Text>{plan.progressCounter}%</Text>
                          </Flex>
                          <Flex>
                            <Text fontWeight="bold">Terminas:&nbsp;</Text>
                            <Text>
                              {moment(
                                new Date(
                                  moment(plan.expirationDate)
                                    .utc(true)
                                    .toString()
                                )
                              ).format("YYYY-MM-DD")}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            )}

            <Heading mt={5}>
              {homePage!.coaches.length > 0
                ? "Tobulėkite su geriausiais treneriais"
                : "Trenerių sistemoje nėra"}
            </Heading>
            {homePage!.coaches.length > 0 && (
              <Box
                borderRadius="xl"
                border="solid"
                borderColor="#9e9d9d"
                borderWidth="2px"
                mt={5}
              >
                <Heading
                  cursor="pointer"
                  textDecoration="underline"
                  size="sm"
                  textAlign="right"
                  mx={10}
                  mt={2}
                  onClick={() => navigate("/allCoaches")}
                >
                  Visi treneriai
                </Heading>
                <SimpleGrid columns={3} spacing={10} p={5}>
                  {homePage?.coaches.map((coach) => {
                    return (
                      <Box
                        borderRadius="xl"
                        border="solid"
                        borderColor="#9e9d9d"
                        borderWidth="2px"
                        minH={60}
                        p={2}
                      >
                        <Flex dir="column" pos="relative" gap={3}>
                          <Box alignSelf="center" h={60} w={60} ml={5}>
                            <Image
                              w="100%"
                              h="100%"
                              src={"data:image/jpeg;base64," + coach.avatar}
                              borderRadius="xl"
                            ></Image>
                          </Box>
                          <Flex flexDir="column" gap={2} w="100%">
                            <Heading size="sm">{coach.fullName}</Heading>
                            <Box>{coach.specialization}</Box>
                            <Box minH={12} wordBreak="break-word">
                              {coach.description ?? "Aprašymo nėra"}
                            </Box>
                            <Flex backgroundColor="gray.200" gap={5} px={2}>
                              <Flex flexDir="column" alignItems="center">
                                <Box>Planai</Box>
                                <Box fontWeight="bold">
                                  {coach.trainingPlansCount}
                                </Box>
                              </Flex>
                              <Flex flexDir="column" alignItems="center">
                                <Box>Klientai</Box>
                                <Box fontWeight="bold">
                                  {coach.clientsCount}
                                </Box>
                              </Flex>
                              <Flex flexDir="column" alignItems="center">
                                <Box>Reitingas</Box>
                                <Box fontWeight="bold">
                                  {coach.rating == null ? 0 : coach.rating.toFixed(1)}
                                </Box>
                              </Flex>
                            </Flex>
                            <Button
                              textTransform="uppercase"
                              background="#1E99D6"
                              textColor="white"
                              borderRadius="2xl"
                              alignSelf="end"
                              w={32}
                              fontSize="small"
                              onClick={() =>
                                navigate(`/coachDetails/${coach.id}`)
                              }
                            >
                              Sužinoti daugiau
                            </Button>
                          </Flex>
                        </Flex>
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default StudentHomePage;
