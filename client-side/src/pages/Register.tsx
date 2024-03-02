import { ChangeEvent, FormEvent, useState } from "react";
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
  Textarea,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { STUDENT_ROLE, COACH_ROLE, URL_ADDRESS } from "../Helpers/constants";
import { useNavigate } from "react-router-dom";
import { User } from "../Types/types";

type eventHandleChange<T extends HTMLElement> = ChangeEvent<T>;

const Register = () => {
  const navigate = useNavigate();
  const [isCoach, setIsCoach] = useState(false);
  const [formState, setFormState] = useState<User>();
  const [isInitWindow, setIsInitWindow] = useState(true);

  const handleFormInputChange = (
    e: eventHandleChange<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    isNumber: boolean
  ) => {
    const value = isNumber
      ? (e.target.value as unknown as number)
      : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const handleStateChange = (value: boolean) => {
    setIsInitWindow(false);
    setIsCoach(value);
  };

  const Registration = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response = await fetch(URL_ADDRESS + "user/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: formState?.name,
        surname: formState?.surname,
        email: formState?.email,
        role: isCoach ? COACH_ROLE : STUDENT_ROLE,
        phoneNumber: formState?.phoneNumber,
        birthDate: formState?.birthDate,
        password: formState?.password,
        height: formState?.height,
        weight: formState?.weight,
        footSize: formState?.footSize,
        metabolicAge: formState?.metabolicAge,
        education: formState?.education,
        experience: formState?.experience,
        specialization: formState?.specialization,
        description: formState?.description
      }),
    });
    if (response.status === 201) {
      toast.success("Registracija sėkminga!");
      navigate("/login");
    } else {
      toast.error("Registracija nesėkminga");
    }
  };

  return (
    <Container>
      <Flex p={5} gap={5} border="solid" flexDir="column" alignItems="center">
        <Heading>Registruotis</Heading>
        <Box>
          Užpildykite {isCoach ? "trenerio" : "krepšininko"} registracijos
          duomenis
        </Box>
        <Flex>
          Jau turite paskyrą?&nbsp;
          <Box
            cursor="pointer"
            color="blue.400"
            onClick={() => navigate("/login")}
          >
            Prisijunkite
          </Box>
        </Flex>
        <form onSubmit={Registration}>
          <FormControl isRequired>
            {isInitWindow ? (
              <>
                <Flex gap={5}>
                  <Button
                    w={150}
                    background="blue.500"
                    textTransform="uppercase"
                    onClick={() => handleStateChange(true)}
                    textColor="white"
                  >
                    Treneris
                  </Button>
                  <Button
                    w={150}
                    textTransform="uppercase"
                    onClick={() => handleStateChange(false)}
                    textColor="black"
                  >
                    Krepšininkas
                  </Button>
                </Flex>
              </>
            ) : (
              <>
                <FormLabel>Vardas</FormLabel>
                <Input
                  type="text"
                  mb={5}
                  name="name"
                  onChange={(e) => {
                    handleFormInputChange(e, false);
                  }}
                  isRequired
                />
                <FormLabel>Pavardė</FormLabel>
                <Input
                  type="text"
                  mb={5}
                  name="surname"
                  onChange={(e) => {
                    handleFormInputChange(e, false);
                  }}
                  isRequired
                />
                <FormLabel>El. Paštas</FormLabel>
                <Input
                  type="email"
                  mb={5}
                  name="email"
                  onChange={(e) => {
                    handleFormInputChange(e, false);
                  }}
                  isRequired
                />
                <FormLabel>Gimimo data</FormLabel>
                <Input
                  type="date"
                  mb={5}
                  name="birthDate"
                  onChange={(e) => {
                    handleFormInputChange(e, false);
                  }}
                  isRequired
                />
                <FormLabel>Telefono nr.</FormLabel>
                <Input
                  type="text"
                  mb={5}
                  name="phoneNumber"
                  onChange={(e) => {
                    handleFormInputChange(e, false);
                  }}
                  isRequired
                />
                {isCoach ? (
                  <>
                    <FormLabel>Aprašymas</FormLabel>
                    <Textarea
                      name="description"
                      onChange={(e) => {
                        handleFormInputChange(e, false);
                      }}
                    ></Textarea>
                    <FormLabel>Išsilavinimas</FormLabel>
                    <Select
                      mb={5}
                      name="education"
                      onChange={(e) => {
                        handleFormInputChange(e, false);
                      }}
                      isRequired
                      defaultValue=""
                    >
                      <option hidden disabled value="">
                        Pasirinkite
                      </option>
                      <option value="Higher">Aukštasis išsilavinimas</option>
                      <option value="HigherUniversity">
                        Aukštasis universitetinis išsilavinimas
                      </option>
                      <option value="HigherCollege">
                        Aukštasis koleginis išsilavinimas
                      </option>
                      <option value="Secondary">Vidurinis išsilavinimas</option>
                    </Select>
                    <FormLabel>Patirtis metais</FormLabel>
                    <Input
                      type="number"
                      mb={5}
                      name="experience"
                      onChange={(e) => {
                        handleFormInputChange(e, true);
                      }}
                      isRequired
                    />
                    <FormLabel>Specializacija</FormLabel>
                    <Input
                      type="text"
                      mb={5}
                      name="specialization"
                      onChange={(e) => {
                        handleFormInputChange(e, false);
                      }}
                      isRequired
                    />
                    <FormLabel>Slaptažodis</FormLabel>
                    <Input
                      type="password"
                      mb={5}
                      name="password"
                      onChange={(e) => {
                        handleFormInputChange(e, false);
                      }}
                      isRequired
                    />
                    <Button
                      type="submit"
                      w="100%"
                      background="blue.500"
                      color="white"
                    >
                      Registruotis
                    </Button>
                  </>
                ) : (
                  <>
                    <FormLabel>Ūgis (cm.)</FormLabel>
                    <Input
                      type="number"
                      mb={5}
                      name="height"
                      onChange={(e) => {
                        handleFormInputChange(e, true);
                      }}
                      isRequired
                    />
                    <FormLabel>Svoris (kg.)</FormLabel>
                    <Input
                      type="number"
                      mb={5}
                      name="weight"
                      onChange={(e) => {
                        handleFormInputChange(e, true);
                      }}
                      isRequired
                    />
                    <FormLabel>Pėdos dydis (EU)</FormLabel>
                    <Input
                      type="number"
                      mb={5}
                      name="footSize"
                      onChange={(e) => {
                        handleFormInputChange(e, true);
                      }}
                      isRequired
                    />
                    <FormLabel>Metabolinis amžius</FormLabel>
                    <Input
                      type="text"
                      mb={5}
                      name="metabolicAge"
                      onChange={(e) => {
                        handleFormInputChange(e, true);
                      }}
                      isRequired
                    />
                    <FormLabel>Slaptažodis</FormLabel>
                    <Input
                      type="password"
                      mb={5}
                      name="password"
                      onChange={(e) => {
                        handleFormInputChange(e, false);
                      }}
                      isRequired
                    />
                    <Button
                      type="submit"
                      w="100%"
                      background="blue.500"
                      color="white"
                    >
                      Registruotis
                    </Button>
                  </>
                )}
              </>
            )}
          </FormControl>
        </form>
        {!isInitWindow && (
          <Button onClick={() => setIsInitWindow(true)}>Grįžti</Button>
        )}
      </Flex>
    </Container>
  );
};

export default Register;
