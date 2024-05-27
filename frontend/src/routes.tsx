import { createBrowserRouter } from 'react-router-dom';
import { AdminProvider } from './components/AuthProvider';
import { Header } from './components/Header';
import { AdminProtectedRoute } from './components/ProtectedRoute/AdminProtectedRoute';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLogin } from './pages/admin/AdminLogin';
import { Presencas } from './pages/admin/AdminPresencas';
import { RelatorioPage } from './pages/admin/CAEST/RelatorioPage';
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
