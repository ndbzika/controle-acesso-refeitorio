import { loginService } from "@/services/admin/loginService";
import { useRef } from "react";

export const useAdminLogin = () => {
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    const login = loginRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const res = loginService({ login, password });
    res.then((data) => {
      localStorage.setItem('token', data.token);
    }).catch((err) => {
      console.error(err);
    });
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
    handleCheckToken,
  }
}
