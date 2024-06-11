import { useColorMode, Switch, Box, Flex, Image, Link, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';
import logo from "../../assets/image.webp";
import useAuth from "../../hook/useAuth";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { user, logOut } = useAuth();
    console.log(user);

    return (
        <Flex as="nav" p="4" bg="gray.500" align="center" justify="space-between">
            <Box>
                <Link as={RouterLink} to="/">
                    <Image src={logo} alt="Logo" boxSize="50px" />
                </Link>
            </Box>
            <HStack spacing="28px">
                <Link as={RouterLink} to="/" fontWeight="bold">Home</Link>
                {
                    user ? <button onClick={logOut} className="btn btn-primary">Logout</button> : 
                        <>
                            <Link as={RouterLink} to="/login" fontWeight="bold">Login</Link>
                            <Link as={RouterLink} to="/register" fontWeight="bold">Register</Link>
                        </>
                    
                }
                
            </HStack>
            <Box>
                <Switch 
                    isChecked={colorMode === "dark"} 
                    onChange={toggleColorMode} 
                    colorScheme="teal"
                />
            </Box>
        </Flex>
    );
};

export default Navbar;
