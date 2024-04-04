import { Box, Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";

const AdminHomePage = () => {
  return (
    <Container minW={1000}>
      <SimpleGrid columns={4} spacing={10} mt={10}>
        <Box w={225} h={125} border="1px" borderRadius="lg" bg="#FDFFFC">
          <Flex gap={4} align="center" justify="space-evenly">
            <Heading>100</Heading>
            <Box className="fa-solid fa-briefcase fa-2xl"></Box>
          </Flex>
          <Flex justify="center" align="center" h="50%">
            <Heading size="sm">Registruoti treneriai</Heading>
          </Flex>
        </Box>
        <Box w={225} h={125} border="1px" borderRadius="lg" bg="#1E98D6">
          <Flex gap={4} align="center" justify="space-evenly">
            <Heading>100</Heading>
            <Box className="fa-solid fa-person-running fa-2xl"></Box>
          </Flex>
          <Flex justify="center" align="center" h="50%">
            <Heading size="sm">Registruoti krepšininkai</Heading>
          </Flex>
        </Box>
        <Box w={225} h={125} border="1px" borderRadius="lg" bg="#2E4057">
          <Flex gap={4} align="center" justify="space-evenly">
            <Heading color="white">100</Heading>
            <Box className="fa-solid fa-list-check fa-2xl" color="white"></Box>
          </Flex>
          <Flex justify="center" align="center" h="50%">
            <Heading size="sm" color="white">
              Treniruočių planai
            </Heading>
          </Flex>
        </Box>
        <Box w={225} h={125} border="1px" borderRadius="lg" bg="#2F2D2E">
          <Flex gap={4} align="center" justify="space-evenly">
            <Heading color="white">100</Heading>
            <Box
              className="fa-solid fa-cart-shopping fa-2xl"
              color="white"
            ></Box>
          </Flex>
          <Flex justify="center" align="center" h="50%">
            <Heading size="sm" color="white">
              Užbaigti užsakymai
            </Heading>
          </Flex>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default AdminHomePage;
