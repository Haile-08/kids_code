import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import { Counter } from '../features/counter/Counter';
import { Home } from '../components';
import Login from '../components/Login/Login';

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
        path: '/counter',
        element: <Counter />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

function RoutesPath() {
  return <RouterProvider router={router} />;
}

export default RoutesPath;
