import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface Props {
  onFilterStatusChange: (value: string | string[]) => void;
  onDateRangeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CoachFilter = ({ onFilterStatusChange, onDateRangeChange }: Props) => {
  return (
    <Flex justifyContent="end" mr={5}>
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          border="solid"
          borderColor="#9e9d9d"
          backgroundColor="#E2E2E2"
        >
          <Box className="fa-solid fa-filter"></Box>
        </MenuButton>
        <MenuList minWidth="240px" backgroundColor="#E2E2E2">
          <MenuOptionGroup
            title="Statusas"
            type="checkbox"
            onChange={onFilterStatusChange}
          >
            <MenuItemOption backgroundColor="#E2E2E2" value="rejected">
              Atšauktas
            </MenuItemOption>
            <MenuItemOption backgroundColor="#E2E2E2" value="approved">
              Patvirtintas
            </MenuItemOption>
            <MenuItemOption backgroundColor="#E2E2E2" value="pending">
              Laukiama patvirtinimo
            </MenuItemOption>
            <MenuItemOption backgroundColor="#E2E2E2" value="blocked">
              Užblokuotas
            </MenuItemOption>
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup title="Registracijos data">
            <Flex flexDir="column" py={2} px={3} ml={6}>
              Nuo
              <input
                type="date"
                name="from"
                onChange={onDateRangeChange}
                style={{ backgroundColor: "#E2E2E2" }}
              ></input>
            </Flex>
            <Flex flexDir="column" py={2} px={3} ml={6}>
              Iki
              <input
                type="date"
                name="to"
                onChange={onDateRangeChange}
                style={{ backgroundColor: "#E2E2E2" }}
              ></input>
            </Flex>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default CoachFilter;
