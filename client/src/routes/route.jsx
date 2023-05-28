import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Home,
  Level1,
  Level2,
  Level3,
  Login,
  MainLayout,
  Mainpage,
  Register,
} from '../components';

import QuizApp from '../features/Quiz/QuizApp';

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
  const isAuth = Boolean(useSelector((state) => state.auth.token));
  console.log(isAuth);
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
        {
          path: '/main',
          element: isAuth ? <Mainpage /> : <Navigate to="/login" />,
        },
        {
          path: 'level',
          element: isAuth ? <Level1 /> : <Navigate to="/login" />,
        },
        {
          path: 'level2',
          element: isAuth ? <Level2 /> : <Navigate to="/login" />,
        },
        {
          path: 'level3',
          element: isAuth ? <Level3 /> : <Navigate to="/login" />,
        },
        {
          path: 'level/quiz',
          element: isAuth ? <QuizApp /> : <Navigate to="/login" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default RoutesPath;
