import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import ExerciseForm from "../forms/ExerciseForm";
import SkillForm from "../forms/SkillForm";
import { useCallback, useEffect, useState } from "react";
import eventBus from "../../Helpers/eventBus";
import { useNavigate } from "react-router";
import { CoachHomePageDto } from "../../Types/types";
import toast from "react-hot-toast";
import { Unauthorized } from "../../Helpers/constants";
import TrainingPlanForm from "../forms/TrainingPlanForm";

const CoachHomePage = () => {
  const exerciseModal = useDisclosure();
  const skillModal = useDisclosure();
  const trainingPlanModal = useDisclosure();
  const [isExerciseFromSkill, setIsExerciseFromSkill] = useState(false);
  const [homePageData, setHomePageData] = useState<CoachHomePageDto>();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const getHomePageData = useCallback(async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + `user/home`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const homePageData = await response.json();
      setHomePageData(homePageData);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    getHomePageData();
  }, [getHomePageData]);

  const addNewExercise = () => {
    setIsExerciseFromSkill(true);
    exerciseModal.onOpen();
  };

  const onExerciseClose = () => {
    if (isExerciseFromSkill) {
      eventBus.dispatch("triggerExercisesList", null);
    }
    exerciseModal.onClose();
  };

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <>
          <Flex mt={5} mb={5} justify="center">
            <Heading>
              Generuokite daugiau pajamų, efektyviai valdydami savo treniruočių
              planus
            </Heading>
          </Flex>
          <SimpleGrid columns={3} m={10} gap={5}>
            <Flex
              boxShadow="dark-lg"
              borderRadius="xl"
              border="solid"
              borderColor="#9e9d9d"
              flexDirection="column"
              position="relative"
              justifyContent="center"
              alignItems="center"
              py={5}
            >
              <Heading size="lg" position="relative">
                Treniruočių planai
              </Heading>
              <Box className="fa-solid fa-list-check fa-8x" my={2} />
              <Flex flexDirection="column" gap={5} w="70%">
                <Button
                  backgroundColor="#1E99D6"
                  color="white"
                  onClick={trainingPlanModal.onOpen}
                >
                  Naujas planas
                </Button>
                {homePageData?.trainingPlans.map((plan) => {
                  return (
                    <Button
                      cursor="default"
                      _hover={{
                        backgroundColor: "#EDF2F7",
                      }}
                    >
                      {plan.name}
                    </Button>
                  );
                })}
                <Button
                  backgroundColor="#1E99D6"
                  color="white"
                  onClick={() => navigate("/trainingPlans")}
                >
                  Visi planai
                </Button>
              </Flex>
            </Flex>
            <Flex
              boxShadow="dark-lg"
              borderRadius="xl"
              border="solid"
              borderColor="#9e9d9d"
              flexDirection="column"
              position="relative"
              justifyContent="center"
              alignItems="center"
              py={5}
            >
              <Heading size="lg" position="relative">
                Įgūdžiai
              </Heading>
              <Box className="fa-solid fa-basketball fa-8x" my={2} />
              <Flex flexDirection="column" gap={5} w="70%">
                <Button
                  backgroundColor="#1E99D6"
                  color="white"
                  onClick={skillModal.onOpen}
                >
                  Naujas įgūdis
                </Button>
                {homePageData?.skills.map((skill) => {
                  return (
                    <Button
                      cursor="default"
                      _hover={{
                        backgroundColor: "#EDF2F7",
                      }}
                    >
                      {skill.name}
                    </Button>
                  );
                })}
                <Button
                  backgroundColor="#1E99D6"
                  color="white"
                  onClick={() => navigate("/skills")}
                >
                  Visi įgūdžiai
                </Button>
              </Flex>
            </Flex>
            <Flex
              boxShadow="dark-lg"
              borderRadius="xl"
              border="solid"
              borderColor="#9e9d9d"
              flexDirection="column"
              position="relative"
              justifyContent="center"
              alignItems="center"
              py={5}
            >
              <Heading size="lg" position="relative">
                Pratimai
              </Heading>
              <Box className="fa-solid fa-person-running fa-8x" my={2} />
              <Flex flexDirection="column" gap={5} w="70%">
                <Button
                  backgroundColor="#1E99D6"
                  color="white"
                  onClick={exerciseModal.onOpen}
                >
                  Naujas pratimas
                </Button>
                {homePageData?.exercises.map((exercise) => {
                  return (
                    <Button
                      cursor="default"
                      _hover={{
                        backgroundColor: "#EDF2F7",
                      }}
                    >
                      {exercise.name}
                    </Button>
                  );
                })}
                <Button
                  backgroundColor="#1E99D6"
                  color="white"
                  onClick={() => navigate("/exercises")}
                >
                  Visi pratimai
                </Button>
              </Flex>
            </Flex>
          </SimpleGrid>
        </>
      )}
      <Modal isOpen={exerciseModal.isOpen} onClose={exerciseModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ExerciseForm onClose={onExerciseClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={skillModal.isOpen} onClose={skillModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <SkillForm
              onClose={skillModal.onClose}
              addNewExercise={addNewExercise}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={trainingPlanModal.isOpen}
        onClose={trainingPlanModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <TrainingPlanForm onClose={trainingPlanModal.onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CoachHomePage;
