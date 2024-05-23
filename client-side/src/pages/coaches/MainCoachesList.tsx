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
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Container from "../../components/Container";
import { Coach } from "../../Types/types";
import toast from "react-hot-toast";
import { Unauthorized } from "../../Helpers/constants";
import eventBus from "../../Helpers/eventBus";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import handleErrorMessage from "../../Helpers/errorHandler";

const MainCoachesList = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const [sortData, setSortData] = useState({
    sort: "mostPopular",
    page: 10,
  });
  const [pages, setPages] = useState({
    total: 0,
    currentPage: 0,
    pageNumbers: [],
  });

  const navigate = useNavigate();

  const handleFilter = (value: string | string[]) => {
    setSortData({ ...sortData, sort: value as string });
  };

  const handlePage = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortData({ ...sortData, page: parseInt(value) });
  };

  const handlePaginate = (page: number) => {
    setPages({ ...pages, currentPage: page });
  };

  const getCoachesList = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "user/getCoaches",
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
      const coaches = await response.json();
      setPages({ ...pages, total: Math.ceil(coaches.length / sortData.page) });
      setCoaches(coaches);
      setIsLoading(false);
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
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
          <Heading textAlign="center">Treneriai</Heading>
          <HStack justifyContent="end" spacing={10}>
            <Flex>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  border="solid"
                  borderWidth="2px"
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
                  borderWidth="1px"
                >
                  <MenuOptionGroup
                    type="radio"
                    value={sortData.sort}
                    onChange={handleFilter}
                  >
                    <MenuItemOption
                      value="bestRating"
                      backgroundColor="#E2E2E2"
                    >
                      Geriausiai įvertinti
                    </MenuItemOption>
                    <MenuItemOption
                      value="mostPopular"
                      backgroundColor="#E2E2E2"
                    >
                      Populiariausi
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Flex>
            <Select
              w={20}
              value={sortData.page}
              border="solid"
              borderColor="#9e9d9d"
              borderWidth="2px"
              onChange={handlePage}
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
            {coaches
              .sort((a, b) =>
                sortData.sort === "mostPopular"
                  ? b.clientsCount - a.clientsCount
                  : b.rating - a.rating
              )
              .slice(
                (pages.currentPage + 1) * sortData.page - sortData.page,
                (pages.currentPage + 1) * sortData.page
              )
              .map((coach) => {
                return (
                  <Box
                    borderRadius="xl"
                    border="solid"
                    borderColor="#9e9d9d"
                    borderWidth="2px"
                    minH={60}
                    p={2}
                  >
                    <Flex dir="column" pos="relative" gap={3} h="100%">
                      <Box alignSelf="center" h={60} w={60} ml={5}>
                        <Image
                          w="100%"
                          h="100%"
                          borderRadius="xl"
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
                            <Box fontWeight="bold">{coach.clientsCount}</Box>
                          </Flex>
                          <Flex flexDir="column" alignItems="center">
                            <Box>Reitingas</Box>
                            <Box fontWeight="bold">
                              {coach.rating == null
                                ? 0
                                : coach.rating.toFixed(1)}
                            </Box>
                          </Flex>
                        </Flex>
                        {token && (
                          <Button
                            textTransform="uppercase"
                            background="#1E99D6"
                            textColor="white"
                            borderRadius="2xl"
                            alignSelf="end"
                            onClick={() =>
                              navigate(`/coachDetails/${coach.id}`)
                            }
                          >
                            Sužinoti daugiau
                          </Button>
                        )}
                      </Flex>
                    </Flex>
                  </Box>
                );
              })}
          </SimpleGrid>
          <Pagination
            pageCount={pages.total}
            currentPage={pages.currentPage}
            onPageChange={handlePaginate}
          />
        </>
      )}
    </Container>
  );
};
``;

export default MainCoachesList;
