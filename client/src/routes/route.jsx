import React from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Error, Home, Login, Register } from '../components';

function Route() {
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(isAuth);
  const routers =
    createBrowserRouter[
      {
        path: '/',
        element: <Home />,
        errorElement: <Error />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
        ],
      }
    ];
  return (
    <div>
      <RouterProvider router={routers} />
    </div>
  );
}

export default Route;
