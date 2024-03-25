import { Box, Flex, Heading, Image } from "@chakra-ui/react";

const AboutUs = () => {
  return (
    <>
    <Box>
      <Flex justify="center" mb={10} mt={10}>
        <Heading size="xl">Apie mus</Heading>
      </Flex>
      <Flex justify="center" mb={10}>
        <Box h={250} w={400}>
          <Image h="100%" src="/aboutUs.jpg" />
        </Box>
      </Flex>
      </Box>
    </>
  );
};

export default AboutUs;
