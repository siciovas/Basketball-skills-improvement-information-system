import {
  Box,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  Progress,
  Image,
  Button,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { MyPlansDto } from "../Types/types";
import { Unauthorized } from "../Helpers/constants";
import eventBus from "../Helpers/eventBus";
import toast from "react-hot-toast";
import moment from "moment";

const MyPlans = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState<MyPlansDto[]>([]);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const getMyPlans = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "trainingPlan/myPlans",
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
      const plans = await response.json();
      setPlans(plans);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    getMyPlans();
  }, []);

  return (
    <>
      <Container minW={1400}>
        {isLoading ? (
          <Center>
            <Spinner size="xl" textAlign="center" />
          </Center>
        ) : (
          <>
            <SimpleGrid mt={5} columns={3} spacing={10}>
              {plans.map((plan) => (
                <Box border="solid" borderColor="#9e9d9d" p={5}>
                  <Flex flexDir="column">
                    <Box h={40} w="100%">
                      <Image
                        w="100%"
                        h="100%"
                        borderRadius="xl"
                        src={"data:image/jpeg;base64," + plan.avatar}
                      />
                    </Box>
                    <Heading size="md" mt={5}>
                      {plan.name}
                    </Heading>
                    <Text mt={2}>{plan.coachFullName}</Text>
                    <Flex justify="flex-end" ml={5}>
                      <Button
                        borderRadius="3xl"
                        color="white"
                        backgroundColor="#1E99D6"
                        onClick={() =>
                          navigate(
                            `/trainingPlanExecution/${plan.trainingPlanId}`
                          )
                        }
                      >
                        VYKDYTI
                      </Button>
                    </Flex>
                    <Progress
                      colorScheme="blue"
                      value={plan.progressCounter as unknown as number}
                      mt={5}
                    />
                    <Flex justify="space-between" mt={2}>
                      <Flex>
                        <Text fontWeight="bold">Progresas:&nbsp;</Text>
                        <Text>{plan.progressCounter}%</Text>
                      </Flex>
                      <Flex>
                        <Text fontWeight="bold">Terminas:&nbsp;</Text>
                        <Text>
                          {moment(
                            new Date(
                              moment(plan.expirationDate).utc(true).toString()
                            )
                          ).format("YYYY-MM-DD")}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          </>
        )}
      </Container>
      ;
    </>
  );
};

export default MyPlans;
