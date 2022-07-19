import './Styles/styles.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes';
import { ContextProvider } from './context/context';
import { ChakraProvider } from '@chakra-ui/react'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <ChakraProvider>
        <MainRoutes />
      </ChakraProvider>
    </ContextProvider>
  </BrowserRouter>
);


