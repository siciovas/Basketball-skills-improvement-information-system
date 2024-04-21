import { Box, Flex, Heading, Spinner, Center } from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const PayseraSuccessfulPayment = () => {
  const token = localStorage.getItem("accessToken");
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const completeOrder = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}order/${searchParams.get("ordernumber")}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
      }
    );
    if (response.status === 200) {
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    completeOrder();
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <>
          <Flex justify="center" align="center" mt={10}>
            <Heading size="md">Užsakymas patvirtintas!</Heading>
          </Flex>
          <Box className="wrapper">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </Box>
          <Flex justifyContent="center" mb={14}>
            <Heading mt={15} size="md">
              {`Užsakymas ${searchParams.get("ordernumber")}`}
            </Heading>
          </Flex>
        </>
      )}
    </>
  );
};

export default PayseraSuccessfulPayment;
