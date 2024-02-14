import { Box, Flex, Image } from "@chakra-ui/react"

const GuestNavbar = () => {
    return (
        <Flex w="100%" py={2} justifyContent="space-between" justify="center" position="absolute" top="0" zIndex="1" borderBottom="1px" borderBottomColor="black">
            <Flex>
                <Image ml={5} h={45} src='/logo.ico' cursor="pointer" />
            </Flex>
            <Flex gap={10} mr={5} alignItems="center">
                <Box cursor="pointer">
                    PAGRINDINIS
                </Box>
                <Box cursor="pointer">
                    TRENERIAI
                </Box>
                <Box cursor="pointer">
                    APIE
                </Box>
            </Flex>
            <Flex mr={5}>
                <i className="fa-solid fa-user"></i>
                <i className="fa-solid fa-cart-shopping"></i>
            </Flex>
        </Flex>
    )
}

export { GuestNavbar }