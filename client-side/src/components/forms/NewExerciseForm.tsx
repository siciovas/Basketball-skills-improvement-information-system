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
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

type eventHandleChange<T extends HTMLElement> = ChangeEvent<T>;

interface Props {
  onClose: () => void;
}

const NewExerciseForm = ({ onClose }: Props) => {
  const [fileState, setFileState] = useState<File>();
  const token = localStorage.getItem("accessToken");
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    difficulty: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("exerciseVideo", fileState as Blob);
    formData.append("name", formState.name);
    formData.append("description", formState.description);
    formData.append("difficulty", formState.difficulty);

    const response = await fetch(import.meta.env.VITE_API_URL + `exercise`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      setIsLoading(false);
      toast.success("Pratimas sėkmingai sukurtas!");
      onClose();
    } else {
      toast.error("Klaida");
    }
  };

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <form onSubmit={onSubmit}>
          <Flex flexDir="column">
            <Heading size="md">Naujas pratimas</Heading>
            <FormLabel mt={5}>Pavadinimas</FormLabel>
            <Input type="text" name="name" onChange={onChange} />
            <FormLabel>Aprašymas</FormLabel>
            <Textarea name="description" onChange={onChange}></Textarea>
            <FormLabel>Sudėtingumas</FormLabel>
            <Select
              mb={5}
              name="difficulty"
              onChange={onChange}
              isRequired
              defaultValue=""
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

export default NewExerciseForm;
