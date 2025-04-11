import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function Login({ onToggleMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { login } = useAuth();
  const API_URL = process.env.REACT_APP_API_URL ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });
      
      const { token, userId } = response.data;
      
      login({ id: userId, email }, token);
      
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={6} borderRadius="lg" boxShadow="md" bg="white">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading size="lg">Login</Heading>
        
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaEnvelope color="gray.300" />
            </InputLeftElement>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
            />
          </InputGroup>
        </FormControl>
        
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaLock color="gray.300" />
            </InputLeftElement>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </InputGroup>
        </FormControl>
        
        <Button
          colorScheme="blue"
          width="full"
          type="submit"
          isLoading={isLoading}
          loadingText="Logging in"
          mt={4}
        >
          Login
        </Button>
        
        <Text pt={2}>
          Don't have an account?{" "}
          <Button variant="link" colorScheme="blue" onClick={onToggleMode}>
            Sign up
          </Button>
        </Text>
      </VStack>
    </Box>
  );
}