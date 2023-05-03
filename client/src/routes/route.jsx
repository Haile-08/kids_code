import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from '../components/Layout/MainLayout';
import { Home, Login, Register } from '../components';

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

function RoutesPath() {
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(`toekn ${useSelector((state) => state.token)}`);
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
          path: '/register',
          element: isAuth ? <Register /> : <Navigate to="/login" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default RoutesPath;
