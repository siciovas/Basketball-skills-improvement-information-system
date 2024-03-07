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
import { URL_ADDRESS, Unauthorized } from "../Helpers/constants";
import toast from "react-hot-toast";
import { Coach } from "../Types/types";
import eventBus from "../Helpers/eventBus";
import CoachFilter from "../components/CoachFilter";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";

interface FilterProps {
  from: Date | undefined;
  to: Date | undefined;
  status: string[];
}

const CoachesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [filterData, setFilterData] = useState<FilterProps>({
    from: undefined,
    to: undefined,
    status: [],
  });

  const navigate = useNavigate();

  const getCoachesList = useCallback(async () => {
    const response = await fetch(URL_ADDRESS + "user/getCoaches", {
      headers: {
        "Content-Type": "application/json",
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

  const handleFilterChange = (value: string | string[]) => {
    setFilterData({ ...filterData, ["status"]: value as string[] });
  };

  const handleDateRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value ? new Date(e.target.value) : undefined,
    });
    console.log(e.target.value);
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
            <Heading size="xl">Trenerių sąrašas</Heading>
          </Flex>
          <Box overflowX="auto" maxWidth="100%" mt={5}>
            <CoachFilter
              onFilterStatusChange={handleFilterChange}
              onDateRangeChange={handleDateRangeChange}
            />
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
                  .map((coach) => (
                    <Tr>
                      <Td>
                        <Text>{coach.fullName}</Text>
                      </Td>
                      <Td>
                        <Text>{coach.specialization}</Text>
                      </Td>
                      <Td>
                        <Text>{coach.rating}</Text>
                      </Td>
                      <Td>
                        <Text>{coach.coachStatus}</Text>
                      </Td>
                      <Td>
                        <Text>{coach.registerDate}</Text>
                      </Td>
                      <Td>
                        <Button
                          backgroundColor="#1E99D6"
                          color="white"
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
