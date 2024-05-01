import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { AdminLogin } from './pages/admin/AdminLogin';

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
    ],
  },
]);

export default router;
