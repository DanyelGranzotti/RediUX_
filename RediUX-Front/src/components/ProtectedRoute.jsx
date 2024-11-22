import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, token } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp <= currentTimestamp) {
          toast.error("Sua sessão expirou. Por favor, faça login novamente.");
        }
      } else {
        toast.error("Você não está autenticado. Por favor, faça login.");
      }
    }
  }, [loading, isAuthenticated, token]);

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
