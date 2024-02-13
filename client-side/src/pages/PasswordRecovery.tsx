import React from "react";
import Container from "../components/Container";
import {
  Flex,
  Heading,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Divider,
} from "@chakra-ui/react";

const PasswordRecovery = () => {
  return (
    <Container>
      <Flex p={5} border="solid" flexDir="column" alignItems="center">
        <Heading>Atkurti paskyrą</Heading>
        <Box my={5}>
          Įrašykite savo el. paštą, norėdami gauti slaptažodžio atstatymo
          nuorodą.
        </Box>
        <FormControl>
          <FormLabel>El. Paštas</FormLabel>
          <Input type="email" />
          <Button
            type="submit"
            w="100%"
            my={5}
            textTransform="uppercase"
            background="blue.500"
          >
            Atstatyti slaptažodį
          </Button>
        </FormControl>
        <Divider />
        <Button type="submit" w="100%" mt={5} textTransform="uppercase">
          Grįžti atgal
        </Button>
      </Flex>
    </Container>
  );
};

export default PasswordRecovery;
