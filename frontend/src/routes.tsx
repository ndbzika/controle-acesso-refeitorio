import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Presencas } from './pages/admin/AdminPresencas';
import { TurmasPage } from './pages/admin/CAEST/TurmasPage';
import { RelatorioPage } from './pages/admin/CAEST/RelatorioPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminProvider } from './components/AuthProvider';
import { AdminProtectedRoute } from './components/ProtectedRoute/AdminProtectedRoute';

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
        element: <AdminProvider><AdminLogin/></AdminProvider>,
      },
      {
        path: 'dashboard',
        element: <AdminProtectedRoute><AdminDashboard/></AdminProtectedRoute>,
      },
      {
        path: 'presencas',
        element: <AdminProtectedRoute><Presencas/></AdminProtectedRoute>,
      },
      {
        path: 'turmas',
        element: <AdminProtectedRoute><TurmasPage/></AdminProtectedRoute>,
      },
      {
        path: 'relatorios',
        element: <AdminProtectedRoute><RelatorioPage/></AdminProtectedRoute>
      }
    ],
  },
]);

export default router;
