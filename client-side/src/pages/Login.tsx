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
import { useNavigate } from "react-router-dom";
import eventBus from "../Helpers/eventBus";
import handleErrorMessage from "../Helpers/errorHandler";

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
    const response = await fetch(import.meta.env.VITE_API_URL + "user/login", {
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
      eventBus.dispatch("storage", "");
      navigate("/");
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  };

  return (
    <Container>
      <Flex p={5} border="solid" flexDir="column" alignItems="center">
        <Heading>Prisijungti</Heading>
        <Flex mt={5}>
          Dar neturite paskyros?&nbsp;
          <Box
            cursor="pointer"
            color="blue.400"
            onClick={() => navigate("/register")}
          >
            Registruokitės!
          </Box>
        </Flex>
        <form onSubmit={(e) => Login(e)}>
          <FormControl mt={5} isRequired>
            <FormLabel>El. Paštas</FormLabel>
            <Input
              border="solid"
              borderWidth="1px"
              type="email"
              onChange={(e) => {
                onEmailChange(e);
              }}
              isRequired
            />
            <FormLabel mt={5}>Slaptažodis</FormLabel>
            <Input
              border="solid"
              borderWidth="1px"
              type="password"
              onChange={(e) => {
                onPasswordChange(e);
              }}
              isRequired
            />
            <Box
              cursor="pointer"
              color="blue.400"
              textAlign="center"
              my={5}
              onClick={() => navigate("/recover")}
            >
              Pamiršote slaptažodį?
            </Box>
            <Button
              type="submit"
              w="100%"
              textTransform="uppercase"
              background="#1E99D6"
              textColor="white"
              borderRadius="2xl"
            >
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
