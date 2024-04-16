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
} from "@chakra-ui/react";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
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
    title: "",
    description: "",
    shortDescription: "",
    price: 0,
    isActive: false,
    skills: [] as string[],
  });
  const [isNewVersion, setIsNewVersion] = useState(false);
  const [skills, setSkills] = useState<GenericSkillInfo[]>([]);
  const token = localStorage.getItem("accessToken");

  const navigate = useNavigate();

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
        title: trainingPlan.title,
        description: trainingPlan.description,
        shortDescription: trainingPlan.shortDescription,
        price: trainingPlan.price,
        isActive: trainingPlan.isActive,
        skills: trainingPlan.skills.map((skill: GenericSkillInfo) => {
          return skill.id;
        }),
      });
      await getSkillsList();
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

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
    }
  };

  useEffect(() => {
    if (trainingPlanId !== undefined) {
      getTrainingPlan();
    } else {
      getSkillsList();
    }
  }, [getSkillsList]);

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
            <FormLabel mt={5}>Pavadinimas</FormLabel>
            <Input
              type="text"
              name="title"
              onChange={onFormChange}
              value={formState.title}
            />
            <FormLabel>Aprašymas</FormLabel>
            <Textarea
              name="description"
              onChange={onFormChange}
              value={formState.description}
            ></Textarea>
            <FormLabel>Trumpasis aprašymas</FormLabel>
            <Textarea
              name="shortDescription"
              onChange={onFormChange}
              value={formState.shortDescription}
            ></Textarea>
            <Flex justifyContent="space-between" alignItems="center" mt={2}>
              <Box>
                <FormLabel m={0}>Kaina</FormLabel>
                <Input
                  type="number"
                  name="price"
                  onChange={onFormChange}
                  value={formState.price}
                ></Input>
              </Box>
              <Box>
                <FormLabel m={0}>Aktyvus</FormLabel>
                <Switch
                  size="lg"
                  colorScheme="blue"
                  onChange={handleSwitchChange}
                  isChecked={formState.isActive}
                />
              </Box>
            </Flex>
            <FormLabel>Įtraukti įgūdį</FormLabel>
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
            <Heading size="sm" mb={5} mt={5}>
              Pridėti įgūdžiai:
            </Heading>
            {formState.skills.map((skill) => {
              return <Box>{skills.find((x) => x.id === skill)?.name}</Box>;
            })}
            <Checkbox
              mt={5}
              isChecked={isNewVersion}
              onChange={() => setIsNewVersion(!isNewVersion)}
            >
              Ar tai nauja versija?
            </Checkbox>
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
