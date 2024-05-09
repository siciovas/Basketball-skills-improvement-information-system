import {
  Center,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Box,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Orders } from "../Types/types";
import eventBus from "../Helpers/eventBus";
import { Unauthorized } from "../Helpers/constants";
import toast from "react-hot-toast";
import moment from "moment";
import OrderFilter from "../components/OrderFilter";
import { useNavigate } from "react-router-dom";
import handleErrorMessage from "../Helpers/errorHandler";

interface FilterProps {
  from: Date | undefined;
  to: Date | undefined;
}

interface SortProps {
  date: boolean | undefined;
  price: boolean | undefined;
}

const AllOrders = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const [orders, setOrders] = useState<Orders[]>([]);
  const [filterData, setFilterData] = useState<FilterProps>({
    from: undefined,
    to: undefined,
  });
  const [sortData, setSortData] = useState<SortProps>({
    date: true,
    price: undefined,
  });

  const getOrderedList = useCallback(async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + "order", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const orders = await response.json();
      setOrders(orders);
      setIsLoading(false);
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  }, []);

  useEffect(() => {
    getOrderedList();
  }, []);

  const handleSortChange = (value: string | string[]) => {
    const name = (value as string).split(";")[0];
    const data = (value as string).split(";")[1];
    if (name === "price") {
      setSortData({ price: Boolean(parseInt(data)), date: undefined });
    } else {
      setSortData({ date: Boolean(parseInt(data)), price: undefined });
    }
  };

  const handleDateRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value ? new Date(e.target.value) : undefined,
    });
  };

  return (
    <Container minW={1400}>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <>
          <Flex justify="center" align="center" mb={10} mt={10} gap={5}>
            <Box className="fa-solid fa-cart-shopping fa-2xl" />
            <Heading size="xl">Užsakymai</Heading>
          </Flex>
          <Box overflowX="auto" maxWidth="100%" mt={5}>
            <OrderFilter
              onSortChange={handleSortChange}
              onDateRangeChange={handleDateRangeChange}
            />
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Užsakymo numeris</Th>
                  <Th>Data</Th>
                  <Th>Treneris</Th>
                  <Th>Krepšininkas</Th>
                  <Th>Plano pavadinimas</Th>
                  <Th>Suma</Th>
                  <Th>Komisinis mokestis</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders
                  .filter(
                    (x) =>
                      (filterData.from
                        ? new Date(x.orderDate) >= filterData.from
                        : true) &&
                      (filterData.to
                        ? new Date(x.orderDate) <= filterData.to
                        : true)
                  )
                  .sort((a, b) =>
                    sortData.date !== undefined
                      ? sortData.date
                        ? new Date(b.orderDate).getTime() -
                          new Date(a.orderDate).getTime()
                        : new Date(a.orderDate).getTime() -
                          new Date(b.orderDate).getTime()
                      : sortData.price
                      ? b.price - a.price
                      : a.price - b.price
                  )
                  .map((order) => (
                    <Tr>
                      <Td>
                        <Text
                          as="u"
                          color="blue.400"
                          cursor="pointer"
                          onClick={() =>
                            navigate(`/viewOrderedPlan/${order.id}`)
                          }
                        >
                          {order.id}
                        </Text>
                      </Td>
                      <Td>
                        <Text>
                          {moment(
                            new Date(
                              moment(order?.orderDate).utc(true).toString()
                            )
                          ).format("yyyy-MM-DD HH:mm:ss")}
                        </Text>
                      </Td>
                      <Td>
                        <Text>{order.coachFullName}</Text>
                      </Td>
                      <Td>
                        <Text>{order.studentFullName}</Text>
                      </Td>
                      <Td>
                        <Text>{order.trainingPlanTitle}</Text>
                      </Td>
                      <Td>
                        <Text>{order.price?.toFixed(2)}€</Text>
                      </Td>
                      <Td>
                        <Text>{order.commissionFee?.toFixed(2)}€</Text>
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

export default AllOrders;
