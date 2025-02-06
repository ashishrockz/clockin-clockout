import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({element}: {element : JSX.Element}) => {
   const {user} = useAuth();
   
   return user?.roleId ? element : <Navigate to='/login'/>
}

export default ProtectedRoute;