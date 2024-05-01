import GoogleButton from "react-google-button"
import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <img src="/IFPB-CZ-logo.png" alt="IFPB Cajazeiras logo" className="min-w-40 mb-56"/>
      <div>
        <GoogleButton
          onClick={() => {
            console.log("Google login clicked")
          }}
          type="light"
          className="mb-24 font-bold"
          label="Entrar com Google"
        >
          Logar com google
        </GoogleButton>
        <Link
          to="/admin/login"
          className="text-center w-full text-[#6D6D6D] text-base"
        >
          Login como adminstrador
        </Link>
      </div>
    </main>
  )
}
