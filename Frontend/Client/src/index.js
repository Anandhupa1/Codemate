import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import  Login from "./pages/Login.jsx";
import  Register from "./pages/Register";
import Home from "./pages/Home"
import Error from "./pages/Error"
import Plans from "./pages/plans/Plans.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: (
      <ChakraProvider>
        <Login />
      </ChakraProvider>
    ),
  },
  {
    path: '/register',
    element: (
      <ChakraProvider>
        <Register />
      </ChakraProvider>
    ),
  },
  {
    path: '/plans',
    element: <Plans />, // Plans route will not use ChakraProvider
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    

    <RouterProvider router={router} />
    
    
  </React.StrictMode>
);


