import { Box, Button } from "@chakra-ui/react";
import { MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TrainingPlan = () => {
  const token = localStorage.getItem("accessToken");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(import.meta.env.VITE_API_URL + "order", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        trainingPlanId: id,
      }),
    });

    if (response.status === 201) {
      const id = await response.json();
      navigate(`/checkout/${id}`);
    }
  };

  return (
    <>
      <Box>Užsakyti planą</Box>
      <Button onClick={handleSubmit}>Užsakyti</Button>
    </>
  );
};

export default TrainingPlan;
