import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../Layouts/LoadingScreen";

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
    return <>{children}</>;
  }

  return <LoadingScreen />;
};

export default AuthGuard;
