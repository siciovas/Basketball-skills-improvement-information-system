import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";

const MainNavBar = () => {
  return (
    <>
      <Flex>
        <Image ml={5} h={45} src="/logo.ico" cursor="pointer" />
      </Flex>
      <Flex gap={10} mr={5} alignItems="center">
        <Box cursor="pointer">PAGRINDINIS</Box>
        <Box cursor="pointer">TRENERIAI</Box>
        <Box cursor="pointer">APIE</Box>
      </Flex>
    </>
  );
};

export default MainNavBar;
