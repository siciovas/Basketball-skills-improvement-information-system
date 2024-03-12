import {
  SimpleGrid,
  Box,
  Image,
  Flex,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
  HStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Container from "../../components/Container";
import { Coach } from "../../Types/types";
import toast from "react-hot-toast";
import { URL_ADDRESS, Unauthorized } from "../../Helpers/constants";
import eventBus from "../../Helpers/eventBus";
import { useNavigate } from "react-router-dom";

const MainCoachesList = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const getCoachesList = useCallback(async () => {
    const response = await fetch(URL_ADDRESS + "user/getCoaches", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const coaches = await response.json();
      setCoaches(coaches);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    getCoachesList();
  }, [getCoachesList]);

  return (
    <Container minW={1400}>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <>
          <Heading>Treneriai</Heading>
          <HStack justifyContent="end" spacing={10}>
            <Flex>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  border="solid"
                  borderColor="#9e9d9d"
                  backgroundColor="#E2E2E2"
                >
                  <Box className="fa-solid fa-filter"></Box>
                </MenuButton>
                <MenuList
                  minWidth="240px"
                  backgroundColor="#E2E2E2"
                  border="solid"
                  borderColor="#9e9d9d"
                >
                  <MenuOptionGroup type="checkbox" onChange={() => {}}>
                    <MenuItemOption value="rejected" backgroundColor="#E2E2E2">
                      Geriausiai įvertinti
                    </MenuItemOption>
                    <MenuItemOption value="approved" backgroundColor="#E2E2E2">
                      Populiariausi
                    </MenuItemOption>
                    <MenuItemOption value="pending" backgroundColor="#E2E2E2">
                      Daugiausiai planų
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Flex>
            <Select
              w={20}
              defaultValue={10}
              border="solid"
              borderColor="#9e9d9d"
            >
              <option value="10" style={{ backgroundColor: "#E2E2E2" }}>
                10
              </option>
              <option value="20" style={{ backgroundColor: "#E2E2E2" }}>
                20
              </option>
              <option value="30" style={{ backgroundColor: "#E2E2E2" }}>
                30
              </option>
            </Select>
          </HStack>

          <SimpleGrid columns={3} spacing={10} mt={10}>
            {coaches.map((coach) => {
              return (
                <Box
                  border="solid"
                  borderColor="#9e9d9d"
                  boxShadow="dark-lg"
                  minH={60}
                  p={2}
                >
                  <Flex dir="column" pos="relative" gap={3}>
                    <Box alignSelf="center" h={40} w={60}>
                      <Image
                        w="100%"
                        h="100%"
                        src="https://m.basketnews.lt/paveikslelis-25361-crop700x700.jpg"
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
                          <Box fontWeight="bold">90</Box>
                        </Flex>
                        <Flex flexDir="column" alignItems="center">
                          <Box>Reitingas</Box>
                          <Box fontWeight="bold">{coach.rating}</Box>
                        </Flex>
                      </Flex>
                      <Button
                        borderRadius="3xl"
                        color="white"
                        backgroundColor="#1E99D6"
                        alignSelf="end"
                        w={32}
                        textTransform="uppercase"
                        fontSize="small"
                        onClick={() => navigate(`/coachDetails/${coach.id}`)}
                      >
                        Sužinoti daugiau
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              );
            })}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};
``;

export default MainCoachesList;
