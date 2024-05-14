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
import { Header } from './components/Header';

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
        element:
        <AdminProvider>
          <Header/>
          <AdminLogin/>
        </AdminProvider>,
      },
      {
        path: 'dashboard',
        element:
        <AdminProtectedRoute>
          <Header/>
          <AdminDashboard/>
        </AdminProtectedRoute>,
      },
      {
        path: 'presencas',
        element:
        <AdminProtectedRoute>
          <Header/>
          <Presencas/>
        </AdminProtectedRoute>,
      },
      {
        path: 'turmas',
        element:
        <AdminProtectedRoute>
          <Header/>
          <TurmasPage/>
        </AdminProtectedRoute>,
      },
      {
        path: 'relatorios',
        element:
        <AdminProtectedRoute>
          <Header/>
          <RelatorioPage/>
        </AdminProtectedRoute>
      }
    ],
  },
]);

export default router;
