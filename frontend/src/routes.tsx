import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Presencas } from './pages/admin/AdminPresencas';
import { TurmasPage } from './pages/admin/CAEST/TurmasPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    index: true,
  },
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        element: <AdminLogin></AdminLogin>,
      },
      {
        path: 'dashboard',
        element: <AdminDashboard role='caest'></AdminDashboard>,
      },
      {
        path: 'presencas',
        element: <Presencas></Presencas>,
      },
      {
        path: 'turmas',
        element: <TurmasPage></TurmasPage>,
      }
    ],
  },
]);

export default router;
