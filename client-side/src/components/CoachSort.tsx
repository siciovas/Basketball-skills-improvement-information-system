import {
  Box,
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";

interface Props {
  onSortChange: (value: string | string[]) => void;
}

const CoachSort = ({ onSortChange }: Props) => {
  return (
    <Flex mr={5}>
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          border="solid"
          borderColor="#9e9d9d"
          backgroundColor="#E2E2E2"
        >
          <Box className="fa-solid fa-sort"></Box>
        </MenuButton>
        <MenuList minWidth="240px" backgroundColor="#E2E2E2">
          <MenuOptionGroup
            title="Rikiavimas"
            type="radio"
            onChange={onSortChange}
            defaultValue="date;1"
          >
            <MenuItemOption backgroundColor="#E2E2E2" value="date;1">
              Pagal registracijos datą (nuo naujausios iki seniausios)
            </MenuItemOption>
            <MenuItemOption backgroundColor="#E2E2E2" value="date;0">
              Pagal registracijos datą (nuo seniausios iki naujausios)
            </MenuItemOption>
            <MenuItemOption backgroundColor="#E2E2E2" value="rating;1">
              Pagal reitingą (nuo aukščiausio iki žemiausio)
            </MenuItemOption>
            <MenuItemOption backgroundColor="#E2E2E2" value="rating;0">
              Pagal reitingą (nuo žemiausio iki aukščiausio)
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default CoachSort;
