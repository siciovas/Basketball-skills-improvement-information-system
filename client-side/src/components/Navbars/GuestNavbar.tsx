import { Box, Flex } from "@chakra-ui/react";
import MainNavBar from "./MainNavbar";

const GuestNavbar = () => {
  return (
    <Flex
      w="100%"
      py={2}
      justifyContent="space-between"
      borderBottom="1px"
      borderBottomColor="black"
    >
      <MainNavBar />
      <Flex mr={5} alignItems="center" gap={5}>
        <Box className="fa-solid fa-user fa-xl"></Box>
        <Box className="fa-solid fa-cart-shopping fa-xl"></Box>
      </Flex>
    </Flex>
  );
};

export { GuestNavbar };
