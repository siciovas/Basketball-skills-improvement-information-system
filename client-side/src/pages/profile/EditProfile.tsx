import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Image,
  Button,
  Textarea,
  Center,
  Spinner,
} from "@chakra-ui/react";
import Container from "../../components/Container";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { User } from "../../Types/types";
import eventBus from "../../Helpers/eventBus";
import {
  COACH_ROLE,
  STUDENT_ROLE,
  Unauthorized,
} from "../../Helpers/constants";
import toast from "react-hot-toast";
import handleErrorMessage from "../../Helpers/errorHandler";

type eventHandleChange<T extends HTMLElement> = ChangeEvent<T>;

const EditProfile = () => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  const [formState, setFormState] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

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

  const getUserDetails = useCallback(async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + `user/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const userResponse = await response.json();
      const userObj: User = {
        ...userResponse,
        height: userResponse.additionalInfo?.height,
        weight: userResponse.additionalInfo?.weight,
        footSize: userResponse.additionalInfo?.footSize,
        metabolicAge: userResponse.additionalInfo?.metabolicAge,
        education: userResponse.additionalInfo?.education,
        experience: userResponse.additionalInfo?.experience,
        specialization: userResponse.additionalInfo?.specialization,
        description: userResponse.additionalInfo?.description,
      };
      setFormState(userObj);
      setIsLoading(false);
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  }, []);

  const updateUser = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(import.meta.env.VITE_API_URL + `user/update`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify({
        email: formState?.email,
        phoneNumber: formState?.phoneNumber,
        height: formState?.height,
        weight: formState?.weight,
        footSize: formState?.footSize,
        metabolicAge: formState?.metabolicAge,
        education: formState?.education,
        experience: formState?.experience,
        specialization: formState?.specialization,
        description: formState?.description,
        avatar: formState?.avatar,
      }),
    });
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    }
    if (response.status === 200) {
      toast.success("Paskyros informacija atnaujinta!");
      getUserDetails();
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
      setIsLoading(false);
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

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <>
          <Container>
            <form onSubmit={(e) => updateUser(e)}>
              <Flex
                p={5}
                gap={5}
                borderRadius="xl"
                border="solid"
                borderColor="#9e9d9d"
                borderWidth="2px"
              >
                <Flex flexDir="column" align="center" mx="auto">
                  <FormControl>
                    <Box mb={3}>
                      <FormLabel>Nuotrauka</FormLabel>
                      <Box h={60} w={80}>
                        <Image
                          w="100%"
                          h="100%"
                          borderRadius="xl"
                          src={"data:image/jpeg;base64," + formState?.avatar}
                        />
                      </Box>
                      <Flex justify="center">
                        <input
                          onChange={(e) => {
                            onAvatarChange(e);
                          }}
                          className="form-control"
                          type="file"
                          id="formFile"
                          name="avatar"
                        />
                      </Flex>
                    </Box>
                    <FormLabel>Vardas</FormLabel>
                    <Input
                      type="text"
                      mb={5}
                      name="name"
                      disabled
                      value={formState?.name}
                      border="solid"
                      borderWidth="1px"
                    />
                    <FormLabel>Pavardė</FormLabel>
                    <Input
                      type="text"
                      mb={5}
                      name="surname"
                      disabled
                      placeholder={formState?.surname}
                      border="solid"
                      borderWidth="1px"
                    />
                    <FormLabel>Lytis</FormLabel>
                    <Select
                      mb={5}
                      name="gender"
                      disabled
                      value={formState?.gender}
                      border="solid"
                      borderWidth="1px"
                    >
                      <option hidden disabled value="">
                        Pasirinkite
                      </option>
                      <option value="Male">Vyras</option>
                      <option value="Female">Moteris</option>
                    </Select>
                    <FormLabel>Gimimo data</FormLabel>
                    <Input
                      type="text"
                      mb={5}
                      name="birthDate"
                      disabled
                      placeholder={formState?.birthDate}
                      border="solid"
                      borderWidth="1px"
                    />
                    <FormLabel>El. Paštas</FormLabel>
                    <Input
                      value={formState?.email}
                      type="email"
                      mb={5}
                      name="email"
                      onChange={(e) => {
                        handleFormInputChange(e, false);
                      }}
                      isRequired
                      border="solid"
                      borderWidth="1px"
                    />
                    <FormLabel>Telefono nr.</FormLabel>
                    <Input
                      type="text"
                      mb={5}
                      name="phoneNumber"
                      onChange={(e) => {
                        handleFormInputChange(e, false);
                      }}
                      value={formState?.phoneNumber}
                      isRequired
                      border="solid"
                      borderWidth="1px"
                    />
                  </FormControl>
                  {(role === STUDENT_ROLE && (
                    <>
                      <FormControl>
                        <FormLabel>Ūgis (cm.)</FormLabel>
                        <Input
                          type="number"
                          mb={5}
                          name="height"
                          onChange={(e) => {
                            handleFormInputChange(e, true);
                          }}
                          value={formState?.height as number}
                          isRequired
                          border="solid"
                          borderWidth="1px"
                        />
                        <FormLabel>Svoris (kg.)</FormLabel>
                        <Input
                          type="number"
                          mb={5}
                          name="weight"
                          onChange={(e) => {
                            handleFormInputChange(e, true);
                          }}
                          value={formState?.weight as number}
                          isRequired
                          border="solid"
                          borderWidth="1px"
                        />
                        <FormLabel>Pėdos dydis (EU)</FormLabel>
                        <Input
                          type="number"
                          mb={5}
                          name="footSize"
                          onChange={(e) => {
                            handleFormInputChange(e, true);
                          }}
                          value={formState?.footSize as number}
                          isRequired
                          border="solid"
                          borderWidth="1px"
                        />
                      </FormControl>
                      <FormLabel>Metabolinis amžius</FormLabel>
                      <Input
                        type="text"
                        mb={5}
                        name="metabolicAge"
                        onChange={(e) => {
                          handleFormInputChange(e, true);
                        }}
                        value={formState?.metabolicAge as number}
                        border="solid"
                        borderWidth="1px"
                      />
                    </>
                  )) ||
                    (role === COACH_ROLE && (
                      <>
                        <FormControl>
                          <FormLabel>Aprašymas</FormLabel>
                          <Textarea
                            name="description"
                            value={formState?.description as string}
                            onChange={(e) => {
                              handleFormInputChange(e, false);
                            }}
                            border="solid"
                            borderWidth="1px"
                          ></Textarea>
                          <FormLabel>Išsilavinimas</FormLabel>
                          <Select
                            mb={5}
                            name="education"
                            onChange={(e) => {
                              handleFormInputChange(e, false);
                            }}
                            value={formState?.education as string}
                            border="solid"
                            borderWidth="1px"
                          >
                            <option hidden disabled value="">
                              Pasirinkite
                            </option>
                            <option value="Higher">
                              Aukštasis išsilavinimas
                            </option>
                            <option value="HigherUniversity">
                              Aukštasis universitetinis išsilavinimas
                            </option>
                            <option value="HigherCollege">
                              Aukštasis koleginis išsilavinimas
                            </option>
                            <option value="Secondary">
                              Vidurinis išsilavinimas
                            </option>
                          </Select>
                          <FormLabel>Patirtis metais</FormLabel>
                          <Input
                            type="number"
                            mb={5}
                            name="experience"
                            onChange={(e) => {
                              handleFormInputChange(e, true);
                            }}
                            value={formState?.experience as number}
                            border="solid"
                            borderWidth="1px"
                          />
                          <FormLabel>Specializacija</FormLabel>
                          <Input
                            type="text"
                            mb={5}
                            name="specialization"
                            onChange={(e) => {
                              handleFormInputChange(e, false);
                            }}
                            value={formState?.specialization as string}
                            border="solid"
                            borderWidth="1px"
                          />
                        </FormControl>
                      </>
                    ))}
                  <Button
                    type="submit"
                    w="100%"
                    textTransform="uppercase"
                    background="#1E99D6"
                    textColor="white"
                    borderRadius="2xl"
                    mt={5}
                  >
                    Atnaujinti
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Container>
        </>
      )}
    </>
  );
};

export default EditProfile;
