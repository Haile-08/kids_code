import React from 'react';

import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home } from '../components';

function Approute() {
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(isAuth);

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default Approute;
