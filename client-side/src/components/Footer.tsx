import { Flex, Divider, Image, Text, Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex w="100%" py={2} backgroundColor="black" flexDir="column" mt="auto">
      <Flex justify="space-between" align="center">
        <Image ml={9} mt={5} h={40} src="/logo.ico" />
        <Flex flexDir="column" mr={40}>
          <Text fontWeight="bold" color="white">
            INFORMACIJA
          </Text>
          <Text color="white" cursor="pointer">
            Apie mus
          </Text>
          <Text color="white" cursor="pointer">
            Privatumo politika
          </Text>
          <Text color="white" cursor="pointer">
            Saugus apmokėjimas
          </Text>
        </Flex>
      </Flex>
      <Flex ml={9} mt={5} alignItems="center">
        <i className="fa-solid fa-phone"></i>
        <Text color="white" ml={5}>
          +37060000000
        </Text>
      </Flex>
      <Flex ml={9} alignItems="center">
        <i className="fa-regular fa-envelope"></i>
        <Text color="white" ml={5}>
          ktu@ktu.lt
        </Text>
      </Flex>
      <Text color="white" ml={9} mt={14}>
        © Basketball. Visos teisės saugomos.
      </Text>
      <Divider w="95%" m="auto" />
      <Flex justify="flex-end" mr={7} alignItems="center">
        <Box h={16} w={40}>
          <Image h="100%" src="/paysera.png" />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Footer;
