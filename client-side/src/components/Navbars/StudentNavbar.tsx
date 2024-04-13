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
import { useNavigate } from "react-router-dom";

const StudentNavbar = ({ logOut }: NavbarProps) => {
  const navigate = useNavigate();
  
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
            <MenuItem onClick={() => navigate("/profile")}>Profilis</MenuItem>
            <MenuItem>Krepšelis</MenuItem>
            <MenuItem>Mano treniruotės</MenuItem>
            <MenuItem onClick={() => navigate("/myOrders")}>Mano užsakymai</MenuItem>
            <MenuItem onClick={(e) => logOut(e)}>Atsijungti</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default StudentNavbar;
