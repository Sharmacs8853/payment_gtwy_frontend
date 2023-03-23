import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, Input, Select, Stack } from "@chakra-ui/react"
import Card from './Card'
import axios from "axios";
import Navbar from './Navbar';
import { useSelector } from 'react-redux';

const initailData = {
    "service": "",
    "company": "",
    "phone": "",
    "email": "",
    "adhar": "",
    "pan": "",
}

const Services = () => {
    const [services, setServices] = useState([]);
    const [amount, setAmount] = useState(0);
    const [formData, setFormData] = useState(initailData);
    const user = useSelector((store) => store.authReducer.user)

    const { service, company, phone, email, adhar, pan } = formData;

    const handleDropdownVal = (e) => {
        console.log('amount', e.target.value)
        setAmount(e.target.value.split(",")[1])
    }

    useEffect(() => {
        axios.get(`https://payment-gtwy.onrender.com/services/get`)
            .then((result) => {
                setServices(result.data)
            }).catch((err) => {
                console.log('err', err);
            });
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`https://payment-gtwy.onrender.com/gst/create`, formData)
            .then((result) => {
                alert(result.data.msg)
                console.log('data', result.data)
            }).catch((err) => {
                console.log("err", err);
            });

    }

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
            callback_url: "https://payment-gtwy.onrender.com/api/paymentverification",
            prefill: {
                name: user.full_name,
                email: user.email,
                contact: user.mobile
            },
            notes: {
                "address": "lucknow me rahte hai"
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
            <Flex>
                <Stack width={'40%'} margin={'auto'}>
                    <Heading size={'md'} textAlign={'center'}>Application for GST Registration</Heading>
                    <form onSubmit={handleSubmit}>
                        <Box>
                            <label>Services</label>
                            <Select id='service' placeholder='Select option' name='service' value={service} onChange={(e) => {
                                handleChange(e);
                                handleDropdownVal(e)
                            }}>
                                {
                                    services?.map((ele) => (
                                        <option key={ele._id} value={`${ele.service_type}, ${ele.service_amount}`}>{ele.service_type}</option>
                                    ))
                                }
                            </Select>
                        </Box>
                        <Box>
                            <label>Company Name</label>
                            <Input placeholder='compay Name' name='company' value={company} onChange={handleChange} />
                        </Box>
                        <Box>
                            <label>Phone</label>
                            <Input placeholder='Phone' name='phone' value={phone} onChange={handleChange} />
                        </Box>
                        <Box>
                            <label>Email</label>
                            <Input placeholder='Email' name='email' value={email} onChange={handleChange} />
                        </Box>
                        <Box>
                            <label>Adhar</label>
                            <Input placeholder='Adhar' name='adhar' value={adhar} onChange={handleChange} />
                        </Box>
                        <Box>
                            <label>Pan Number</label>
                            <Input placeholder='ENTER PAN NUMBER' name='pan' value={pan} onChange={handleChange} />
                        </Box>
                        <Box>
                            <label>Price</label>
                            <Input name='price' value={amount} />
                        </Box>
                        <Box>
                            <Button type='submit' width='100%' colorScheme='facebook' onClick={() => checkoutHandler(amount)}>PAY NOW</Button>
                        </Box>
                    </form>
                </Stack>
                <Stack alignItems="center" justifyContent="space-around" direction={["column", "row"]}>

                    {/* <Card amount={amount} checkoutHandler={checkoutHandler} /> */}

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

            </Flex>
        </Box>
    )
}

export default Services