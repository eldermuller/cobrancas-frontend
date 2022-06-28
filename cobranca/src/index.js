import './Styles/styles.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes';
import { ContextProvider } from './context/context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <MainRoutes />
    </ContextProvider>
  </BrowserRouter>
);


