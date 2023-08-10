import React, { useEffect } from 'react'
import { Container, Box, Text, Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp from '../components/Authentication/SignUp';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (!user) {
            history.push("/chats")
        }
    }, [history]);
    return (
        <Container maxW="xl" centerContent justifyContent="center">
            <Box display="flex" justifyContent="center" p={3} bg="white" w="100%" m="40px 0 15px 0"
                borderRadius="xl" borderWidth="xl">
                <Text fontSize="3xl" fontWeight="medium">
                    Chit-Chat
                </Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="xl" borderWidth="xl" >
                <Tabs variant='soft-rounded' colorScheme='blue'>
                    <TabList mb="3">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <SignUp />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )


}

export default HomePage