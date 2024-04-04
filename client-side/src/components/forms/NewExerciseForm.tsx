import {
  Flex,
  FormLabel,
  Heading,
  Input,
  Box,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";

const NewExerciseForm = () => {
  const [formState, setFormState] = useState<File>();
  const token = localStorage.getItem("accessToken");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormState(event.target.files[0]);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("exerciseVideo", formState as Blob);
    formData.append("name", "Test");
    formData.append("description", "test");

    await fetch(import.meta.env.VITE_API_URL + `exercise`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Flex flexDir="column">
        <Heading size="md">Naujas pratimas</Heading>
        <FormLabel mt={5}>Pavadinimas</FormLabel>
        <Input type="text" onChange={() => {}} />
        <FormLabel>Aprašymas</FormLabel>
        <Textarea onChange={() => {}}></Textarea>
        <FormLabel>Sudėtingumas</FormLabel>
        <Input type="text" onChange={() => {}} />
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
  );
};

export default NewExerciseForm;
