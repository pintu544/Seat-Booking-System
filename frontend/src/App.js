import './App.css';
import {Box, Flex, Heading, Button} from '@chakra-ui/react';
import Compartment from './components/Compartment';
import InputBox from './components/InputBox';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthContainer from './components/Auth/AuthContainer';
import { FaSignOutAlt } from 'react-icons/fa';

function MainApp() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const { currentUser, token, logout } = useAuth();

  // Use useCallback to memoize the fetchData function
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/seats`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setData(response.data.availableSeats);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL, token]);

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser, fetchData]); // Added fetchData as dependency

  if (!currentUser) {
    return (
      <Box bgGradient="linear(to-br, blue.50, purple.50)" minH="100vh" p={4}>
        <Box maxW="1200px" mx="auto">
          <Heading textAlign="center" mb={6} color="blue.700" fontSize="2xl">
            Seat Booking System
          </Heading>
          <AuthContainer />
        </Box>
      </Box>
    );
  }

  return (
    <Box bgGradient="linear(to-br, blue.50, purple.50)" minH="100vh" p={4}>
      <Box maxW="1200px" mx="auto">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading color="blue.700" fontSize="2xl">
             Seat Booking System
          </Heading>
          <Flex align="center" gap={3}>
            <Box fontSize="sm" color="gray.600">
              Welcome, {currentUser.email}
            </Box>
            <Button 
              size="sm" 
              colorScheme="red" 
              onClick={logout} 
              leftIcon={<FaSignOutAlt />}
            >
              Logout
            </Button>
          </Flex>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "flex-start" }}
          gap={6}
          bg="white"
          p={6}
          borderRadius="xl"
          boxShadow="lg"
        >
          <Compartment data={data} loading={loading} />
          <Box w={{ base: "100%", md: "320px" }}>
            <InputBox 
              fetchData={fetchData} 
              setData={setData} 
              data={data} 
              token={token} 
              userId={currentUser.id}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
