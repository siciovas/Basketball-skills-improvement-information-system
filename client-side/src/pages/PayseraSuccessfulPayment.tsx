import { Box, Flex, Heading } from "@chakra-ui/react";

const PayseraSuccessfulPayment = () => {
  return (
    <>
      <Flex justify={"center"} align={"center"} mt={10}>
        <Heading size={"md"}>Užsakymas patvirtintas!</Heading>
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
      <Flex justifyContent={"center"}>
        <Heading mt={15} size="md">
          Užsakymas
        </Heading>
      </Flex>
    </>
  );
};

export default PayseraSuccessfulPayment;
