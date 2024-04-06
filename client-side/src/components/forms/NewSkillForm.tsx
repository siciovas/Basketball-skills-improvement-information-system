import {
  Flex,
  Center,
  Spinner,
  Input,
  FormLabel,
  Heading,
  Textarea,
  Button,
  Box,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { Unauthorized } from "../../Helpers/constants";
import eventBus from "../../Helpers/eventBus";
import { Exercise } from "../../Types/types";
import { useNavigate } from "react-router";

interface Props {
  addNewExercise: () => void;
  onClose: () => void;
}

const NewSkillForm = ({ addNewExercise, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const token = localStorage.getItem("accessToken");
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    exercises: [] as string[],
  });
  const navigate = useNavigate();

  const onExerciseChange = (value: string | string[]) => {
    setFormState({ ...formState, ["exercises"]: value as string[] });
  };

  const onFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({ ...formState, [name]: value });
  };

  const getExercisesList = useCallback(async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + "exercise", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const exercises = await response.json();
      setExercises(exercises);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    const response = await fetch(import.meta.env.VITE_API_URL + `skill`, {
      method: "POST",
      body: JSON.stringify(formState),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      setIsLoading(false);
      onClose();
      navigate("/skills");
      toast.success("Įgūdis sėkmingai sukurtas!");
    } else {
      toast.error("Klaida");
    }
  };

  useEffect(() => {
    eventBus.on("triggerExercisesList", () => {
      getExercisesList();
    });
    getExercisesList();
  }, [getExercisesList]);

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <form onSubmit={handleSubmit}>
          <Flex flexDir="column">
            <Heading size="md">Naujas įgūdis</Heading>
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
            <FormLabel>Įtraukti pratimą</FormLabel>
            <Flex gap={5}>
              <Menu closeOnSelect={false}>
                <MenuButton width="60%" as={Button}>
                  <Box>
                    {formState.exercises
                      .map((exercise) => {
                        return exercises.find(
                          (x) => x.id.toString() === exercise
                        )?.name;
                      })
                      .join(", ")
                      .substring(0, 30)}
                  </Box>
                </MenuButton>
                <MenuList width="60%">
                  <MenuOptionGroup
                    type="checkbox"
                    value={formState.exercises}
                    onChange={onExerciseChange}
                  >
                    {exercises.map((exercise) => {
                      return (
                        <MenuItemOption value={exercise.id.toString()}>
                          {exercise.name}
                        </MenuItemOption>
                      );
                    })}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
              <Flex
                onClick={addNewExercise}
                cursor="pointer"
                width="40%"
                alignItems="center"
                gap={2}
              >
                <Box className="fa-solid fa-plus fa-2x" />
                <Box>Pridėti pratimą</Box>
              </Flex>
            </Flex>
            <Heading size="sm" mb={5} mt={5}>
              Pridėti pratimai:
            </Heading>
            {formState.exercises.map((exercise) => {
              return (
                <Box>
                  {exercises.find((x) => x.id.toString() === exercise)?.name}
                </Box>
              );
            })}
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

export default NewSkillForm;
