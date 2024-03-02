import { Flex } from "@chakra-ui/react";
import MainNavBar from "./MainNavbar";

const AdminNavbar = () => {
  return (
    <Flex
      w="100%"
      py={2}
      justifyContent="space-between"
      borderBottom="1px"
      borderBottomColor="black"
    >
      <MainNavBar />
    </Flex>
  );
};

export default AdminNavbar;
