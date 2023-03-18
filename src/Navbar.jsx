import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <Box>
            <Flex justifyContent={'space-around'} padding={2} m={5} alignItems={'center'} gap={2}>
                <Heading size={'lg'}><Link to='/'>Jitendra Pay</Link></Heading>
                <Spacer />
                <Heading size={'md'}><Link to='/services' >Services</Link></Heading>
                <Heading><Button><Link to='/adminlogin'>Admin Login</Link></Button></Heading>
            </Flex>
        </Box>
    )
}

export default Navbar