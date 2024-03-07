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
import { URL_ADDRESS, Unauthorized } from "../../../Helpers/constants";
import eventBus from "../../../Helpers/eventBus";
import { CoachProfile } from "../../../Types/types";

const CoachDetails = () => {
  const [coach, setCoach] = useState<CoachProfile>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const getCoachDetails = useCallback(async () => {
    const response = await fetch(URL_ADDRESS + `user/coachDetails/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const coach = await response.json();
      console.log(coach);
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
                    src="https://m.basketnews.lt/paveikslelis-25361-crop700x700.jpg"
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
                      Klientai <b>120</b>
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
                      {coach?.education}
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
                </Flex>
              </Flex>
              <Box ml={5} my={5}>
                {coach?.description}
              </Box>
            </Box>
            <Box mt={5}>
              <Heading size="sm">Trenerio siūlomi treniruočių planai</Heading>
              <SimpleGrid mt={5} columns={3} spacing={10}>
                {coach?.trainingPlans.map((trainingPlan) => {
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
                      >
                        Plačiau
                      </Button>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CoachDetails;