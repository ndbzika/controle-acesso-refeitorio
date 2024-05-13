import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { ILoginServiceResponse, loginService } from "@/services/admin/loginService";
import { useRef, useState } from "react";

export const useAdminLogin = () => {
  const { toast } = useToast();
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState('');

  const handleLogin = async () => {
    const login = loginRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const res: ILoginServiceResponse = await loginService({ login, password });

    if (res?.token) {
      toast({
        title: 'Sucesso',
        description: 'Login realizado com sucesso',
        duration: 3000,
        action: (
          <ToastAction altText="Fechar">Fechar</ToastAction>
        )
      })
      localStorage.setItem('token', res.token);
      return;
    }

    if (res?.message) {
      setMessages(res.message);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: res.message,
        duration: 9000,
        action: (
          <ToastAction altText="Fechar">Fechar</ToastAction>
        )
      })
      return;
    }

    if (res?.error || res?.error === null) {
      setMessages('Erro ao realizar login');
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Erro ao realizar login',
        duration: 9000,
        action: (
          <ToastAction altText="Fechar">Fechar</ToastAction>
        )
      })
      return;
    }

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
    messages
  }
}
