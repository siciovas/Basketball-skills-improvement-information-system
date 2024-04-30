import {
  Center,
  Flex,
  Heading,
  Spinner,
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import eventBus from "../Helpers/eventBus";
import toast from "react-hot-toast";
import { Unauthorized } from "../Helpers/constants";
import { TrainingPlanView } from "../Types/types";
import Pagination from "../components/Pagination";
import TrainingPlanForm from "../components/forms/TrainingPlanForm";
import handleErrorMessage from "../Helpers/errorHandler";

interface Filter {
  isPublic: boolean | undefined;
  page: number;
}

const TrainingPlans = () => {
  const trainingPlanModal = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlanView[]>([]);
  const [filterData, setFilterData] = useState<Filter>({
    isPublic: undefined,
    page: 10,
  });
  const [pages, setPages] = useState({
    total: 0,
    currentPage: 0,
    pageNumbers: [],
  });
  const [trainingPlanId, setTrainingPlanId] = useState<string | undefined>();

  const onFormOpen = (skillId: string | undefined) => {
    setTrainingPlanId(skillId);
    trainingPlanModal.onOpen();
  };

  const handleFilter = (value: string | string[]) => {
    setFilterData({
      ...filterData,
      isPublic: value === "all" ? undefined : value === "public" ? true : false,
    });
  };

  const handlePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterData({ ...filterData, page: parseInt(value) });
  };

  const handlePaginate = (page: number) => {
    setPages({ ...pages, currentPage: page });
  };

  const getTrainingPlansList = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "trainingPlan/my",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const trainingPlans = await response.json();
      setPages({
        ...pages,
        total: Math.ceil(trainingPlans.length / filterData.page),
      });
      setTrainingPlans(trainingPlans);
      setIsLoading(false);
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  }, []);

  useEffect(() => {
    eventBus.on("triggerTrainingPlanCreated", () => {
      setIsLoading(true);
      getTrainingPlansList();
    });
    getTrainingPlansList();
  }, [getTrainingPlansList]);

  return (
    <>
      <Container minW={1200}>
        {isLoading ? (
          <Center>
            <Spinner size="xl" textAlign="center" />
          </Center>
        ) : (
          <>
            <Flex justify="center" mb={10} mt={10}>
              <Heading size="xl">Treniruočių planai</Heading>
            </Flex>
            <Flex justifyContent="end">
              <Button
                textTransform="uppercase"
                background="#1E99D6"
                textColor="white"
                borderRadius="2xl"
                onClick={() => onFormOpen(undefined)}
              >
                Naujas planas
              </Button>
            </Flex>
            <HStack mt={5} justifyContent="end" spacing={10}>
              <Flex>
                <Menu closeOnSelect={false}>
                  <MenuButton
                    as={Button}
                    border="solid"
                    borderColor="#9e9d9d"
                    backgroundColor="#E2E2E2"
                  >
                    <Box className="fa-solid fa-filter"></Box>
                  </MenuButton>
                  <MenuList
                    minWidth="240px"
                    backgroundColor="#E2E2E2"
                    border="solid"
                    borderColor="#9e9d9d"
                  >
                    <MenuOptionGroup
                      value={
                        filterData.isPublic === undefined
                          ? "all"
                          : filterData.isPublic
                          ? "public"
                          : "private"
                      }
                      type="radio"
                      onChange={handleFilter}
                    >
                      <MenuItemOption value="public" backgroundColor="#E2E2E2">
                        Viešas
                      </MenuItemOption>
                      <MenuItemOption value="private" backgroundColor="#E2E2E2">
                        Privatus
                      </MenuItemOption>
                      <MenuItemOption value="all" backgroundColor="#E2E2E2">
                        Visi
                      </MenuItemOption>
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
              </Flex>
              <Select
                w={20}
                border="solid"
                borderColor="#9e9d9d"
                onChange={handlePageSize}
              >
                <option value="10" style={{ backgroundColor: "#E2E2E2" }}>
                  10
                </option>
                <option value="20" style={{ backgroundColor: "#E2E2E2" }}>
                  20
                </option>
                <option value="30" style={{ backgroundColor: "#E2E2E2" }}>
                  30
                </option>
              </Select>
            </HStack>
            {trainingPlans
              .filter((x) =>
                filterData.isPublic === undefined
                  ? true
                  : filterData.isPublic
                  ? x.isActive
                  : !x.isActive
              )
              .slice(
                (pages.currentPage + 1) * filterData.page - filterData.page,
                (pages.currentPage + 1) * filterData.page
              )
              .map((trainingPlan) => {
                return (
                  <Flex
                    width={600}
                    mx="auto"
                    border="solid"
                    p={5}
                    justifyContent="space-around"
                  >
                    <Box width="40%" alignSelf="center">
                      {trainingPlan.title}
                    </Box>
                    {trainingPlan.isActive ? (
                      <Box
                        width="30%"
                        alignSelf="center"
                        textTransform="uppercase"
                        color="#63A103"
                        fontWeight="bold"
                      >
                        Viešas
                      </Box>
                    ) : (
                      <Box
                        width="30%"
                        alignSelf="center"
                        textTransform="uppercase"
                        color="#D9001B"
                        fontWeight="bold"
                      >
                        Privatus
                      </Box>
                    )}
                    <Button
                      textTransform="uppercase"
                      background="#1E99D6"
                      textColor="white"
                      borderRadius="2xl"
                      onClick={() => onFormOpen(trainingPlan.id)}
                    >
                      Redaguoti
                    </Button>
                  </Flex>
                );
              })}
            <Pagination
              pageCount={pages.total}
              currentPage={pages.currentPage}
              onPageChange={handlePaginate}
            />
          </>
        )}
      </Container>
      <Modal
        isOpen={trainingPlanModal.isOpen}
        onClose={trainingPlanModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <TrainingPlanForm
              onClose={trainingPlanModal.onClose}
              trainingPlanId={trainingPlanId}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TrainingPlans;
