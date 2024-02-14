import { BoxProps, Container as ChakraContainer } from "@chakra-ui/react";

const Container = ({ children, ...rest }: BoxProps) => {
  return (
    <ChakraContainer minW={600} mt={20} {...rest}>
      {children}
    </ChakraContainer>
  );
};

export default Container;
