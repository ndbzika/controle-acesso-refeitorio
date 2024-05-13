import { FormEvent } from "react";
import { Header } from "../../components/Header"
import { useNavigate } from "react-router-dom";
import { useAdminLogin } from "./useAdminLogin";
import { Toaster } from "@/components/ui/toaster";

export const AdminLogin = () => {
  const { loginRef, passwordRef, handleLogin, handleCheckToken } = useAdminLogin();
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
    const hasToken = handleCheckToken();
    if (hasToken)
      navigate("/admin/dashboard");
  }

  return (
    <>
      <Header />
      <main className="w-full h-full flex flex-col justify-center items-center mt-56 sm:flex-row">
        <img src="/IFPB-CZ-logo.png" alt="IFPB Cajazeiras logo" className="min-w-40 mr-24"/>
        <form
          onSubmit={handleSubmit}
          className="w-80"
        >
          <label htmlFor="login">Login</label>
          <input ref={loginRef} type="text" id="login" className="w-80 h-16 border border-black rounded-md mb-4 p-3"/>
          <label htmlFor="password">Senha</label>
          <input ref={passwordRef} type="password" id="password" className="w-80 h-16 border border-black rounded-md mb-10 p-3"/>
          <button className="w-full bg-green text-white font-bold py-4 rounded-lg">Entrar</button>
        </form>
      </main>
      <Toaster/>
    </>
  )
}
