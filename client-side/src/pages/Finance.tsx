import { Box, Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import BarChart from "../components/Chart/BarChart";
import LineChart from "../components/Chart/LineChart";
import Container from "../components/Container";
import { Unauthorized } from "../Helpers/constants";
import { useCallback, useEffect, useState } from "react";
import { Statistics } from "../Types/types";
import toast from "react-hot-toast";
import eventBus from "../Helpers/eventBus";
import { ExtractDataToArray } from "../components/Chart/ExtractDataToArray";
import handleErrorMessage from "../Helpers/errorHandler";

const Finance = () => {
  const [statistics, setStatistics] = useState<Statistics>();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  const getStatistics = useCallback(async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + `statistics`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const statistics = await response.json();
      setStatistics(statistics);
      setIsLoading(false);
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  }, []);

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);

  return (
    <Container minW={1600}>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <>
          <SimpleGrid columns={2} gap={5}>
            <Box height="400px">
              <LineChart
                title="Registruotų trenerių skaičius sistemoje"
                data={ExtractDataToArray(statistics!.registeredCoaches)}
              />
            </Box>
            <Box height="400px">
              <LineChart
                title="Registruotų krepšininkų skaičius sistemoje"
                data={ExtractDataToArray(statistics!.registeredStudents)}
              />
            </Box>
            <Box height="400px">
              <BarChart
                title="Užsakymų skaičius"
                data={ExtractDataToArray(statistics!.ordersAmount)}
              />
            </Box>
            <Box height="400px">
              <BarChart
                title="Surinkta komisinio mokesčio"
                data={ExtractDataToArray(statistics!.commissions)}
              />
            </Box>
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export default Finance;
