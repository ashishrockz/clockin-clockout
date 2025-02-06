import { createContext, ReactNode, useContext, useState } from "react";
import { Login } from "../models/login.model";




interface AuthContextType {
    user : Login | null;
    setUser: React.Dispatch<React.SetStateAction<Login | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
   const [user, setUser] = useState<Login| null>(() => {
    const userFromStorage = sessionStorage.getItem("user");
    return userFromStorage ? JSON.parse(userFromStorage) : null;
   });


  return (
    <AuthContext.Provider value={{user, setUser}}>
    {children}
  </AuthContext.Provider>
  )
   
}
export const useAuth = () => {
  const context = useContext(AuthContext);
 
  if (!context) {
    throw new Error("useApiPaths must be used within an ApiProvider");
  }
  return context;
}
 