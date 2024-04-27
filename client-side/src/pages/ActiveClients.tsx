import {
  Container,
  Center,
  Spinner,
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { ActiveClient } from "../Types/types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Unauthorized } from "../Helpers/constants";
import eventBus from "../Helpers/eventBus";
import moment from "moment";

const ActiveClients = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeClients, setActiveClients] = useState<ActiveClient[]>([]);
  const token = localStorage.getItem("accessToken");

  const getActiveClients = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "exerciseFlow/activeClients",
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
      const activeClients = await response.json();
      setActiveClients(activeClients);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    getActiveClients();
  }, [getActiveClients]);

  const navigate = useNavigate();
  return (
    <Container minW={1200}>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <>
          <Flex justify="center" mb={10} mt={10}>
            <Heading size="xl">Aktyvūs klientai</Heading>
          </Flex>
          <Box overflowX="auto" maxWidth="100%" mt={5}>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Krepšininkas</Th>
                  <Th>Treniruočių planas</Th>
                  <Th>Terminas</Th>
                  <Th>Ar yra neįvertintų pratimų?</Th>
                </Tr>
              </Thead>
              <Tbody>
                {activeClients.map((activeClient) => (
                  <Tr>
                    <Td>
                      <Text
                        color="#1E99D6"
                        cursor="pointer"
                        onClick={() =>
                          navigate(
                            `/exercisesEvaluation/${activeClient.userId}/${activeClient.trainingPlanId}`
                          )
                        }
                      >
                        {activeClient.fullName}
                      </Text>
                    </Td>
                    <Td>
                      <Text>{activeClient.trainingPlan}</Text>
                    </Td>
                    <Td>
                      <Text>
                        {moment(
                          new Date(
                            moment(activeClient.deadline).utc(true).toString()
                          )
                        ).format("YYYY-MM-DD")}
                      </Text>
                    </Td>
                    <Td>
                      <Text>
                        {activeClient.isExistsNotEvaluatedExercises
                          ? "Taip"
                          : "Ne"}
                      </Text>
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

export default ActiveClients;
