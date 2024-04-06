import { Button, Flex, Heading, Input, Switch } from "@chakra-ui/react";
import { useState } from "react";

const CommissionFee = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Flex
      px={15}
      py={10}
      border="1px"
      borderRadius="lg"
      mt={10}
      mb={10}
      w="50%"
      flexDir="column"
    >
      <Heading size="lg">Komisinis mokestis</Heading>
      <Flex mt={5} align="center" justify="space-between">
        <Heading>10 %</Heading>
        <Flex w="50%" gap={5}>
          <Switch
            size="lg"
            colorScheme="blue"
            onChange={handleSwitchChange}
            isChecked={isChecked}
          />
          <Heading size="md">{isChecked ? "Taikomas" : "Netaikomas"}</Heading>
        </Flex>
      </Flex>
      <Heading size="sm" mt={10}>
        Mokesčio dydis:
      </Heading>
      <Flex gap={5} mt={5}>
        <Input type="number" w="20%" min={0} max={99}/>
        <Button backgroundColor="#1E99D6" color="white">
          ATNAUJINTI
        </Button>
      </Flex>
    </Flex>
  );
};

export default CommissionFee;
