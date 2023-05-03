import { Error, Home, Login, Register } from '../components';

const protectedRoutes = [
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
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
        element: <Register />,
      },
    ],
  },
];

export default protectedRoutes;
