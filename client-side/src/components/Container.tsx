import React from "react";
import { BoxProps, Container as ChakraContainer } from "@chakra-ui/react";

const Container = ({ children, ...rest }: BoxProps) => {
  return (
    <ChakraContainer mt={20} {...rest}>
      {children}
    </ChakraContainer>
  );
};

export default Container;
