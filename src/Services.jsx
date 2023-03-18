import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Select, Stack } from "@chakra-ui/react"
import Card from './Card'
import axios from "axios";
import Navbar from './Navbar';
import { useSelector } from 'react-redux';

const Services = () => {
    const [services, setServices] = useState([]);
    const [amount, setAmount] = useState(0);
    const user = useSelector((store) => store.authReducer.user)

    const handleDropdownVal = (e) => {
        console.log('amount', e.target.value)
        setAmount(e.target.value)
    }

    useEffect(() => {
        axios.get(`https://payment-gtwy.onrender.com/services/get`)
            .then((result) => {
                setServices(result.data)
            }).catch((err) => {
                console.log('err', err);
            });
    }, [])

    const checkoutHandler = async (amount) => {
        const { data: { key } } = await axios.get("https://payment-gtwy.onrender.com/api/getkey")
        const { data: { order } } = await axios.post("https://payment-gtwy.onrender.com/api/checkout", {
            amount
        });
        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Jitendra Sharma",
            description: "this is for Testing perpose",
            image: "https://avatars.githubusercontent.com/u/101573274?v=4",
            order_id: order.id,
            callback_url: "http://localhost:4000/api/paymentverification",
            prefill: {
                name: user.full_name,
                email: user.email,
                contact: user.mobile
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    return (
        <Box>
            <Navbar />
            <Box height={'100vh'} width={'100%'}>
                <Box width={'50%'} margin={'auto'}>
                    <Heading size={'md'} textAlign={'center'}>Our Services</Heading>
                    <Select placeholder='Select option' onChange={handleDropdownVal}>
                        {
                            services?.map((ele) => (
                                <option key={ele._id} value={ele.service_amount}>{ele.service_type}</option>
                            ))
                        }
                    </Select>
                </Box>
                <Stack h={'100vh'} alignItems="center" justifyContent="space-around" direction={["column", "row"]}>

                    <Card amount={amount} checkoutHandler={checkoutHandler} />

                    <Box margin={'10'} p={5} >
                        <Stack>
                            <Heading size={'md'}>user Details</Heading>
                            <br />
                            <Heading size={'xs'}>Name: &nbsp;{user.full_name}</Heading>
                            <Heading size={'xs'}>Email: &nbsp;{user.email}</Heading>
                            <Heading size={'xs'}>Mobile: &nbsp;{user.mobile}</Heading>
                        </Stack>
                    </Box>
                </Stack>

            </Box>
        </Box>
    )
}

export default Services