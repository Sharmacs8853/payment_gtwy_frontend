import { Box, Button, Flex, Heading, Input, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { login } from './Redux/auth/action'
import { Link } from 'react-router-dom'
import axios from 'axios'


const initialData = {
    email: "",
    password: ""
}
const AdminLogin = () => {
    const [formData, setFormData] = useState(initialData);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const navigate = useNavigate();


    const { email, password } = formData;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:4000/admin/login`, formData)
            .then((result) => {
                console.log("admin login", result.data);
                setToken(result.data.token)
                setUser(result.data.user)
            }).catch((err) => {
                console.log('err', err);
            });

    }
    useEffect(() => {
        if (token) {
            navigate('/dashboard')
        }
    }, [handleSubmit])
    console.log("store from login", token);
    return (
        <Box>
            <Navbar />
            <Stack width={'40%'} margin={'auto'}>
                <Heading>Admin Login</Heading>
                <form onSubmit={handleSubmit}>
                    <Box>
                        <label>Admin Email</label>
                        <Input name='email' value={email} onChange={handleChange} placeholder='Enter Email' />
                    </Box>
                    <Box>
                        <label>Admin Password</label>
                        <Input name='password' value={password} onChange={handleChange} placeholder='Enter password' />
                    </Box>
                    <Box>
                        <Flex>
                            <Button type='submit'>Login</Button>

                        </Flex>

                    </Box>
                </form>
            </Stack>
        </Box>
    )
}

export default AdminLogin