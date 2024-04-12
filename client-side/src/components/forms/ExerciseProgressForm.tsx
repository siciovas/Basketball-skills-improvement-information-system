import {
  FormLabel,
  Box,
  Flex,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  trainingPlanId: string;
  exerciseId: string;
  onClose: () => void;
}

const ExerciseProgressForm = ({
  trainingPlanId,
  exerciseId,
  onClose,
}: Props) => {
  const [fileState, setFileState] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileState(event.target.files[0]);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("exerciseProgressVideo", fileState as Blob);
    formData.append("trainingPlanId", trainingPlanId);
    formData.append("exerciseId", exerciseId);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}exerciseFlow/uploadExerciseProgress`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      setIsLoading(false);
      onClose();
      navigate("/exerciseFlow");
      toast.success("Pratimo progresas sėkmingai įkeltas");
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
              Įkelti progresą
            </Button>
          </Flex>
        </form>
      )}
    </>
  );
};

export default ExerciseProgressForm;
