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
} from '@chakra-ui/react';
import axios from 'axios';
const Dashboard = () => {
    const [peyment, setPayments] = useState([]);

    useEffect(() => {
        axios.get(`https://payment-gtwy.onrender.com/api/getpayments`)
            .then((result) => {
                setPayments(result.data)
            }).catch((err) => {
                console.log('err', err);
            });
    }, [])
    console.log('pay', peyment);
    return (
        <Box width={'90%'} margin={'auto'} mt={15} border={'1px solid gray'} borderRadius={'10px'}>
            <TableContainer>
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
        </Box>
    )
}

export default Dashboard