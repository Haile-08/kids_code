import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import { Home } from '../components';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

// Error handling
function ErrorPage() {
  const error = useRouteError();

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

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/Register',
        element: <Register />,
      },
    ],
  },
]);

function RoutesPath() {
  return <RouterProvider router={router} />;
}

export default RoutesPath;
