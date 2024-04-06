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
  onSortChange: (value: string | string[]) => void;
  onDateRangeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const OrderFilter = ({ onSortChange, onDateRangeChange }: Props) => {
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
            title="Rikiavimas"
            type="radio"
            onChange={onSortChange}
            defaultValue="date;1"
          >
            <MenuItemOption backgroundColor="#E2E2E2" value="date;1">
              Užsakymo data (naujausi viršuje)
            </MenuItemOption>
            <MenuItemOption backgroundColor="#E2E2E2" value="date;0">
              Užsakymo data (seniausi viršuje)
            </MenuItemOption>
            <MenuItemOption backgroundColor="#E2E2E2" value="price;1">
              Užsakymo suma (didžiausia viršuje)
            </MenuItemOption>
            <MenuItemOption backgroundColor="#E2E2E2" value="price;0">
              Užsakymo suma (mažiausia viršuje)
            </MenuItemOption>
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup title="Užsakymo data">
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

export default OrderFilter;
