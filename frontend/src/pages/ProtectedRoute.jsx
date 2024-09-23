import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { state, getCurrentUser } = useAuth();
  const { user, isLoading } = state;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  // Redirect to login if no user is found
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
