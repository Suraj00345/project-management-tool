import { useEffect } from "react";
import useAuthStore from "../store/AuthStore";
import LoadingScreen from "./LoadingScreen";

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = redirectTo;
    }
  }, [isAuthenticated, redirectTo]);

  if (!isAuthenticated()) {
    return <LoadingScreen />;
  }

  return children;
};

export default ProtectedRoute;
