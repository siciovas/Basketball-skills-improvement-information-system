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
import { STUDENT_ROLE, COACH_ROLE } from "../Helpers/constants";
import { useNavigate } from "react-router-dom";
import { User } from "../Types/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import handleErrorMessage from "../Helpers/errorHandler";

type eventHandleChange<T extends HTMLElement> = ChangeEvent<T>;

const Register = () => {
  const navigate = useNavigate();
  const [isCoach, setIsCoach] = useState(false);
  const [formState, setFormState] = useState<User>({
    birthDate: new Date(
      new Date().getFullYear() - 10,
      new Date().getMonth(),
      new Date().getDate()
    ).toString(),
  });
  const [isInitWindow, setIsInitWindow] = useState(true);

  const handleDateChange = (date: Date | null) => {
    setFormState({ ...formState, ["birthDate"]: date?.toString() });
  };

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
    const response = await fetch(
      import.meta.env.VITE_API_URL + "user/register",
      {
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
          birthDate: moment(formState?.birthDate).format("YYYY-MM-DD"),
          password: formState?.password,
          height: formState?.height,
          weight: formState?.weight,
          footSize: formState?.footSize,
          metabolicAge: formState?.metabolicAge,
          education: formState?.education,
          experience: formState?.experience,
          specialization: formState?.specialization,
          description: formState?.description,
          gender: formState?.gender,
          avatar: formState?.avatar,
        }),
      }
    );
    if (response.status === 201) {
      toast.success("Registracija sėkminga!");
      navigate("/login");
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  };

  const onAvatarChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.target.files) {
      const file = e.target.files[0];
      const test = new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          if (event.target) {
            resolve(event.target.result);
          }
        };

        reader.onerror = (err) => {
          reject(err);
        };

        reader.readAsDataURL(file);
      });
      const temp = (await test) as string;
      setFormState({ ...formState, [e.target.name]: temp.split(",")[1] });
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
                    onClick={() => handleStateChange(true)}
                    backgroundColor="#1E99D6"
                    color="white"
                    borderRadius="2xl"
                    textTransform="uppercase"
                  >
                    Treneris
                  </Button>
                  <Button
                    w={150}
                    textTransform="uppercase"
                    onClick={() => handleStateChange(false)}
                    textColor="black"
                    borderRadius="2xl"
                  >
                    Krepšininkas
                  </Button>
                </Flex>
              </>
            ) : (
              <>
                <FormLabel>Vardas</FormLabel>
                <Input
                  border="solid"
                  borderWidth="1px"
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
                  border="solid"
                  borderWidth="1px"
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
                  border="solid"
                  borderWidth="1px"
                  type="email"
                  mb={5}
                  name="email"
                  onChange={(e) => {
                    handleFormInputChange(e, false);
                  }}
                  isRequired
                />
                <FormLabel>Nuotrauka</FormLabel>
                <Box mb={3}>
                  <input
                    onChange={(e) => {
                      onAvatarChange(e);
                    }}
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="avatar"
                  />
                </Box>
                <FormLabel>Lytis</FormLabel>
                <Select
                  border="solid"
                  borderWidth="1px"
                  mb={5}
                  name="gender"
                  onChange={(e) => {
                    handleFormInputChange(e, false);
                  }}
                  isRequired
                  defaultValue=""
                >
                  <option hidden disabled value="">
                    Pasirinkite
                  </option>
                  <option value="Male">Vyras</option>
                  <option value="Female">Moteris</option>
                </Select>
                <FormLabel>Gimimo data</FormLabel>
                <Box mb={5}>
                  <DatePicker
                    wrapperClassName="birthDatePicker"
                    name="birthDate"
                    selected={new Date(formState?.birthDate ?? new Date())}
                    maxDate={
                      new Date(
                        new Date().getFullYear() - 10,
                        new Date().getMonth(),
                        new Date().getDate()
                      )
                    }
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                  />
                </Box>
                <FormLabel>Telefono nr.</FormLabel>
                <Input
                  border="solid"
                  borderWidth="1px"
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
                      border="solid"
                      borderWidth="1px"
                      name="description"
                      onChange={(e) => {
                        handleFormInputChange(e, false);
                      }}
                    ></Textarea>
                    <FormLabel>Išsilavinimas</FormLabel>
                    <Select
                      border="solid"
                      borderWidth="1px"
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
                      border="solid"
                      borderWidth="1px"
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
                      border="solid"
                      borderWidth="1px"
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
                      border="solid"
                      borderWidth="1px"
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
                      textTransform="uppercase"
                      background="#1E99D6"
                      textColor="white"
                      borderRadius="2xl"
                    >
                      Registruotis
                    </Button>
                  </>
                ) : (
                  <>
                    <FormLabel>Ūgis (cm.)</FormLabel>
                    <Input
                      border="solid"
                      borderWidth="1px"
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
                      border="solid"
                      borderWidth="1px"
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
                      border="solid"
                      borderWidth="1px"
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
                      border="solid"
                      borderWidth="1px"
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
                      border="solid"
                      borderWidth="1px"
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
                      textTransform="uppercase"
                      background="#1E99D6"
                      textColor="white"
                      borderRadius="2xl"
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
          <Button
            textTransform="uppercase"
            borderRadius="2xl"
            onClick={() => setIsInitWindow(true)}
          >
            Grįžti
          </Button>
        )}
      </Flex>
    </Container>
  );
};

export default Register;
