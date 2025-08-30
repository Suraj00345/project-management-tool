import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingScreen from "../layouts/LoadingScreen";

const AuthGuard = ({ children }) => {
  const authStatus = useAuthStore((state) => state.authStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === "UNAUTHENTICATED") {
      navigate("/login", { replace: true });
    }
  }, [authStatus, navigate]);

  if (authStatus === "LOADING") {
    return <LoadingScreen />;
  }

  if (authStatus === "AUTHENTICATED") {
    return children ? children : <Outlet />;
  }

  return <LoadingScreen />;
};

export default AuthGuard;
