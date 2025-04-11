import React, { useState } from 'react'
import Seat from './Seat'
import axios from 'axios';

import {
    Box, Flex, Heading, Text, VStack, Button, FormControl, // Removed Grid
    FormLabel, FormHelperText, Icon, InputGroup, InputLeftElement, useToast, Input
} from '@chakra-ui/react';
import { FaChair, FaTicketAlt, FaUndo } from 'react-icons/fa';

export default function InputBox({ fetchData, userId, token }) {
    const API_URL = process.env.REACT_APP_API_URL ;

    const [numberOfSeat, setNumberOfSeat] = useState();
    const [axiosResponse, setAxiosResponse] = useState();
    const [bookingProcessing, setBookingProcessing] = useState(false);
    const [resetBookingProcessing, setResetBookingProcessing] = useState(false);
    const toast = useToast();

    function displayToast(status, message) {
        toast({
            title: message,
            status: status,
            duration: 3000,
            isClosable: true,
        })
    }

    function handelBookTicket() {
        if (numberOfSeat > 7) {
            displayToast("error", "Only allow to book 7 seats at a time");
        }
        else if (!numberOfSeat || numberOfSeat <= 0) {
            displayToast("error", "Enter a valid booking number");
        }
        else {
            handelAxiosPost()
        }
    }

    const handelAxiosPost = async () => {
        setBookingProcessing(true)
        try {
            const response = await axios.post(
                `${API_URL}/api/seats/book`, 
                { numOfSeats: numberOfSeat },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAxiosResponse(response.data.data)
            fetchData()
            displayToast("success", "Seat successfully booked")
            setBookingProcessing(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            displayToast("error", error.response?.data?.message || "Error booking seats")
            setBookingProcessing(false)
        }
    };

    const handelResetBooking = async () => {
        setResetBookingProcessing(true)
        try {
            const response = await axios.post(
                `${API_URL}/api/seats/reset`, 
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            fetchData();
            setResetBookingProcessing(false);
            setAxiosResponse();
            
            // Check if any seats were actually reset
            if (response.data.count === 0) {
                displayToast("info", "You don't have any seats booked");
            } else {
                displayToast("success", `${response.data.count} seat(s) successfully reset`);
            }
            
        } catch (error) {
            console.error('Error resetting bookings:', error);
            
            // More detailed error handling
            if (error.response) {
                if (error.response.status === 401) {
                    displayToast("error", "You must be logged in to reset bookings");
                } else if (error.response.status === 404) {
                    displayToast("info", "You don't have any seats booked");
                } else {
                    displayToast("error", error.response.data.message || "Error resetting bookings");
                }
            } else if (error.request) {
                // Request made but no response received
                displayToast("error", "No response from server. Please check your connection.");
            } else {
                // Something else went wrong
                displayToast("error", "Error resetting bookings");
            }
            
            setResetBookingProcessing(false);
        }
    };

    return (
        <VStack
            align="stretch"
            spacing={4}
            bg="white"
            p={5}
            borderRadius="lg"
            boxShadow="sm"
            border="1px"
            borderColor="gray.200"
        >
            <Heading size="md" color="blue.700">Book Your Seats</Heading>

            {axiosResponse && (
                <Box>
                    <Text mb={2} fontWeight="medium">Selected Seats:</Text>
                    <Flex gap={2} flexWrap="wrap">
                        {axiosResponse?.map((item) => (
                            <Seat key={item.id} isBooked={true} seatNumber={item.seatNumber} />
                        ))}
                    </Flex>
                </Box>
            )}

            <FormControl>
                <FormLabel>Number of Seats</FormLabel>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <Icon as={FaChair} color='gray.400' />
                    </InputLeftElement>
                    <Input
                        disabled={bookingProcessing || resetBookingProcessing}
                        bg="white"
                        color="blue.600"
                        placeholder='Enter number of seats'
                        onChange={(e) => { setNumberOfSeat(parseInt(e.target.value)) }}
                        type='number'
                        min={1}
                        max={7}
                    />
                </InputGroup>
                <FormHelperText>Maximum 7 seats allowed</FormHelperText>
            </FormControl>

            <Button
                isDisabled={bookingProcessing || resetBookingProcessing}
                colorScheme='blue'
                onClick={() => { handelBookTicket() }}
                isLoading={bookingProcessing}
                loadingText="Booking..."
                leftIcon={<Icon as={FaTicketAlt} />}
                size="lg"
            >
                Book Now
            </Button>

            <Button
                isDisabled={bookingProcessing || resetBookingProcessing}
                variant="outline"
                colorScheme='red'
                onClick={() => { handelResetBooking() }}
                isLoading={resetBookingProcessing}
                loadingText="Resetting..."
                leftIcon={<Icon as={FaUndo} />}
                mt={2}
            >
                Reset My Bookings
            </Button>
        </VStack>
    )
}
