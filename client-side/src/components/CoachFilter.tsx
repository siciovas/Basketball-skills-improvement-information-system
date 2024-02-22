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
        <MenuButton as={Button}>
          <Box className="fa-solid fa-filter"></Box>
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuOptionGroup
            title="Statusas"
            type="checkbox"
            onChange={onFilterStatusChange}
          >
            <MenuItemOption value="rejected">Rejected</MenuItemOption>
            <MenuItemOption value="approved">Approved</MenuItemOption>
            <MenuItemOption value="pending">Pending</MenuItemOption>
            <MenuItemOption value="blocked">Blocked</MenuItemOption>
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup title="Registracijos data">
            <Flex flexDir="column" py={2} px={3} ml={6}>
              Nuo
              <input
                type="date"
                name="from"
                onChange={onDateRangeChange}
              ></input>
            </Flex>
            <Flex flexDir="column" py={2} px={3} ml={6}>
              Iki
              <input type="date" name="to" onChange={onDateRangeChange}></input>
            </Flex>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default CoachFilter;
