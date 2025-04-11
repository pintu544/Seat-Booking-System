import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Seat from './Seat'



export default function Compartment({ loading, data }) {

    let booked =0
    let notBooked =0

    data?.map((item)=>{
        if(item.isBooked){ booked++ }
        else { notBooked++ }
    })

    return (
        <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            h="full"
            gap={4}
            flex="1"
        >
            <Box textAlign="center" mb={2}>
                <Heading size="md" color="blue.700" mb={1}>
                    {loading ? "Select Your Seats" : "Please Wait..."}
                </Heading>
                <Text fontSize="sm" color="gray.500">Screen is at the bottom</Text>
            </Box>


            <Box
                h="10px"
                bg="gray.300"
                mx="auto"
                w="90%"
                borderRadius="md"
                mb={8}
                boxShadow="md"
            />

            <Grid
                templateColumns="repeat(7, 1fr)"
                gap={2}
                bg="#FAFAFA"
                minH="fit-content"
                h="70vh"
                overflowY="auto"
                w="fit-content"
                mx="auto"
                rounded="lg"
                p={4}
                boxShadow="inner"
                border="1px"
                borderColor="gray.200"
            >
                {data?.map((item) => (
                    <Seat key={item.id} isBooked={item.isBooked} seatNumber={item.seatNumber} />
                ))}
            </Grid>


            <Flex
                gap={4}
                justify="center"
                mt={4}
                flexWrap="wrap"
            >
                <Flex align="center" bg="white" px={4} py={2} borderRadius="lg" boxShadow="sm">
                    <Box bg="#FFC107" w="20px" h="20px" borderRadius="md" mr={2}></Box>
                    <Text fontWeight="medium">Booked: {booked}</Text>
                </Flex>
                <Flex align="center" bg="white" px={4} py={2} borderRadius="lg" boxShadow="sm">
                    <Box bg="#4CAF50" w="20px" h="20px" borderRadius="md" mr={2}></Box>
                    <Text fontWeight="medium">Available: {notBooked}</Text>
                </Flex>
            </Flex>
        </Box>
    )
}
