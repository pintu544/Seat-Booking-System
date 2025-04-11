import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Login from './Login';
import Signup from './Signup';

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleMode = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <Box width="100%" maxW="400px" mx="auto">
      {isLogin ? (
        <Login onToggleMode={toggleMode} />
      ) : (
        <Signup onToggleMode={toggleMode} />
      )}
    </Box>
  );
}