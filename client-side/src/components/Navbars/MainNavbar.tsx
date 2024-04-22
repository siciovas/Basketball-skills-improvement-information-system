import { Box, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MainNavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex>
        <Image
          ml={5}
          h={45}
          src="/logo.ico"
          cursor="pointer"
          onClick={() => navigate("/")}
        />
      </Flex>
      <Flex gap={10} mr={5} alignItems="center">
        <Box cursor="pointer" onClick={() => navigate("/")}>
          PAGRINDINIS
        </Box>
        <Box cursor="pointer" onClick={() => navigate("/allCoaches")}>
          TRENERIAI
        </Box>
        <Box cursor="pointer" onClick={() => navigate("/aboutUs")}>
          APIE
        </Box>
      </Flex>
    </>
  );
};

export default MainNavBar;
