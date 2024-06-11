import { useColorMode, Switch, Box, Flex, Image } from "@chakra-ui/react";
import logo from "../../assets/image.webp";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex as="nav" p="4" bg="gray.50" align="center" justify="space-between">
            <Box>
                <Image src={logo} alt="Logo" boxSize="50px" />
            </Box>
            <Box>
                <Flex align="center">
                    <Switch 
                        isChecked={colorMode === "dark"} 
                        onChange={toggleColorMode} 
                        colorScheme="teal"
                    />
                </Flex>
            </Box>
        </Flex>
    );
};

export default Navbar;
