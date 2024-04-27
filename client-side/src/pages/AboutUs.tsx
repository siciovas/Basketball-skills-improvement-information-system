import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const AboutUs = () => {
  return (
    <>
      <Box>
        <Flex justify="center" mb={10} mt={10}>
          <Heading size="xl">Apie mus</Heading>
        </Flex>
        <Flex
          align="center"
          m="auto"
          flexDir="column"
          gap={5}
          borderRadius="xl"
          border="solid"
          borderColor="#9e9d9d"
          borderWidth="2px"
          w="50%"
          mb={10}
        >
          <Heading size="md" fontWeight="bold" mt={10}>
            Krepšinio įgūdžių tobulinimo informacinė sistema
          </Heading>
          <Text fontWeight="bold">
            Information system for improving basketball skills
          </Text>
          <Text fontWeight="bold" mt={5}>
            Autorius:
          </Text>
          <Text mb={10}>Ignas Ilinčius IFAp-0</Text>
        </Flex>
      </Box>
    </>
  );
};

export default AboutUs;
