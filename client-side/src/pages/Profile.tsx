import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Image,
  Button,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  SimpleGrid,
  Highlight,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
// import { useParams, useNavigate } from "react-router-dom";
import { Unauthorized } from "../Helpers/constants";
import eventBus from "../Helpers/eventBus";
import { MeDto } from "../Types/types";

const Profile = () => {
  const [user, setUser] = useState<MeDto>();
  const token = localStorage.getItem("accessToken");
  // const { id } = useParams();
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const getUserDetails = useCallback(async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + `user/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const userResponse = await response.json();
      setUser(userResponse);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <>
      {isLoading ? (
        <Box>Nera</Box>
      ) : (
        <>
          <Container minW={1000}>
            <Box m="auto" mt={5}>
              <Box
                boxShadow="dark-lg"
                w={600}
                m="auto"
                borderRadius="xl"
                border="solid"
                borderColor="#9e9d9d"
              >
                <Flex gap={5} mt={5} mb={5}>
                  <Box alignSelf="center" h={60} w={60} ml={5}>
                    <Image
                      w="100%"
                      h="100%"
                      src={"data:image/jpeg;base64," + user?.avatar}
                    ></Image>
                  </Box>
                  <Flex>
                    <Flex flexDir="column" gap={5}>
                      <Text>Vardas: </Text>
                      <Text>Pavardė: </Text>
                      <Text>El. Paštas: </Text>
                      <Text>Gimimo data: </Text>
                      <Text>Tel. numeris: </Text>
                      <Text>Registracijos data: </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            </Box>
            <Accordion
              allowToggle
              mx="auto"
              mt={10}
              boxShadow="dark-lg"
              w={600}
              borderRadius="xl"
              border="solid"
              borderColor="#9e9d9d"
            >
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Papildoma informacija
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <SimpleGrid columns={4} spacing={10}>
                    {Object.keys(user!.additionalInfo).map((key) => {
                      return (
                        (user!.additionalInfo as any)[key] && (
                          <Text mt={6} fontWeight="bold">
                            <Highlight
                              query={(user!.additionalInfo as any)[
                                key
                              ].toString()}
                              styles={{ py: "1", fontWeight: "normal" }}
                            >
                              {`${key}: ${(user!.additionalInfo as any)[key]}`}
                            </Highlight>
                          </Text>
                        )
                      );
                    })}
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Flex justify="center" mt={10}>
              <Heading size="md">Slaptažodžio keitimas</Heading>
            </Flex>
            <Box m="auto" mt={5}>
              <Box
                boxShadow="dark-lg"
                w={600}
                m="auto"
                borderRadius="xl"
                border="solid"
                borderColor="#9e9d9d"
              >
                <form>
                  <FormControl>
                    <Flex align="center" flexDir="column" mt={5}>
                      <FormLabel>Dabartinis slaptažodis</FormLabel>
                      <Input
                        w="50%"
                        type="password"
                        mb={5}
                        name="oldpassword"
                        isRequired
                      />
                    </Flex>
                    <Flex align="center" flexDir="column">
                      <FormLabel>Naujas slaptažodis</FormLabel>
                      <Input
                        w="50%"
                        type="password"
                        mb={5}
                        name="newpassword"
                        isRequired
                      />
                    </Flex>
                    <Flex align="center" flexDir="column">
                      <FormLabel>Pakartoti naują slaptažodį</FormLabel>
                      <Input
                        w="50%"
                        type="password"
                        mb={5}
                        name="repeatpassword"
                        isRequired
                      />
                    </Flex>
                    <Flex justify="center">
                      <Button
                        w="50%"
                        backgroundColor="#1E99D6"
                        color="white"
                        borderRadius="2xl"
                        mt={5}
                        textTransform="uppercase"
                        mb={5}
                      >
                        Atnaujinti slaptažodį
                      </Button>
                    </Flex>
                  </FormControl>
                </form>
              </Box>
            </Box>
          </Container>{" "}
        </>
      )}
    </>
  );
};

export default Profile;
