import {
  Heading,
  SimpleGrid,
  Flex,
  Button,
  Box,
  Image,
  Center,
  Spinner,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Container from "../Container";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { GuestHomePageDto } from "../../Types/types";
import toast from "react-hot-toast";
import handleErrorMessage from "../../Helpers/errorHandler";

const GuestHomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [homePage, setHomePage] = useState<GuestHomePageDto>();
  const navigate = useNavigate();

  const getHomePage = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "user/guestHome",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    if (response.status === 200) {
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
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              <GridItem>
                <Flex
                  flexDir="column"
                  border="1px"
                  borderRadius="lg"
                  bg="#FDFFFC"
                  px={15}
                  py={10}
                  gap={5}
                >
                  <Flex gap={4} align="center" justify="space-evenly">
                    <Heading size="4xl">{homePage?.coachesCount}</Heading>
                    <Box className="fa-solid fa-briefcase fa-4x"></Box>
                  </Flex>
                  <Flex justify="center" align="center" h="50%">
                    <Heading size="lg">Registruoti treneriai</Heading>
                  </Flex>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex
                  flexDir="column"
                  border="1px"
                  borderRadius="lg"
                  bg="#1E98D6"
                  px={15}
                  py={10}
                  gap={5}
                >
                  <Flex gap={4} align="center" justify="space-evenly">
                    <Heading size="4xl">{homePage?.studentsCount}</Heading>
                    <Box className="fa-solid fa-person-running fa-4x"></Box>
                  </Flex>
                  <Flex justify="center" align="center" h="50%">
                    <Heading size="lg">Registruoti krepšininkai</Heading>
                  </Flex>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex
                  flexDir="column"
                  border="1px"
                  borderRadius="lg"
                  bg="#2E4057"
                  px={15}
                  py={10}
                  gap={5}
                >
                  <Flex gap={4} align="center" justify="space-evenly">
                    <Heading size="4xl" color="white">
                      {homePage?.plansCount}
                    </Heading>
                    <Box
                      className="fa-solid fa-list-check fa-4x"
                      color="white"
                    ></Box>
                  </Flex>
                  <Flex justify="center" align="center" h="50%">
                    <Heading size="lg" color="white">
                      Treniruočių planai
                    </Heading>
                  </Flex>
                </Flex>
              </GridItem>
            </Grid>
            <Flex
              borderRadius="xl"
              border="solid"
              borderColor="#9e9d9d"
              borderWidth="2px"
              flexDirection="column"
              mt={5}
              p={5}
              gap={5}
            >
              <Heading m="auto" size="md">
                Treniruokite arba tobulinkite savo krepšinio įgūdžius su
                geriausiais treneriais
              </Heading>
              <Button
                m="auto"
                textTransform="uppercase"
                background="#1E99D6"
                textColor="white"
                borderRadius="2xl"
                onClick={() => navigate("/register")}
              >
                Registruotis
              </Button>
            </Flex>
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
                        <Flex dir="column" pos="relative" gap={3} h='100%'>
                          <Box alignSelf="center" h={60} w={60} ml={5}>
                            <Image
                              w="100%"
                              h="100%"
                              src={"data:image/jpeg;base64," + coach.avatar}
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

export default GuestHomePage;
