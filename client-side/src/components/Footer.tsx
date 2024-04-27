import { Flex, Divider, Image, Text, Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex w="100%" py={2} backgroundColor="black" flexDir="column" mt="auto">
      <Flex mt={5} justify="center" alignItems="center" gap={3}>
        <Box className="fa-solid fa-phone" color="#ffffff"></Box>
        <Text color="white">+37060000000</Text>
      </Flex>
      <Flex justify="center" alignItems="center" gap={3}>
        <Box className="fa-regular fa-envelope" color="#ffffff"></Box>
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
