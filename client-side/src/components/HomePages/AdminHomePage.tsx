import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import eventBus from "../../Helpers/eventBus";
import { Unauthorized } from "../../Helpers/constants";
import toast from "react-hot-toast";
import { Counts } from "../../Types/types";
import CommissionFee from "../CommissionFee";
import BarChart from "../Chart/BarChart";
import { ExtractDataToArray } from "../Chart/ExtractDataToArray";

const AdminHomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const [counts, setCounts] = useState<Counts>();

  const getCounts = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "statistics/counts",
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
      const counts = await response.json();
      setCounts(counts);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    getCounts();
  }, []);

  return (
    <Container minW={1000}>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <>
          <Grid templateColumns="repeat(4, 1fr)" mt={10} gap={5}>
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
                  <Heading>{counts?.coaches}</Heading>
                  <Box className="fa-solid fa-briefcase fa-2xl"></Box>
                </Flex>
                <Flex justify="center" align="center" h="50%">
                  <Heading size="sm">Registruoti treneriai</Heading>
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
                  <Heading>{counts?.students}</Heading>
                  <Box className="fa-solid fa-person-running fa-2xl"></Box>
                </Flex>
                <Flex justify="center" align="center" h="50%">
                  <Heading size="sm">Registruoti krepšininkai</Heading>
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
                  <Heading color="white">{counts?.trainingPlans}</Heading>
                  <Box
                    className="fa-solid fa-list-check fa-2xl"
                    color="white"
                  ></Box>
                </Flex>
                <Flex justify="center" align="center" h="50%">
                  <Heading size="sm" color="white">
                    Treniruočių planai
                  </Heading>
                </Flex>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex
                flexDir="column"
                border="1px"
                borderRadius="lg"
                bg="#2F2D2E"
                px={15}
                py={10}
                gap={5}
              >
                <Flex gap={4} align="center" justify="space-evenly">
                  <Heading color="white">{counts?.orders}</Heading>
                  <Box
                    className="fa-solid fa-cart-shopping fa-2xl"
                    color="white"
                  ></Box>
                </Flex>
                <Flex justify="center" align="center" h="50%">
                  <Heading size="sm" color="white">
                    Užbaigti užsakymai
                  </Heading>
                </Flex>
              </Flex>
            </GridItem>
            <GridItem colSpan={2}>
              <CommissionFee />
            </GridItem>
            <GridItem colSpan={2}>
              <BarChart
                title="Surinkta komisinio mokesčio"
                data={ExtractDataToArray(counts!.commissions)}
              />
            </GridItem>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default AdminHomePage;
