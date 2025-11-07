import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  checkSession,
  getMe,
  logout,
  refreshSession,
} from "../services/authService.js";

import { login } from "../services/authService.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLogin = async (data) => {
    const res = await login(data);
    const user = res.data.user;
    if (user) {
      setUser(user);
      setAuthorized(true);
    }
  };

  const register = async (data) => {
    const res = await axios.post("/auth/register", data, {
      withCredentials: true,
    });
    setUser(res.data.user);
  };

  const getLogout = async () => {
    await logout();
    await fetchUser();
    setUser(null);
  };

  const getRefreshSession = async () => {
    await refreshSession();
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      setAuthorized(false);

      const isAuthenticated = await checkSession(); // GET /auth/session

      if (isAuthenticated) {
        const user = await getMe(); // GET /auth/me
        if (user) {
          setUser(user);
          setAuthorized(true);
        }
        console.log("✅ Session valid");
      } else {
        console.log("⚠️ Session invalid, trying refresh...");
        await getRefreshSession();

        const isAuthenticatedAfterRefresh = await checkSession();
        if (isAuthenticatedAfterRefresh) {
          const user = await getMe();
          if (user) {
            setUser(user);
            setAuthorized(true);
          }

          console.log("✅ Session refreshed");
        } else {
          console.log("❌ Refresh failed");
        }
      }
    } catch (err) {
      setLoading(false);
      setAuthorized(false);
      console.error("❌ Session check error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authorized,
        loading,
        getLogin,
        fetchUser,
        register,
        getLogout,
        refreshSession,
      }}
    >
      {loading ? <h1>Завантаження...</h1> : children}
    </AuthContext.Provider>
  );
};
