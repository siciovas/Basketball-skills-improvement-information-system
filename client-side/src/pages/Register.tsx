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
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { url_address } from "../Helpers/constants";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isTeacher, setIsTeacher] = useState(false);
  const [isInitWindow, setIsInitWindow] = useState(true);

  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [birthday, setBirthday] = useState<Date>();
  const [password, setPassword] = useState<string>();

  //For student
  const [height, setHeight] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [footSize, setFootSize] = useState<number>();
  const [metabolicAge, setMetabolicAge] = useState<number>();

  //For coach
  const [education, setEducation] = useState<string>();
  const [experience, setExperience] = useState<number>();
  const [specialization, setSpecialization] = useState<string>();

  const onNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value as string);
  };
  const onSurnameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSurname(e.target.value as string);
  };
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value as string);
  };
  const onPhoneNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(e.target.value as string);
  };
  const onBirthdayChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setBirthday(e.target.valueAsDate as Date);
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value as string);
  };
  const onHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.valueAsNumber as number);
  };
  const onWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.valueAsNumber as number);
  };
  const onFootSizeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFootSize(e.target.valueAsNumber as number);
  };
  const onMetabolicAgeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMetabolicAge(e.target.valueAsNumber as number);
  };
  const onEducationChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setEducation(e.target.value as string);
  };
  const onExperienceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setExperience(e.target.valueAsNumber as number);
  };
  const onSpecializationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSpecialization(e.target.value as string);
  };

  const handleStateChange = (value: boolean) => {
    setIsInitWindow(false);
    setIsTeacher(value);
  };

  const Registration = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response = await fetch(url_address + 'user/register', {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name,
        surname,
        email,
        phoneNumber,
        birthday,
        password,
        height,
        weight,
        footSize,
        metabolicAge,
        education,
        experience,
        specialization,
      }),
    });
    if (response.status === 201) {
      toast.success("Registracija sėkminga!");
      navigate("/prisijungimas");
    } else {
      toast.error('Registracija nesėkminga');
    }
  }

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
        ) : isTeacher ? (
          <>
            <Box>Užpildykite trenerio registracijos duomenis</Box>
            <Flex>
              Jau turite paskyrą?&nbsp;
              <Box cursor="pointer" color="blue.400">
                Prisijunkite
              </Box>
            </Flex>
            <form onSubmit={(e) => Registration(e)}>
              <FormControl isRequired>
                <FormLabel>Vardas</FormLabel>
                <Input type="text" mb={5} onChange={(e) => { onNameChange(e) }} isRequired />
                <FormLabel>Pavardė</FormLabel>
                <Input type="text" mb={5} onChange={(e) => { onSurnameChange(e) }} isRequired />
                <FormLabel>El. Paštas</FormLabel>
                <Input type="email" mb={5} onChange={(e) => { onEmailChange(e) }} isRequired />
                <FormLabel>Gimimo data</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  type="date"
                  mb={5}
                  onChange={(e) => { onBirthdayChange(e) }}
                  isRequired
                />
                <FormLabel>Telefono nr.</FormLabel>
                <Input type="text" mb={5} onChange={(e) => { onPhoneNumberChange(e) }} isRequired />
                <FormLabel>Išsilavinimas</FormLabel>
                <Select mb={5} onChange={(e) => { onEducationChange(e) }} isRequired>
                  <option selected hidden disabled value="">Pasirinkite</option>
                  <option value="option1">Aukštasis išsilavinimas</option>
                  <option value="option2">Aukštasis universitetinis išsilavinimas</option>
                  <option value="option3">Aukštasis koleginis išsilavinimas</option>
                  <option value="option4">Vidurinis išsilavinimas</option>
                </Select>
                <FormLabel>Patirtis metais</FormLabel>
                <Input type="number" mb={5} onChange={(e) => { onExperienceChange(e) }} isRequired />
                <FormLabel>Specializacija</FormLabel>
                <Input type="text" mb={5} onChange={(e) => { onSpecializationChange(e) }} isRequired />
                <FormLabel>Slaptažodis</FormLabel>
                <Input type="password" mb={5} onChange={(e) => { onPasswordChange(e) }} isRequired />
                <FormLabel>Pakartoti slaptažodį</FormLabel>
                <Input type="password" mb={5} onChange={(e) => { onPasswordChange(e) }} isRequired />
                <Button
                  type="submit"
                  w="100%"
                  background="blue.500"
                  color="white"
                >
                  Registruotis
                </Button>
              </FormControl>
            </form>
          </>
        ) : (
          <>
            <Box>Užpildykite krepšininko registracijos duomenis</Box>
            <Flex>
              Jau turite paskyrą?&nbsp;
              <Box cursor="pointer" color="blue.400">
                Prisijunkite
              </Box>
            </Flex>
            <form onSubmit={(e) => Registration(e)}>
              <FormControl isRequired>
                <FormLabel>Vardas</FormLabel>
                <Input type="text" mb={5} onChange={(e) => { onNameChange(e) }} isRequired />
                <FormLabel>Pavardė</FormLabel>
                <Input type="text" mb={5} onChange={(e) => { onSurnameChange(e) }} isRequired />
                <FormLabel>El. Paštas</FormLabel>
                <Input type="email" mb={5} onChange={(e) => { onEmailChange(e) }} isRequired />
                <FormLabel>Gimimo data</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  type="date"
                  mb={5}
                  onChange={(e) => { onBirthdayChange(e) }}
                />
                <FormLabel>Telefono nr.</FormLabel>
                <Input type="text" mb={5} onChange={(e) => { onPhoneNumberChange(e) }} isRequired />
                <FormLabel>Ūgis (cm.)</FormLabel>
                <Input type="number" mb={5} onChange={(e) => { onHeightChange(e) }} isRequired />
                <FormLabel>Svoris (kg.)</FormLabel>
                <Input type="number" mb={5} onChange={(e) => { onWeightChange(e) }} isRequired />
                <FormLabel>Pėdos dydis (EU)</FormLabel>
                <Input type="number" mb={5} onChange={(e) => { onFootSizeChange(e) }} isRequired />
                <FormLabel>Metabolinis amžius</FormLabel>
                <Input type="text" mb={5} onChange={(e) => { onMetabolicAgeChange(e) }} isRequired />
                <FormLabel>Slaptažodis</FormLabel>
                <Input type="password" mb={5} onChange={(e) => { onPasswordChange(e) }} isRequired />
                <FormLabel>Pakartoti slaptažodį</FormLabel>
                <Input type="password" mb={5} onChange={(e) => { onPasswordChange(e) }} isRequired />
                <Button
                  type="submit"
                  w="100%"
                  background="blue.500"
                  color="white"
                >
                  Registruotis
                </Button>
              </FormControl>
            </form>
          </>
        )}
      </Flex>
    </Container>
  );
};

export default Register;
