import {
  Center,
  Spinner,
  Flex,
  Heading,
  FormLabel,
  Input,
  Textarea,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Box,
  Switch,
  Checkbox,
  Image,
  FormControl,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
  DragEvent,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Unauthorized } from "../../Helpers/constants";
import eventBus from "../../Helpers/eventBus";
import { GenericSkillInfo } from "../../Types/types";

interface Props {
  onClose: () => void;
  trainingPlanId?: string;
}

const TrainingPlanForm = ({ onClose, trainingPlanId }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState({
    avatar: "",
    title: "",
    description: "",
    shortDescription: "",
    expirationDate: 0,
    price: 0,
    isActive: false,
    skills: [] as string[],
    isPersonal: false,
  });
  const [isNewVersion, setIsNewVersion] = useState(false);
  const [skills, setSkills] = useState<GenericSkillInfo[]>([]);
  const token = localStorage.getItem("accessToken");
  const [draggingItem, setDraggingItem] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleDragStart = (e: DragEvent<HTMLDivElement>, item: string) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetItem: string) => {
    if (!draggingItem) return;

    const currentIndex = formState.skills.indexOf(draggingItem);
    const targetIndex = formState.skills.indexOf(targetItem);
    if (currentIndex !== -1 && targetIndex !== -1) {
      const copyFormState = { ...formState };
      copyFormState.skills.splice(currentIndex, 1);
      copyFormState.skills.splice(targetIndex, 0, draggingItem);
      setFormState({ ...formState, skills: copyFormState.skills });
    }
  };

  const onSkillChange = (value: string | string[]) => {
    setFormState({ ...formState, ["skills"]: value as string[] });
  };

  const onFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({ ...formState, [name]: value });
  };

  const handlePlanTypeSwitch = () => {
    setFormState({ ...formState, isPersonal: !formState.isPersonal });
  };

  const handleSwitchChange = () => {
    setFormState({ ...formState, isActive: !formState.isActive });
  };

  const getSkillsList = useCallback(async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + "skill", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const skills = await response.json();
      setSkills(skills);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  const getTrainingPlan = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `trainingPlan/${trainingPlanId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const trainingPlan = await response.json();
      setFormState({
        avatar: trainingPlan.avatar,
        title: trainingPlan.title,
        description: trainingPlan.description,
        shortDescription: trainingPlan.shortDescription,
        expirationDate: trainingPlan.expirationDate,
        price: trainingPlan.price,
        isActive: trainingPlan.isActive,
        skills: trainingPlan.skills.map((skill: GenericSkillInfo) => {
          return skill.id;
        }),
        isPersonal: trainingPlan.isPersonal,
      });
      await getSkillsList();
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.skills.length < 1) {
      toast.error("Nepridėtas nei vienas įgūdis!");
      return;
    }

    setIsLoading(true);

    const url = trainingPlanId
      ? `${import.meta.env.VITE_API_URL}trainingPlan/${trainingPlanId}`
      : `${import.meta.env.VITE_API_URL}trainingPlan`;
    const method = trainingPlanId ? "PUT" : "POST";

    const requestBody = trainingPlanId
      ? { ...formState, isNewVersion }
      : formState;

    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201 || response.status === 200) {
      setIsLoading(false);
      onClose();
      navigate("/trainingPlans");
      toast.success(
        trainingPlanId
          ? "Treniruočių planas sėkmingai atnaujintas!"
          : "Treniruočių planas sėkmingai sukurtas!"
      );
      eventBus.dispatch("triggerTrainingPlanCreated", null);
    } else {
      toast.error("Klaida");
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
    if (trainingPlanId !== undefined) {
      getTrainingPlan();
    } else {
      getSkillsList();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <form onSubmit={handleSubmit}>
          <Flex flexDir="column">
            <Heading size="md">
              {trainingPlanId
                ? "Treniruočių plano redagavimas"
                : "Naujas treniruočių planas"}
            </Heading>
            <FormControl isRequired>
              <FormLabel mt={5}>Nuotrauka</FormLabel>
              {formState.avatar && (
                <Box h={40} w={60}>
                  <Image
                    w="100%"
                    h="100%"
                    src={"data:image/jpeg;base64," + formState?.avatar}
                  />
                </Box>
              )}
              <Flex>
                <input
                  onChange={(e) => {
                    onAvatarChange(e);
                  }}
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="avatar"
                  required
                />
              </Flex>
              <FormLabel mt={5}>Pavadinimas</FormLabel>
              <Input
                type="text"
                name="title"
                onChange={onFormChange}
                value={formState.title}
                isRequired
              />
              <FormLabel mt={5}>Aprašymas</FormLabel>
              <Textarea
                name="description"
                onChange={onFormChange}
                value={formState.description}
                isRequired
              ></Textarea>
              <FormLabel mt={5}>Trumpasis aprašymas</FormLabel>
              <Textarea
                name="shortDescription"
                onChange={onFormChange}
                value={formState.shortDescription}
                isRequired
              ></Textarea>
              <FormLabel mt={5}>Plano įvykdymo terminas (dienomis)</FormLabel>
              <Flex flexDir="column" w="53%">
                <Input
                  type="number"
                  name="expirationDate"
                  onChange={onFormChange}
                  value={formState.expirationDate}
                  isRequired
                ></Input>
              </Flex>
            </FormControl>
            <Flex justifyContent="space-between" alignItems="center" mt={2}>
              <Box>
                <FormControl isRequired>
                  <FormLabel mt={5}>Kaina</FormLabel>
                  <Input
                    type="number"
                    name="price"
                    onChange={onFormChange}
                    value={formState.price}
                    isRequired
                  ></Input>
                </FormControl>
              </Box>
              <Box>
                <FormLabel mt={5}>Aktyvus</FormLabel>
                <Switch
                  size="lg"
                  colorScheme="blue"
                  onChange={handleSwitchChange}
                  isChecked={formState.isActive}
                />
              </Box>
            </Flex>
            {trainingPlanId === undefined && (
              <Box>
                <FormLabel mt={5}>Ar planas individualus?</FormLabel>
                <Switch
                  size="lg"
                  colorScheme="blue"
                  onChange={handlePlanTypeSwitch}
                  isChecked={formState.isPersonal}
                />
              </Box>
            )}
            {(!formState.isPersonal || trainingPlanId !== undefined) && (
              <>
                <FormControl isRequired>
                  <FormLabel mt={5}>Įtraukti įgūdį</FormLabel>
                  <Flex gap={5}>
                    <Menu closeOnSelect={false}>
                      <MenuButton width="60%" as={Button}>
                        <Box>
                          {formState.skills
                            .map((skill) => {
                              return skills.find((x) => x.id === skill)?.name;
                            })
                            .join(", ")
                            .substring(0, 30)}
                        </Box>
                      </MenuButton>
                      <MenuList width="60%">
                        <MenuOptionGroup
                          type="checkbox"
                          value={formState.skills}
                          onChange={onSkillChange}
                        >
                          {skills.map((skill) => {
                            return (
                              <MenuItemOption value={skill.id}>
                                {skill.name}
                              </MenuItemOption>
                            );
                          })}
                        </MenuOptionGroup>
                      </MenuList>
                    </Menu>
                  </Flex>
                </FormControl>
                <Heading size="sm" mb={5} mt={5}>
                  Pridėti įgūdžiai:
                </Heading>
                <Box>Keiskite įgūdžių eiliškumą, keičiant jų padėtį.</Box>
                {formState.skills.map((skill) => {
                  return (
                    <Box
                      borderWidth="thick"
                      px={2}
                      mt={2}
                      border="solid"
                      cursor="pointer"
                      draggable
                      onDragStart={(e) => handleDragStart(e, skill)}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(skill)}
                    >
                      {skills.find((x) => x.id === skill)?.name}
                    </Box>
                  );
                })}
              </>
            )}

            {trainingPlanId && (
              <Checkbox
                mt={5}
                isChecked={isNewVersion}
                onChange={() => setIsNewVersion(!isNewVersion)}
              >
                Ar tai nauja versija?
              </Checkbox>
            )}

            <Button
              backgroundColor="#1E99D6"
              color="white"
              mt={10}
              w={52}
              alignSelf="end"
              type="submit"
            >
              Išsaugoti
            </Button>
          </Flex>
        </form>
      )}
    </>
  );
};

export default TrainingPlanForm;
