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
  Level4,
  Login,
  MainLayout,
  Mainpage,
  Register,
  QuizApp,
  Level5,
  Level6,
  Level7,
  About,
} from '../components';

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
          path: '/signup',
          element: <Register />,
        },
        {
          path: '/main',
          element: isAuth ? <Mainpage /> : <Navigate to="/login" />,
        },
        {
          path: '/level',
          element: isAuth ? <Level1 /> : <Navigate to="/login" />,
        },
        {
          path: '/level2',
          element: isAuth ? <Level2 /> : <Navigate to="/login" />,
        },
        {
          path: '/level3',
          element: isAuth ? <Level3 /> : <Navigate to="/login" />,
        },
        {
          path: '/level4',
          element: isAuth ? <Level4 /> : <Navigate to="/login" />,
        },
        {
          path: '/level5',
          element: isAuth ? <Level5 /> : <Navigate to="/login" />,
        },
        {
          path: '/level6',
          element: isAuth ? <Level6 /> : <Navigate to="/login" />,
        },
        {
          path: '/level7',
          element: isAuth ? <Level7 /> : <Navigate to="/login" />,
        },
        {
          path: '/quiz',
          element: isAuth ? <QuizApp /> : <Navigate to="/login" />,
        },
        {
          path: '/about',
          element: <About />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default RoutesPath;
