import { useNavigate } from "react-router-dom";
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
import { useState, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";

const PasswordRecovery = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      import.meta.env.VITE_API_URL + "passwordRecovery",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      }
    );
    if (response.status === 201) {
      toast.success("Paskyros atkūrimo nuoroda išsiųsta nurodytu el. paštu");
    } else {
      toast.error("Klaida");
    }
  };
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Flex p={5} border="solid" flexDir="column" alignItems="center">
          <Heading>Atkurti paskyrą</Heading>
          <Box my={5}>
            Įrašykite savo el. paštą, norėdami gauti slaptažodžio atstatymo
            nuorodą.
          </Box>
          <FormControl>
            <FormLabel>El. Paštas</FormLabel>
            <Input type="email" onChange={onEmailChange} />
            <Button
              type="submit"
              w="100%"
              my={5}
              textTransform="uppercase"
              background="blue.500"
              textColor="white"
            >
              Atstatyti slaptažodį
            </Button>
          </FormControl>
          <Divider />
          <Button
            type="submit"
            w="100%"
            mt={5}
            textTransform="uppercase"
            onClick={() => navigate("/login")}
          >
            Grįžti atgal
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default PasswordRecovery;
