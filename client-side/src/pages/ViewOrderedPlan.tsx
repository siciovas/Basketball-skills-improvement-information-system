import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Unauthorized } from "../Helpers/constants";
import eventBus from "../Helpers/eventBus";
import { useParams } from "react-router-dom";
import moment from "moment";
import { OrderedPlanInfo } from "../Types/types";

const ViewOrderedPlan = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const [order, setOrder] = useState<OrderedPlanInfo>();
  const { id } = useParams();

  const getOrderedPlan = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `order/viewOrderedPlan/${id}`,
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
      const order = await response.json();
      setOrder(order);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    getOrderedPlan();
  }, []);

  return (
    <Container minW={1200}>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <>
          <Box border="1px" borderRadius="lg" p={10}>
            <Flex flexDir="column" mt={5} mb={5} gap={2}>
              <Flex align="center" gap={2}>
                <Box className="fa-solid fa-cart-shopping fa-xl" />
                <Flex>
                  <Heading size="md">UŽSAKYMO NUMERIS:&nbsp;</Heading>
                  <Text>{order?.id}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Heading size="md">UŽSAKYMO DATA:&nbsp;</Heading>
                <Text>
                  {moment(order?.orderDate).format("yyyy-MM-DD HH:mm:ss")}
                </Text>
              </Flex>
            </Flex>
            <Divider borderColor="black" mt={5} mb={5} />
            <Flex flexDir="column" gap={10}>
              <Heading size="md">UŽSAKYTA PASLAUGA</Heading>
              <Flex justify="space-between">
                <Heading size="sm">{order?.trainingPlanTitle}</Heading>
                <Heading size="sm">1 vnt.</Heading>
                <Heading size="sm">{order?.price}€</Heading>
              </Flex>
              <Text>Treneris:&nbsp; {order?.coachFullName}</Text>
            </Flex>
            <Divider borderColor="black" mt={5} mb={5} />
            <Flex justify="flex-end">
              <Heading size="lg">SUMA:&nbsp;</Heading>
              <Heading size="lg">{order?.price}€</Heading>
            </Flex>
          </Box>
          <Box border="1px" borderRadius="lg" p={10} mt={10}>
            <Heading size="md" mb={10}>
              UŽSAKYMO INFORMACIJA
            </Heading>
            <Flex gap={64}>
              <Flex flexDir="column" gap={5}>
                <Heading size="sm">Mokėtojo informacija</Heading>
                <Text>
                  {order?.buyerFullName}
                </Text>
                <Flex>
                  <Text fontWeight="bold">Tel. Nr.:&nbsp;</Text>
                  <Text>{order?.phoneNumber}</Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold">El. Paštas:&nbsp;</Text>
                  <Text>{order?.email}</Text>
                </Flex>
              </Flex>
              <Flex flexDir="column" gap={5}>
                <Heading size="sm">Mokėjimo būdas</Heading>
                <Text>Paysera</Text>
              </Flex>
            </Flex>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ViewOrderedPlan;
