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
import NewExerciseForm from "../components/forms/NewExerciseForm";

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

  const handleFilter = (value: string | string[]) => {
    setFilterData({
      ...filterData,
      isUsed: value === "all" ? undefined : value === "used" ? true : false,
    });
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
      setExercises(exercises);
      setIsLoading(false);
    } else {
      toast.error("Netikėta klaida!");
    }
  }, []);

  useEffect(() => {
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
              <Button backgroundColor="#1E99D6" color="white" onClick={onOpen}>
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
              .slice(0, filterData.page)
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
                      borderRadius="3xl"
                      color="white"
                      backgroundColor="#1E99D6"
                      textTransform="uppercase"
                      fontSize="small"
                    >
                      Redaguoti
                    </Button>
                  </Flex>
                );
              })}
          </>
        )}
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <NewExerciseForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Exercises;