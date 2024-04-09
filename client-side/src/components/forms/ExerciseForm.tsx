import {
  Flex,
  FormLabel,
  Heading,
  Input,
  Box,
  Button,
  Textarea,
  Select,
  Center,
  Spinner,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { Exercise } from "../../Types/types";
import { Unauthorized } from "../../Helpers/constants";
import eventBus from "../../Helpers/eventBus";

type eventHandleChange<T extends HTMLElement> = ChangeEvent<T>;

interface Props {
  onClose: () => void;
  exerciseId?: string;
}

const ExerciseForm = ({ onClose, exerciseId }: Props) => {
  const [fileState, setFileState] = useState<File>();
  const token = localStorage.getItem("accessToken");
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    difficulty: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [exercise, setExercise] = useState<Exercise>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileState(event.target.files[0]);
    }
  };

  const onChange = (
    event: eventHandleChange<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    const data = event.target.value;
    setFormState({ ...formState, [name]: data });
  };

  const getExercise = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + `exercise/${exerciseId}`,
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
      const exercise = await response.json();
      setExercise(exercise);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("exerciseVideo", fileState as Blob);
    formData.append("name", formState.name);
    formData.append("description", formState.description);
    formData.append("difficulty", formState.difficulty);

    const url = exerciseId
      ? `${import.meta.env.VITE_API_URL}exercise/${exerciseId}`
      : `${import.meta.env.VITE_API_URL}exercise`;
    const method = exerciseId ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      setIsLoading(false);
      toast.success(
        exerciseId
          ? "Pratimas sėkmingai atnaujintas!"
          : "Pratimas sėkmingai sukurtas!"
      );
      onClose();
    } else {
      toast.error("Klaida");
    }
  };

  useEffect(() => {
    if (exerciseId !== undefined) {
      getExercise();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <form onSubmit={onSubmit}>
          <Flex flexDir="column">
            <Heading size="md">
              {exerciseId ? "Redaguoti pratimą" : "Naujas pratimas"}
            </Heading>
            <FormLabel mt={5}>Pavadinimas</FormLabel>
            <Input
              type="text"
              name="name"
              onChange={onChange}
              value={exercise?.name}
            />
            <FormLabel>Aprašymas</FormLabel>
            <Textarea
              name="description"
              onChange={onChange}
              value={exercise?.description}
            ></Textarea>
            <FormLabel>Sudėtingumas</FormLabel>
            <Select
              mb={5}
              name="difficulty"
              onChange={onChange}
              isRequired
              defaultValue=""
              value={exercise?.difficulty}
            >
              <option hidden disabled value="">
                Pasirinkite
              </option>
              <option value="Professional">Profesionalus</option>
              <option value="Hard">Sunkus</option>
              <option value="Medium">Vidutinis</option>
              <option value="Easy">Lengvas</option>
              <option value="Beginner">Pradedantysis</option>
            </Select>
            <FormLabel>Mokomasis video</FormLabel>
            <Box>
              <input
                onChange={handleFileChange}
                className="form-control"
                type="file"
                id="formFile"
              />
            </Box>
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

export default ExerciseForm;