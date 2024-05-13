import { Admin } from "@/models/Admin";
import { loginService } from "@/services/admin/loginService";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/config/axios";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { jwtDecode } from 'jwt-decode';

type AdminContextType = {
  admin: Admin | null;
  token: string | null;
  loginAdmin: (login: string, password: string) => void;
  logoutAdmin: () => void;
  isLoggedIn: () => boolean;
}

type Props = PropsWithChildren;

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export const AdminProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const {toast} = useToast();
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    const token = localStorage.getItem('token');
    if (admin && token) {
      setAdmin(JSON.parse(admin));
      setToken(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setIsReady(true);
  }, []);

  const dessirializeAdmin = (token: string): Admin => {
    const decodedToken = jwtDecode<Admin>(token);
    console.log(decodedToken);

    return {
      id: decodedToken.id,
      login: decodedToken.login,
      role: decodedToken.role,
    }
  }

  const loginAdmin = async (login: string, password: string) => {
    const admin = await loginService(login, password);
    if (admin) {
      setToken(admin.token);
      const dessirializedAdmin = dessirializeAdmin(admin.token);
      setAdmin(dessirializedAdmin);
      toast({
        title: 'Sucesso',
        description: 'Login realizado com sucesso',
        duration: 3000,
        action: (
          <ToastAction altText="Fechar">Fechar</ToastAction>
        )
      })
      localStorage.setItem('admin', JSON.stringify(dessirializedAdmin));
      localStorage.setItem('token', admin.token);
      navigate('/admin/dashboard');
    }
  }

  const isLoggedIn = () => {
    return !!admin;
  }

  const logoutAdmin = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    setToken(null);
    setAdmin(null);
    navigate('/');
  }

  return (
    <AdminContext.Provider value={{loginAdmin, logoutAdmin, isLoggedIn, admin, token}}>
      {isReady ? children: null}
    </AdminContext.Provider>
  )
}

export const useAuth = () => useContext(AdminContext);
