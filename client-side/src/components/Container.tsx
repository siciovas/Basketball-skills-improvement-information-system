import { BoxProps, Container as ChakraContainer } from "@chakra-ui/react";

const Container = ({ children, ...rest }: BoxProps) => {
  return (
    <ChakraContainer minW={600} mt={10} {...rest} mb={20}>
      {children}
    </ChakraContainer>
  );
};

export default Container;
