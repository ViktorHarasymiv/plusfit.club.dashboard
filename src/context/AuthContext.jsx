import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkSession,
  loginRequest,
  logoutRequest,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initSession = async () => {
      try {
        const data = await checkSession();
        console.log(data);

        setHasAccess(true);
        setUser(data.user.name);
      } catch {
        setHasAccess(false);
        setUser(null);
      }
    };
    initSession();
  }, []);

  const login = async (email, password) => {
    const result = await loginRequest(email, password);
    setHasAccess(true);
    setUser(result.data.userName);
  };

  const logout = async () => {
    navigate("/");
    setHasAccess(false);
    setUser(null);
    await logoutRequest();
  };

  return (
    <AuthContext.Provider value={{ logout, login, user, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
