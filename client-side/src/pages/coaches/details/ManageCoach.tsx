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
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  APPROVED,
  BLOCKED,
  PENDING,
  URL_ADDRESS,
  Unauthorized,
} from "../../../Helpers/constants";
import eventBus from "../../../Helpers/eventBus";
import { CoachProfile } from "../../../Types/types";

const array = ["", "", ""];

const ManageCoach = () => {
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
          <Box cursor="pointer" onClick={() => navigate("/manageCoaches")}>
            <Box className="fa-solid fa-arrow-left" mr={2} />
            Grįžti į trenerių sąrašą
          </Box>
          <Box w={1000} m="auto" mt={5}>
            <Box boxShadow="dark-lg" w={600} m="auto" borderRadius="xl" border="solid" borderColor="#9e9d9d">
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
                  <Flex justifyContent="space-between" gap={5}>
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
                    <Flex
                      flexDirection="column"
                      gap={2}
                      justifyContent="center"
                    >
                      {coach?.coachStatus === PENDING && (
                        <>
                          <Button
                            borderRadius="full"
                            backgroundColor="#1E99D6"
                            color="white"
                          >
                            Patvirtinti
                          </Button>
                          <Button
                            borderRadius="full"
                            backgroundColor="red"
                            color="white"
                          >
                            Atmesti
                          </Button>
                        </>
                      )}
                      {coach?.coachStatus === APPROVED && (
                        <>
                          <Button
                            borderRadius="full"
                            backgroundColor="red"
                            color="white"
                          >
                            Blokuoti
                          </Button>
                        </>
                      )}
                      {coach?.coachStatus === BLOCKED && (
                        <>
                          <Button
                            borderRadius="full"
                            backgroundColor="#1E99D6"
                            color="white"
                          >
                            Atblokuoti
                          </Button>
                        </>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Box ml={5} my={5}>
                {coach?.description}
              </Box>
            </Box>
            <Box mt={5}>
              <Heading size="sm">Trenerio gauti skundai</Heading>
              <Accordion allowToggle mt={5}>
                {array.map((_, index) => {
                  return (
                    <AccordionItem>
                      <AccordionButton
                        _expanded={{ bg: "#1E99D6", color: "white" }}
                      >
                        <Box as="span" flex="1" textAlign="left">
                          {++index}. Skundas
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Box>
                          <Flex w={72} flexDirection="column">
                            <Flex>
                              <Box flexBasis="50%" fontWeight="bold">
                                Data:
                              </Box>
                              <Box flexBasis="50%">2023-01-01</Box>
                            </Flex>
                            <Flex>
                              <Box flexBasis="50%" fontWeight="bold">
                                Skundo autorius:
                              </Box>
                              <Box flexBasis="50%">IGNAS ILINČIUS</Box>
                            </Flex>
                            <Flex>
                              <Box flexBasis="50%" fontWeight="bold">
                                Treneris:
                              </Box>
                              <Box flexBasis="50%">Sarunas Jasikevicius</Box>
                            </Flex>
                          </Flex>
                          <Heading mt={10} size="sm">
                            Skundo tekstas
                          </Heading>
                          <Box mt={3}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.{" "}
                          </Box>
                        </Box>
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ManageCoach;
