import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import MainNavBar from "./MainNavbar";
import { NavbarProps } from "./types";

const StudentNavbar = ({ logOut }: NavbarProps) => {
  return (
    <Flex
      w="100%"
      py={2}
      justifyContent="space-between"
      borderBottom="1px"
      borderBottomColor="black"
    >
      <MainNavBar />
      <Flex mr={5} alignItems="center" gap={5}>
        <Menu>
          <MenuButton as={Button} rounded="full">
            <Box className="fa-solid fa-user fa-xl"></Box>
          </MenuButton>
          <MenuList>
            <MenuItem>Profilis</MenuItem>
            <MenuItem>Mano treniruotės</MenuItem>
            <MenuItem>Krepšelis</MenuItem>
            <MenuItem onClick={(e) =>logOut(e)}>Atsijungti</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default StudentNavbar;
