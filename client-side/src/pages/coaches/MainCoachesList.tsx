import {
  SimpleGrid,
  Box,
  Image,
  Flex,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import Container from "../../components/Container";

const testArray = ["", "", "", "", "", "", "", "", "", ""];

const MainCoachesList = () => {
  return (
    <Container minW={1400}>
      <Heading>Treneriai</Heading>
      <HStack justifyContent="end" spacing={10}>
        <Flex>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button}>
              <Box className="fa-solid fa-filter"></Box>
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup type="checkbox" onChange={() => {}}>
                <MenuItemOption value="rejected">
                  Geriausiai įvertinti
                </MenuItemOption>
                <MenuItemOption value="approved">Populiariausi</MenuItemOption>
                <MenuItemOption value="pending">
                  Daugiausiai planų
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
        <Select w={20} defaultValue={10}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </Select>
      </HStack>

      <SimpleGrid columns={3} spacing={10} mt={10}>
        {testArray.map(() => {
          return (
            <Box border="solid" minH={60} p={2}>
              <Flex dir="column" pos="relative" gap={3}>
                <Box alignSelf="center" h={40} w={60}>
                  <Image
                    w="100%"
                    h="100%"
                    src="https://m.basketnews.lt/paveikslelis-25361-crop700x700.jpg"
                  ></Image>
                </Box>
                <Flex flexDir="column" gap={2}>
                  <Heading size="sm">Sarunas Jasikevicius</Heading>
                  <Box>Krepsinio treneris</Box>
                  <Box wordBreak="break-word">
                    Lietuvos krepsininkas, krepsinio treneris, Eurolygos
                    cempionas
                  </Box>
                  <Flex backgroundColor="gray.200" gap={5} px={2}>
                    <Flex flexDir="column" alignItems="center">
                      <Box>Planai</Box>
                      <Box fontWeight="bold">5</Box>
                    </Flex>
                    <Flex flexDir="column" alignItems="center">
                      <Box>Klientai</Box>
                      <Box fontWeight="bold">90</Box>
                    </Flex>
                    <Flex flexDir="column" alignItems="center">
                      <Box>Reitingas</Box>
                      <Box fontWeight="bold">9.5</Box>
                    </Flex>
                  </Flex>
                  <Button
                    borderRadius="3xl"
                    color="white"
                    backgroundColor="#1E99D6"
                    alignSelf="end"
                    w={32}
                    textTransform="uppercase"
                    fontSize="small"
                  >
                    Sužinoti daugiau
                  </Button>
                </Flex>
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};
``;

export default MainCoachesList;
