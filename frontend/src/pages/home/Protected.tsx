import React, { useEffect } from "react";
import { useAuth } from "../../context/LoginContext";
import { Navigate, Outlet } from "react-router-dom";
import AdminLogin from "../login/AdminLogin";

const Protected = () => {
  const { auth, setAuth, userRole, setUserRole } = useAuth();

  useEffect(() => {
    if (!auth) {
      <Navigate to="/" />;
    }
  }, []);

  return <>{auth ? <Outlet /> : <Navigate to="/" />}</>;
};

export default Protected;
