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
import { Unauthorized } from "../../Helpers/constants";
import eventBus from "../../Helpers/eventBus";
import { useNavigate } from "react-router-dom";

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
    exerciseVideoName: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleChangeVideo = () => {
    setFormState({ ...formState, exerciseVideoName: undefined });
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
      setFormState({
        name: exercise.name,
        description: exercise.description,
        difficulty: exercise.difficulty,
        exerciseVideoName: exercise.exerciseVideoName,
      });
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

    if (response.status === 201 || response.status === 200) {
      setIsLoading(false);
      onClose();
      navigate("/exercises");
      toast.success(
        exerciseId
          ? "Pratimas sėkmingai atnaujintas!"
          : "Pratimas sėkmingai sukurtas!"
      );
      eventBus.dispatch("triggerExerciseCreated", null);
    } else {
      toast.error("Klaida");
    }
  };

  useEffect(() => {
    if (exerciseId !== undefined) {
      getExercise();
    } else {
      setIsLoading(false);
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
              {exerciseId ? "Pratimo redagavimas" : "Naujas pratimas"}
            </Heading>
            <FormLabel mt={5}>Pavadinimas</FormLabel>
            <Input
              type="text"
              name="name"
              onChange={onChange}
              value={formState.name}
            />
            <FormLabel mt={5}>Aprašymas</FormLabel>
            <Textarea
              name="description"
              onChange={onChange}
              value={formState.description}
            ></Textarea>
            <FormLabel mt={5}>Sudėtingumas</FormLabel>
            <Select
              mb={5}
              name="difficulty"
              onChange={onChange}
              isRequired
              defaultValue=""
              value={formState.difficulty}
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
            {formState.exerciseVideoName ? (
              <Flex gap={1} alignItems="center">
                <Box>{formState.exerciseVideoName}</Box>
                <Button onClick={handleChangeVideo}>Keisti</Button>
              </Flex>
            ) : (
              <Box>
                <input
                  onChange={handleFileChange}
                  className="form-control"
                  type="file"
                  id="formFile"
                />
              </Box>
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

export default ExerciseForm;
