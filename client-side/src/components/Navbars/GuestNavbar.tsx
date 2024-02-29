import { Box, Flex } from "@chakra-ui/react";
import MainNavBar from "./MainNavbar";
import { useNavigate } from "react-router-dom";

const GuestNavbar = () => {
  const navigate = useNavigate();

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
        <Box cursor="pointer" className="fa-solid fa-user fa-xl" onClick={() => navigate('/login')}></Box>
        <Box cursor="pointer" className="fa-solid fa-cart-shopping fa-xl"></Box>
      </Flex>
    </Flex>
  );
};

export default GuestNavbar;
