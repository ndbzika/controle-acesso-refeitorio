import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
    index: true,
  },
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        Component: AdminLogin,
      },
      {
        path: 'dashboard',
        element: AdminDashboard('caest'),
      },
    ],
  },
]);

export default router;
