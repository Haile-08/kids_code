import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { useRouteError } from "react-router-dom";
import MainLayout from '../components/Layout/MainLayout';

//Error handling
const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
  
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    );
}

//Routes
const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "contacts/:contactId",
          element: <div>contacts</div>,
        },
      ],
    },
]);


const  RoutesPath = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default RoutesPath