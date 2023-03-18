import { Box, Button, Flex, Heading, Input, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { login } from './Redux/auth/action'
import { Link } from 'react-router-dom'


const initialData = {
    email: "",
    password: ""
}
const Login = () => {
    const [formData, setFormData] = useState(initialData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((store) => store.authReducer.token)

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
        dispatch(login(formData))
    }
    useEffect(() => {
        if (token) {
            navigate('/services')
        }
    }, [handleSubmit])
    console.log("store from login", token);
    return (
        <Box>
            <Navbar />
            <Stack width={'40%'} margin={'auto'}>
                <Heading>Login Here</Heading>
                <form onSubmit={handleSubmit}>
                    <Box>
                        <label>Email</label>
                        <Input name='email' value={email} onChange={handleChange} placeholder='Enter Email' />
                    </Box>
                    <Box>
                        <label>Password</label>
                        <Input name='password' value={password} onChange={handleChange} placeholder='Enter password' />
                    </Box>
                    <Box>
                        <Flex>
                            <Button type='submit'>Login</Button>
                            <Link to="/register" >New user? create Account</Link>
                        </Flex>

                    </Box>
                </form>
            </Stack>
        </Box>
    )
}

export default Login