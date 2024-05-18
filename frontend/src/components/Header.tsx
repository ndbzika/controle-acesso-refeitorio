import { HomeIcon, LogOutIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "./AuthProvider"

export const Header = () => {
  const {logoutAdmin, isLoggedIn} = useAuth();
  return (
    <header className="w-full h-28 bg-green flex justify-between items-center px-20">
      {isLoggedIn() && (<Link to='/admin/dashboard'>
        <HomeIcon size="64" className="text-white cursor-pointer" />
      </Link>)}
      <h1 className="text-5xl text-white">Refeitorio</h1>
      {isLoggedIn() && (<LogOutIcon size="64" className="text-white cursor-pointer" onClick={logoutAdmin} />)}
    </header>
  )
}
