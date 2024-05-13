import { PropsWithChildren, useEffect } from "react"
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const admin = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(admin);

    if (admin === null) {
      navigate('/', {replace: true});
    }
  }, [navigate, admin])


  return children;
}
