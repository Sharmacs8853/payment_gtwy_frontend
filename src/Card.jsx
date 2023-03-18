import { Box, Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Card = ({ amount, checkoutHandler }) => {
    return (
        <Box>
            <VStack>
                <Text>₹{amount}</Text>
                <Button onClick={() => checkoutHandler(amount)}>Make payment</Button>
            </VStack>
        </Box>
    )
}

export default Card