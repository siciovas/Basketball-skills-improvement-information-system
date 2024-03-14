import { Flex, Divider, Image, Text, Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex w="100%" py={2} backgroundColor="black" flexDir="column" mt="auto">
      <Flex justify="center" align="center">
        <Image mt={5} h={40} src="/logo.ico" />
      </Flex>
      <Flex mt={5} justify="center" alignItems="center">
        <i className="fa-solid fa-phone"></i>
        <Text color="white">+37060000000</Text>
      </Flex>
      <Flex justify="center" alignItems="center">
        <i className="fa-regular fa-envelope"></i>
        <Text color="white">ktu@ktu.lt</Text>
      </Flex>
      <Flex justify="center">
        <Text color="white" mt={14}>
          © Basketball. Visos teisės saugomos.
        </Text>
      </Flex>
      <Divider w="95%" m="auto" />
      <Flex justify="center" mr={7} alignItems="center">
        <Box h={16} w={40}>
          <Image h="100%" src="/paysera.png" />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Footer;
