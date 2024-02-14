import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { url_address } from "../Helpers/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value as string);
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value as string);
  };

  const Login = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response = await fetch(url_address + 'user/login', {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.status === 200) {
      toast.success("Prisijungta!");
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("role", data.role);
      navigate("/");
    } else {
      toast.error("Prisijungimas nepavyko!");
    }
  };

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
        <form onSubmit={(e) => Login(e)}>
          <FormControl>
            <FormLabel>El. Paštas</FormLabel>
            <Input type="email" onChange={(e) => {onEmailChange(e)}}/>
            <FormLabel>Slaptažodis</FormLabel>
            <Input type="password" onChange={(e) => {onPasswordChange(e)}}/>
            <Box cursor="pointer" color="blue.400" textAlign="right" my={5}>
              Pamiršote slaptažodį?
            </Box>
            <Button type="submit" w="100%" background="blue.500" textColor="white">
              <Box pos="absolute" w="100%" textAlign="left" ml={5}>
                <i className="fa fa-solid fa-lock" />
              </Box>
              Prisijungti
            </Button>
          </FormControl>
        </form>
      </Flex>
    </Container>
  );
};

export default Login;
