import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Heading,
} from '@chakra-ui/react';
import axios from 'axios';
const Dashboard = () => {
    const [peyment, setPayments] = useState([]);
    const [gst, setGst] = useState([]);
    //http://localhost:4000/gst/get
    useEffect(() => {
        axios.get(`https://payment-gtwy.onrender.com/api/getpayments`)
            .then((result) => {
                setPayments(result.data)
            }).catch((err) => {
                console.log('err', err);
            });

        axios.get(`https://payment-gtwy.onrender.com/gst/get`)
            .then((result) => {
                setGst(result.data)
            }).catch((err) => {
                console.log('err', err);
            });
    }, [])
    console.log('pay', peyment);
    return (
        <Box width={'90%'} margin={'auto'} mt={15} borderRadius={'10px'}>
        <Heading>Payment Details</Heading>
            <TableContainer border={'1px solid gray'} m={2}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Transaction Id</Th>
                            <Th>Payment ID</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            peyment?.map((ele) => (
                                <Tr key={ele._id}>
                                    <Td>{ele.razorpay_order_id}</Td>
                                    <Td>{ele.razorpay_payment_id}</Td>
                                </Tr>
                            ))
                        }

                    </Tbody>
                </Table>
            </TableContainer>

            <Heading>GST Details</Heading>
            <TableContainer border={'1px solid gray'} m={2}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Services</Th>
                            <Th>Company</Th>
                            <Th>Phone</Th>
                            <Th>Email</Th>
                            <Th>Adhar</Th>
                            <Th>Pan</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            gst?.map((ele) => (
                                <Tr key={ele._id}>
                                    <Td>{ele.service}</Td>
                                    <Td>{ele.company}</Td>
                                    <Td>{ele.phone}</Td>
                                    <Td>{ele.email}</Td>
                                    <Td>{ele.adhar}</Td>
                                    <Td>{ele.pan}</Td>
                                </Tr>
                            ))
                        }

                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Dashboard