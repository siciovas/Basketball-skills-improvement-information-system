import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react";
import { NavbarProps } from "./types";
import { useNavigate } from "react-router-dom";

const TeacherNavbar = ({ logOut }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <Flex
      w="100%"
      py={2}
      justifyContent="space-between"
      borderBottom="1px"
      borderBottomColor="black"
    >
      <Flex>
        <Image
          ml={5}
          h={45}
          src="/logo.ico"
          cursor="pointer"
          onClick={() => navigate("/")}
          borderRadius="xl"
        />
      </Flex>
      <Flex gap={10} mr={5} alignItems="center">
        <Box cursor="pointer" onClick={() => navigate("/")}>
          PAGRINDINIS
        </Box>
        <Box cursor="pointer" onClick={() => navigate("/activeClients")}>
          KLIENTAI
        </Box>
        <Box cursor="pointer" onClick={() => navigate("/aboutUs")}>
          APIE
        </Box>
      </Flex>
      <Flex mr={5} alignItems="center" gap={5}>
        <Menu>
          <MenuButton as={Button} rounded="full">
            <Box className="fa-solid fa-user fa-xl"></Box>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate("/profile")}>
              Mano profilis
            </MenuItem>
            <MenuItem onClick={() => navigate("/trainingPlans")}>
              Mano planai
            </MenuItem>
            <MenuItem onClick={(e) => logOut(e)}>Atsijungti</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default TeacherNavbar;
