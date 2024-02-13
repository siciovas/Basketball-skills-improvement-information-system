import React, { useState } from "react";
import Container from "../components/Container";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";

const Register = () => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [isInitWindow, setIsInitWindow] = useState(true);

  const handleStateChange = (value: boolean) => {
    setIsInitWindow(false);
    setIsTeacher(value);
    console.log(isTeacher);
  };

  return (
    <Container>
      <Flex p={5} gap={5} border="solid" flexDir="column" alignItems="center">
        <Heading>Registruotis</Heading>
        {isInitWindow ? (
          <>
            <Flex>
              Jau turite paskyrą?&nbsp;
              <Box cursor="pointer" color="blue.400">
                Prisijunkite
              </Box>
            </Flex>
            <Flex gap={5}>
              <Button
                w={150}
                background="blue.500"
                textTransform="uppercase"
                onClick={() => handleStateChange(true)}
              >
                Treneris
              </Button>
              <Button
                w={150}
                textTransform="uppercase"
                onClick={() => handleStateChange(false)}
              >
                Krepšininkas
              </Button>
            </Flex>
          </>
        ) : isTeacher ? (
          <>
            <Box>Užpildykite trenerio registracijos duomenis</Box>
            <Flex>
              Jau turite paskyrą?&nbsp;
              <Box cursor="pointer" color="blue.400">
                Prisijunkite
              </Box>
            </Flex>
            <FormControl>
              <FormLabel>Vardas</FormLabel>
              <Input type="text" mb={5} />
              <FormLabel>Pavardė</FormLabel>
              <Input type="text" mb={5} />
              <FormLabel>El. Paštas</FormLabel>
              <Input type="email" mb={5} />
              <FormLabel>Telefono nr.</FormLabel>
              <Input type="text" mb={5} />
              <FormLabel>Išsilavinimas</FormLabel>
              <Select mb={5} placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <FormLabel>Patirtis metais</FormLabel>
              <Input type="number" mb={5} />
              <FormLabel>Specializacija</FormLabel>
              <Input type="text" mb={5} />

              <Button
                type="submit"
                w="100%"
                background="blue.500"
                color="white"
              >
                Registruotis
              </Button>
            </FormControl>
          </>
        ) : (
          <></>
        )}
      </Flex>
    </Container>
  );
};

export default Register;
