import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { getSessionFromLocalStorage } from "../utils/auth-token";
import { refreshSession } from "../utils/api-client";

let currentSession = getSessionFromLocalStorage();

const AuthProvider = ({ children }) => {
  const { login, logout } = useAuthStore((state) => state);

  useEffect(() => {
    if (!currentSession) return;

    const fn = async () => {
      try {
        const response = await refreshSession();
        if (!response.token) return logout();
        login(response.user, response.token);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        logout();
      }
    };

    fn();
  }, [login, logout]);

  return <>{children}</>;
};

export default AuthProvider;
