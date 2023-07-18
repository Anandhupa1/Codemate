import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import  Login from "./pages/Login.jsx";
import  Register from "./pages/Register";
import Home from "./pages/Home"
import Error from "./pages/Error"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement:<Error/>
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>

    <RouterProvider router={router} />
    
    </ChakraProvider>
  </React.StrictMode>
);


