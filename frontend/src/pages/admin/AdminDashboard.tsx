import { useAuth } from "@/components/AuthProvider"
import { Cards } from "../../components/AdminCards"
import { Header } from "../../components/Header"

export const AdminDashboard = () => {
  const {admin} = useAuth();
  return (
    <>
      <Header />
      <main>
        <h2 className="mt-28 ml-32 mb-32 text-5xl font-medium">
          Menu - <span className="italic">{admin!.role.toUpperCase()}</span>
        </h2>

        <div>
          <Cards role='caest' />
        </div>
      </main>
    </>
  )
}
