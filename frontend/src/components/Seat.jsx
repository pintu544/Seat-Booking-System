import { Box, Text } from '@chakra-ui/react'
import React from 'react'


export default function Seat({ seatNumber, isBooked }) {
    return (

        <Box
            color={isBooked ? "gray.700" : "white"}
            h="48px"
            w="48px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={isBooked ? "#FFC107" : "#4CAF50"}
            borderRadius="md"
            boxShadow="sm"
            transition="all 0.2s"
            _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
        >
            <Text align="center" fontSize="md" fontWeight="bold">
                {seatNumber}
            </Text>
        </Box>
    )
}
