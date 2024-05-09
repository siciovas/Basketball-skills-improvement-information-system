import {
  Box,
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
} from "@chakra-ui/react";
import OrderFilter from "../components/OrderFilter";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import eventBus from "../Helpers/eventBus";
import { Unauthorized } from "../Helpers/constants";
import { Orders } from "../Types/types";
import toast from "react-hot-toast";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import handleErrorMessage from "../Helpers/errorHandler";

interface FilterProps {
  from: Date | undefined;
  to: Date | undefined;
}

interface SortProps {
  date: boolean | undefined;
  price: boolean | undefined;
}

const MyOrders = () => {
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
    const response = await fetch(
      import.meta.env.VITE_API_URL + "order/myOrders",
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
          <Flex justify="center" align="center" mb={10} mt={5} gap={5}>
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
                  <Th>Suma</Th>
                  <Th>Veiksmas</Th>
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
                        <Text>{order.id}</Text>
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
                        <Text>{order.price?.toFixed(2)}€</Text>
                      </Td>
                      <Td>
                        <Text
                          cursor="pointer"
                          as="u"
                          color="blue.400"
                          onClick={() =>
                            navigate(
                              order.isPaid
                                ? `/viewOrderedPlan/${order.id}`
                                : `/checkout/${order.id}`
                            )
                          }
                        >
                          {order.isPaid
                            ? "Peržiūrėti užsakymą"
                            : "Užbaigti užsakymą"}
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

export default MyOrders;
