import { Box, Button, Flex, Heading, Input, Stack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

let initailData = {
    "full_name": "",
    "email": "",
    "mobile": "",
    "password": ""
}
const Registration = () => {
    const [formData, setFormData] = useState(initailData);




    const { full_name, email, mobile, password } = formData;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const postUserData = (data) => {
        axios.post(`https://payment-gtwy.onrender.com/user/signup`, data)
            .then((result) => {
                console.log('result', result);
                alert('added successfully')

            }).catch((err) => {
                console.log("err", err);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postUserData(formData)

    }
    return (
        <Box>
            <Navbar />
            <Stack width={'40%'} margin={'auto'}>
                <Heading>Register Here</Heading>
                <form onSubmit={handleSubmit}>
                    <Box>
                        <label>Full Name</label>
                        <Input name='full_name' value={full_name} onChange={handleChange} placeholder='Enter full name' />
                    </Box>
                    <Box>
                        <label>Email</label>
                        <Input name='email' value={email} onChange={handleChange} placeholder='Enter Email' />
                    </Box>
                    <Box>
                        <label>Mobile</label>
                        <Input name='mobile' value={mobile} onChange={handleChange} placeholder='Enter Mobile number' />
                    </Box>
                    <Box>
                        <label>Password</label>
                        <Input name='password' value={password} onChange={handleChange} placeholder='Enter password' />
                    </Box>
                    <Box>
                        <Flex>
                            <Button type='submit'>Submit</Button>
                            <Link to="/login" >Have an Account? Login</Link>
                        </Flex>
                    </Box>
                </form>
            </Stack>
        </Box>
    )
}

export default Registration