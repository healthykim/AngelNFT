import React from 'react';
import { Stack, Flex, Box, Text, Button, Link } from '@chakra-ui/react';


function Layout({children}) {
    return(
    <Stack direction='column' alignItems={"center"} spacing={4}>
        <Flex w='full' p={4} bg={'skyblue'} direction='column' alignItems={"center"} >
        <Link href = "/">
            <Text fontWeight={"bold"}>Project Name</Text>
        </Link>
        </Flex>
        <Flex direction = "column" h = "full" justifyContent={"center"} alignItems="center">
            {children}
        </Flex>
        {/*
        <Flex justifyContent='space-around' alignItems={"center"}>
            <Link href = "/donate">
                <Button size="sm" colorScheme = "blue">
                    Donate Page
                </Button>
            </Link>
        </Flex>
        */}
    </Stack>
    );
}

export default Layout;