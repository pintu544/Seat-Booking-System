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

export default function Signup({ onToggleMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { login } = useAuth();
  const API_URL = process.env.REACT_APP_API_URL ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        email,
        password
      });
      
      const { token, userId } = response.data;
      
      login({ id: userId, email }, token);
      
      toast({
        title: "Account created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Signup error details:', error);
      
      let errorMessage = "Signup failed. Please try again.";
      
      if (error.response) {
        console.log('Server response:', error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        console.log('No server response received');
        errorMessage = "Cannot connect to server. Check your connection.";
      } else {
        console.log('Error message:', error.message);
      }
      
      toast({
        title: "Error",
        description: errorMessage,
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
        <Heading size="lg">Sign Up</Heading>
        
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
              placeholder="Create password"
            />
          </InputGroup>
        </FormControl>
        
        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaLock color="gray.300" />
            </InputLeftElement>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </InputGroup>
        </FormControl>
        
        <Button
          colorScheme="blue"
          width="full"
          type="submit"
          isLoading={isLoading}
          loadingText="Signing up"
          mt={4}
        >
          Sign Up
        </Button>
        
        <Text pt={2}>
          Already have an account?{" "}
          <Button variant="link" colorScheme="blue" onClick={onToggleMode}>
            Login
          </Button>
        </Text>
      </VStack>
    </Box>
  );
}