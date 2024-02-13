import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import Container from "../components/Container";

const Login = () => {
  return (
    <Container>
      <Flex p={5} border="solid" flexDir="column" alignItems="center">
        <Heading>Prisijungti</Heading>
        <Flex>
          Dar neturite paskyros?&nbsp;
          <Box cursor="pointer" color="blue.400">
            Registruokitės!
          </Box>
        </Flex>
        <FormControl>
          <FormLabel>El. Paštas</FormLabel>
          <Input type="email" />
          <FormLabel>Slaptažodis</FormLabel>
          <Input type="password" />
          <Box cursor="pointer" color="blue.400" textAlign="right" my={5}>
            Pamiršote slaptažodį?
          </Box>
          <Button type="submit" w="100%" background="blue.500">
            <Box pos="absolute" w="100%" textAlign="left" ml={5}>
              <i className="fa fa-solid fa-lock" />
            </Box>
            Prisijungti
          </Button>
        </FormControl>
      </Flex>
    </Container>
  );
};

export default Login;
