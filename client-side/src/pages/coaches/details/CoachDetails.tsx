import React from "react";
import Container from "../../../components/Container";
import { Box, Divider, Flex, Heading, Image } from "@chakra-ui/react";

const CoachDetails = () => {
  return (
    <Container minW={1000}>
      <Box border="solid">
        <Flex>
          <Box alignSelf="center" h={40} w={60}>
            <Image
              w="100%"
              h="100%"
              src="https://m.basketnews.lt/paveikslelis-25361-crop700x700.jpg"
            ></Image>
          </Box>
          <Flex flexDir="column">
            <Heading size="md">Šarūnas Jasikevičius</Heading>
            <Box>Krepsinio treneris</Box>
            <Flex mb={10}>
              <Box>Planai 120</Box>
              <Box>Klientai 120</Box>
              <Box>Patirtis 10m</Box>
            </Flex>
            <Flex flexDir="column">
              <Box>+37066666666</Box>
              <Box>saras@saras.com</Box>
              <Box>1976</Box>
              <Box>Aukstasis</Box>
            </Flex>
          </Flex>
          <Flex flexDir="column">
            <Box>Patvirtintas profilis</Box>
            <Box>9.5</Box>
          </Flex>
        </Flex>
        <Box>
            Test
        </Box>
      </Box>
    </Container>
  );
};

export default CoachDetails;
