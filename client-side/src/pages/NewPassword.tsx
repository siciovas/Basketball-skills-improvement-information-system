import { useParams } from "react-router-dom";
import Container from "../components/Container";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

const NewPassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const onConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };

  const handlePasswordRecover = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      import.meta.env.VITE_API_URL + `passwordRecovery/newPassword/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          password,
          confirmPassword,
        }),
      }
    );
    if (response.status === 200) {
      toast.success("Slaptažodis pakeistas sėkmingai");
    } else {
      toast.error("Klaida");
    }
  };

  return (
    <Container>
      <form onSubmit={handlePasswordRecover}>
        <Flex p={5} border="solid" flexDir="column" alignItems="center">
          <Heading textAlign="left" wordBreak="break-all">
            Nustatyti naują slaptažodį
          </Heading>
          <FormControl>
            <FormLabel>Naujas slaptažodis</FormLabel>
            <Input type="password" onChange={onPasswordChange} />
            <FormLabel>Patvirtinti naują slaptažodį</FormLabel>
            <Input type="password" onChange={onConfirmPasswordChange} />
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
      </form>
    </Container>
  );
};

export default NewPassword;
