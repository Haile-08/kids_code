import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { useRouteError } from "react-router-dom";
import MainLayout from '../components/Layout/MainLayout';
import { Counter } from '../features/counter/Counter';
import { Home } from '../features/Home/Home';

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
          path: "/",
          element: <Home/>,
        },
        {
          path: "/counter",
          element: <Counter/>,
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