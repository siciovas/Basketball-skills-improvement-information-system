import Container from "../components/Container";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const NewPassword = () => {
  return (
    <Container>
      <Flex p={5} border="solid" flexDir="column" alignItems="center">
        <Heading textAlign="left" wordBreak="break-all">
          Nustatyti naują slaptažodį
        </Heading>
        <FormControl>
          <FormLabel>Naujas slaptažodis</FormLabel>
          <Input type="password" />
          <FormLabel>Patvirtinti naują slaptažodį</FormLabel>
          <Input type="password" />
          <Button
            type="submit"
            w="100%"
            mt={5}
            textTransform="uppercase"
            background="blue.500"
            textColor="white"
          >
            Nustatyti naują slaptažodį
          </Button>
        </FormControl>
      </Flex>
    </Container>
  );
};

export default NewPassword;
