import { HomeIcon, LogOutIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "./AuthProvider"

export const Header = () => {
  const {logoutAdmin} = useAuth();
  return (
    <header className="w-full h-28 bg-green flex justify-between items-center px-20">
      <Link to='/admin/dashboard'>
        <HomeIcon size="64" className="text-white cursor-pointer" />
      </Link>
      <h1 className="text-5xl text-white">Refeitorio</h1>
      <LogOutIcon size="64" className="text-white cursor-pointer" onClick={logoutAdmin} />
    </header>
  )
}
