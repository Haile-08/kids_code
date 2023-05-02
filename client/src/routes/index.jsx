import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home } from '../components';
import { publicRoutes } from './Public';
import { protectedRoutes } from './Protected';

function Approute() {
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(isAuth);
  const LandingRoute = [{ path: '/', element: <Home /> }];
  const routes = isAuth ? protectedRoutes : publicRoutes;

  const element = createBrowserRouter([...routes, ...LandingRoute]);
  return (
    <div>
      <RouterProvider router={element} />
    </div>
  );
}

export default Approute;
