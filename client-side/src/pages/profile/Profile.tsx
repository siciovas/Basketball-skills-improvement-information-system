import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Image,
  Button,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  SimpleGrid,
  Center,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import Container from "../../components/Container";
import {
  useState,
  useCallback,
  useEffect,
  FormEvent,
  ChangeEvent,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Unauthorized } from "../../Helpers/constants";
import eventBus from "../../Helpers/eventBus";
import { AdditionalInfo, MeDto } from "../../Types/types";
import translations from "../../Helpers/translations.json";
import ModalWindow from "../../components/ModalWindow";

const Profile = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, setUser] = useState<MeDto>();
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();

  const onOldPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setOldPassword(e.target.value as string);
  };
  const onNewPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(e.target.value as string);
  };
  const onRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRepeatPassword(e.target.value as string);
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
      setUser(userResponse);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  const updatePassword = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(
      import.meta.env.VITE_API_URL + `user/updatePassword`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify({
          oldPassword,
          newPassword,
          repeatPassword,
        }),
      }
    );
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    }
    if (response.status === 200) {
      toast.success("Slaptažodis pakeistas!");
      getUserDetails();
    } else {
      toast.error("Atnaujinti nepavyko!");
    }
  };

  const deleteProfile = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();
    const response = await fetch(
      import.meta.env.VITE_API_URL + `user/deleteProfile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }
    );

    if (response.status === 204) {
      setIsLoading(true);
      toast.success("Paskyra ištrinta!");
      onClose();
      localStorage.removeItem("accessToken");
      navigate("/");
    } else {
      toast.error("Nepavyko ištrinti!");
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
          <Container minW={1000}>
            <Box m="auto" mt={5}>
              <Box
                boxShadow="dark-lg"
                w={600}
                m="auto"
                borderRadius="xl"
                border="solid"
                borderColor="#9e9d9d"
              >
                <Flex gap={5} mt={5} mb={5}>
                  <Box alignSelf="center" h={60} w={60} ml={5}>
                    <Image
                      w="100%"
                      h="100%"
                      src={"data:image/jpeg;base64," + user?.avatar}
                    ></Image>
                  </Box>
                  <Flex flexDir="column" gap={5}>
                    <Flex>
                      <Text fontWeight="bold">Vardas:&nbsp;</Text>
                      <Text>{user?.name}</Text>
                    </Flex>
                    <Flex>
                      <Text fontWeight="bold">Pavardė:&nbsp;</Text>
                      <Text>{user?.surname}</Text>
                    </Flex>
                    <Flex>
                      <Text fontWeight="bold">El. Paštas:&nbsp;</Text>
                      <Text>{user?.email}</Text>
                    </Flex>
                    <Flex>
                      <Text fontWeight="bold">Gimimo data:&nbsp;</Text>
                      <Text>{user?.birthDate}</Text>
                    </Flex>
                    <Flex>
                      <Text fontWeight="bold">Tel. numeris:&nbsp;</Text>
                      <Text>{user?.phoneNumber}</Text>
                    </Flex>
                    <Flex>
                      <Text fontWeight="bold">Registracijos data:&nbsp;</Text>
                      <Text>{user?.registerDate}</Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex mx={5} mb={5} justifyContent="end">
                  <Button
                    backgroundColor="#1E99D6"
                    color="white"
                    borderRadius="2xl"
                    textTransform="uppercase"
                    onClick={() => navigate("/editProfile")}
                  >
                    Redaguoti
                  </Button>
                </Flex>
              </Box>
            </Box>
            {user!.additionalInfo && (
              <Accordion
                allowToggle
                mx="auto"
                mt={10}
                boxShadow="dark-lg"
                w={600}
                borderRadius="xl"
                border="solid"
                borderColor="#9e9d9d"
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Papildoma informacija
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <SimpleGrid columns={3} spacing={10}>
                      {Object.keys(user!.additionalInfo).map((key) => {
                        return (
                          user!.additionalInfo[key as keyof AdditionalInfo] && (
                            <Flex
                              fontWeight="bold"
                              flexDirection="column"
                              alignContent="center"
                            >
                              <Box alignSelf="center">
                                {`${
                                  translations[key as keyof typeof translations]
                                }:`}
                              </Box>

                              <Box fontWeight="normal" alignSelf="center">{`${
                                translations[
                                  user!.additionalInfo[
                                    key as keyof AdditionalInfo
                                  ]
                                    ?.toString()
                                    .toLowerCase() as keyof typeof translations
                                ] ??
                                user!.additionalInfo[
                                  key as keyof AdditionalInfo
                                ]
                              }`}</Box>
                            </Flex>
                          )
                        );
                      })}
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            )}
            <Flex justify="center" mt={10}>
              <Heading size="md">Slaptažodžio keitimas</Heading>
            </Flex>
            <Box m="auto" mt={5}>
              <Box
                boxShadow="dark-lg"
                w={600}
                m="auto"
                borderRadius="xl"
                border="solid"
                borderColor="#9e9d9d"
              >
                <form onSubmit={(e) => updatePassword(e)}>
                  <FormControl>
                    <Flex align="center" flexDir="column" mt={5}>
                      <FormLabel>Dabartinis slaptažodis</FormLabel>
                      <Input
                        w="50%"
                        type="password"
                        mb={5}
                        isRequired
                        onChange={(e) => {
                          onOldPasswordChange(e);
                        }}
                      />
                    </Flex>
                    <Flex align="center" flexDir="column">
                      <FormLabel>Naujas slaptažodis</FormLabel>
                      <Input
                        w="50%"
                        type="password"
                        mb={5}
                        isRequired
                        onChange={(e) => {
                          onNewPasswordChange(e);
                        }}
                      />
                    </Flex>
                    <Flex align="center" flexDir="column">
                      <FormLabel>Pakartoti naują slaptažodį</FormLabel>
                      <Input
                        w="50%"
                        type="password"
                        mb={5}
                        isRequired
                        onChange={(e) => {
                          onRepeatPasswordChange(e);
                        }}
                      />
                    </Flex>
                    <Flex justify="center">
                      <Button
                        type="submit"
                        w="50%"
                        backgroundColor="#1E99D6"
                        color="white"
                        borderRadius="2xl"
                        mt={5}
                        textTransform="uppercase"
                        mb={5}
                      >
                        Atnaujinti slaptažodį
                      </Button>
                    </Flex>
                  </FormControl>
                </form>
              </Box>
              <Flex w={600} justify="center" mx="auto">
                <Button
                  w="50%"
                  backgroundColor="red"
                  color="white"
                  borderRadius="2xl"
                  mt={20}
                  textTransform="uppercase"
                  onClick={onOpen}
                >
                  Ištrinti paskyrą
                </Button>
              </Flex>
            </Box>
          </Container>
          <ModalWindow
            title="Paskyros ištrynimas"
            text="Ar tikrai norite ištrinti paskyrą?"
            isOpen={isOpen}
            onClose={onClose}
            onClick={deleteProfile}
          />
        </>
      )}
    </>
  );
};

export default Profile;
