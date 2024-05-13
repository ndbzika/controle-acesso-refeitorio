import { useAuth } from "@/components/AuthProvider";
import { useRef } from "react";

export const useAdminLogin = () => {
  const {loginAdmin} = useAuth();
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


  const handleLogin = async () => {
    const login = loginRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    loginAdmin(login, password);
  }

  const handleCheckToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return true;
  }

  return {
    loginRef,
    passwordRef,
    handleLogin,
    handleCheckToken
  }
}
