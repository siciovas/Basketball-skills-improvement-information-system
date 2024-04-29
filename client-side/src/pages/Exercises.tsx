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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Container from "../components/Container";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import eventBus from "../Helpers/eventBus";
import toast from "react-hot-toast";
import { Unauthorized } from "../Helpers/constants";
import { GenericExerciseSkillInfo } from "../Types/types";
import ExerciseForm from "../components/forms/ExerciseForm";
import Pagination from "../components/Pagination";

export interface Filter {
  isUsed: boolean | undefined;
  page: number;
}

const Exercises = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("accessToken");
  const [exercises, setExercises] = useState<GenericExerciseSkillInfo[]>([]);
  const [filterData, setFilterData] = useState<Filter>({
    isUsed: undefined,
    page: 10,
  });
  const [pages, setPages] = useState({
    total: 0,
    currentPage: 0,
    pageNumbers: [],
  });
  const [exerciseId, setExerciseId] = useState<string | undefined>();

  const onFormOpen = (exerciseId: string | undefined) => {
    setExerciseId(exerciseId);
    onOpen();
  };

  const handleFilter = (value: string | string[]) => {
    setFilterData({
      ...filterData,
      isUsed: value === "all" ? undefined : value === "used" ? true : false,
    });
  };

  const handlePaginate = (page: number) => {
    setPages({ ...pages, currentPage: page });
  };

  const handlePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterData({ ...filterData, page: parseInt(value) });
  };

  const getExercisesList = useCallback(async () => {
    const response = await fetch(import.meta.env.VITE_API_URL + "exercise", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const exercises = await response.json();
      setPages({
        ...pages,
        total: Math.ceil(exercises.length / filterData.page),
      });
      setExercises(exercises);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
    eventBus.on("triggerExerciseCreated", () => {
      setIsLoading(true);
      getExercisesList();
    });
    getExercisesList();
  }, [getExercisesList]);

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
              <Heading size="xl">Treniruočių pratimai</Heading>
            </Flex>
            <Flex justifyContent="end">
              <Button
                textTransform="uppercase"
                background="#1E99D6"
                textColor="white"
                borderRadius="2xl"
                onClick={() => onFormOpen(undefined)}
              >
                Naujas pratimas
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
                        filterData.isUsed === undefined
                          ? "all"
                          : filterData.isUsed
                          ? "used"
                          : "notUsed"
                      }
                      type="radio"
                      onChange={handleFilter}
                    >
                      <MenuItemOption value="used" backgroundColor="#E2E2E2">
                        Naudojamas
                      </MenuItemOption>
                      <MenuItemOption value="notUsed" backgroundColor="#E2E2E2">
                        Nenaudojamas
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
            {exercises
              .filter((x) =>
                filterData.isUsed === undefined
                  ? true
                  : filterData.isUsed
                  ? x.isUsed
                  : !x.isUsed
              )
              .slice(
                (pages.currentPage + 1) * filterData.page - filterData.page,
                (pages.currentPage + 1) * filterData.page
              )
              .map((exercise) => {
                return (
                  <Flex
                    width={600}
                    mx="auto"
                    border="solid"
                    p={5}
                    justifyContent="space-around"
                  >
                    <Box width="40%" alignSelf="center">
                      {exercise.name}
                    </Box>
                    {exercise.isUsed ? (
                      <Box
                        width="30%"
                        alignSelf="center"
                        textTransform="uppercase"
                        color="#63A103"
                        fontWeight="bold"
                      >
                        Naudojamas
                      </Box>
                    ) : (
                      <Box
                        width="30%"
                        alignSelf="center"
                        textTransform="uppercase"
                        color="#D9001B"
                        fontWeight="bold"
                      >
                        Nenaudojamas
                      </Box>
                    )}
                    <Button
                      textTransform="uppercase"
                      background="#1E99D6"
                      textColor="white"
                      borderRadius="2xl"
                      onClick={() => onFormOpen(exercise.id)}
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ExerciseForm onClose={onClose} exerciseId={exerciseId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Exercises;
