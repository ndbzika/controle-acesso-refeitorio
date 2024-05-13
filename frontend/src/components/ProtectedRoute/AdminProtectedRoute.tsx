import { ProtectedRoute } from "."
import { AdminProvider } from "../AuthProvider"

export const AdminProtectedRoute = ({children}: React.PropsWithChildren) => {
  return (
    <AdminProvider>
      <ProtectedRoute>
        {children}
      </ProtectedRoute>
    </AdminProvider>
  )
}
