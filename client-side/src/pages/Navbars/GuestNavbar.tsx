import { Box, Flex, Image } from "@chakra-ui/react";
import "./Navbar.css";

const GuestNavbar = () => {
  return (
    <Flex
      w="100%"
      py={2}
      justifyContent="space-between"
      borderBottom="1px"
      borderBottomColor="black"
    >
      <Flex>
        <Image ml={5} h={45} src="/logo.ico" cursor="pointer" />
      </Flex>
      <Flex gap={10} alignItems="center">
        <Box cursor="pointer">PAGRINDINIS</Box>
        <Box cursor="pointer">TRENERIAI</Box>
        <Box cursor="pointer">APIE</Box>
      </Flex>
      <Flex mr={10} alignItems="center" gap={10} >
        <i className="fa-solid fa-user"></i>
        <i className="fa-solid fa-cart-shopping"></i>
      </Flex>
    </Flex>
  );
};

export { GuestNavbar };
