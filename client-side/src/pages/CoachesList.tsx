import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Heading,
  Box,
  Text,
  Spinner,
  Button,
  Center,
} from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Unauthorized } from "../Helpers/constants";
import toast from "react-hot-toast";
import { Coach } from "../Types/types";
import eventBus from "../Helpers/eventBus";
import CoachFilter from "../components/CoachFilter";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import translations from "../Helpers/translations.json";
import CoachSort from "../components/CoachSort";
import handleErrorMessage from "../Helpers/errorHandler";

interface FilterProps {
  from: Date | undefined;
  to: Date | undefined;
  status: string[];
}

interface SortProps {
  date: boolean | undefined;
  rating: boolean | undefined;
}

const CoachesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const token = localStorage.getItem("accessToken");
  const [filterData, setFilterData] = useState<FilterProps>({
    from: undefined,
    to: undefined,
    status: [],
  });
  const [sortData, setSortData] = useState<SortProps>({
    date: true,
    rating: undefined,
  });

  const navigate = useNavigate();

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

  const handleFilterChange = (value: string | string[]) => {
    setFilterData({ ...filterData, ["status"]: value as string[] });
  };

  const handleDateRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value ? new Date(e.target.value) : undefined,
    });
  };

  const handleSortChange = (value: string | string[]) => {
    const name = (value as string).split(";")[0];
    const data = (value as string).split(";")[1];
    if (name === "rating") {
      setSortData({ rating: Boolean(parseInt(data)), date: undefined });
    } else {
      setSortData({ date: Boolean(parseInt(data)), rating: undefined });
    }
  };

  return (
    <Container minW={1200}>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <>
          <Flex justify="center" mb={10} mt={10}>
            <Heading size="xl">Treneriai</Heading>
          </Flex>
          <Box overflowX="auto" maxWidth="100%" mt={5}>
            <Flex justify="flex-end" mb={5}>
              <CoachFilter
                onFilterStatusChange={handleFilterChange}
                onDateRangeChange={handleDateRangeChange}
              />
              <CoachSort onSortChange={handleSortChange} />
            </Flex>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Vardas Pavardė</Th>
                  <Th>Specializacija</Th>
                  <Th>Reitingas</Th>
                  <Th>Statusas</Th>
                  <Th>Registracijos data</Th>
                </Tr>
              </Thead>
              <Tbody>
                {coaches
                  .filter(
                    (x) =>
                      (filterData.status.length > 0
                        ? filterData.status.includes(
                            x.coachStatus.toLowerCase()
                          )
                        : true) &&
                      (filterData.from
                        ? new Date(x.registerDate) >= filterData.from
                        : true) &&
                      (filterData.to
                        ? new Date(x.registerDate) <= filterData.to
                        : true)
                  )
                  .sort((a, b) =>
                    sortData.date !== undefined
                      ? sortData.date
                        ? new Date(b.registerDate).getTime() -
                          new Date(a.registerDate).getTime()
                        : new Date(a.registerDate).getTime() -
                          new Date(b.registerDate).getTime()
                      : sortData.rating
                      ? b.rating - a.rating
                      : a.rating - b.rating
                  )
                  .map((coach) => (
                    <Tr>
                      <Td>
                        <Text>{coach.fullName}</Text>
                      </Td>
                      <Td>
                        <Text>{coach.specialization}</Text>
                      </Td>
                      <Td>
                        <Text>{coach.rating == null ? 0 : coach.rating.toFixed(1)}</Text>
                      </Td>
                      <Td>
                        <Text>
                          {
                            translations[
                              coach.coachStatus.toLowerCase() as keyof typeof translations
                            ]
                          }
                        </Text>
                      </Td>
                      <Td>
                        <Text>{coach.registerDate}</Text>
                      </Td>
                      <Td>
                        <Button
                          textTransform="uppercase"
                          background="#1E99D6"
                          textColor="white"
                          borderRadius="2xl"
                          onClick={() => navigate(`/manageCoach/${coach.id}`)}
                        >
                          Plačiau
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CoachesList;
