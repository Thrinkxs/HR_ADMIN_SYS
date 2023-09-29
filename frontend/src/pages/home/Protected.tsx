import React, { useEffect } from "react";
import { useAuth } from "../../context/LoginContext";
import { Navigate, Outlet } from "react-router-dom";
import AdminLogin from "../login/AdminLogin";

const Protected = () => {
  const { auth, setAuth, userRole, setUserRole } = useAuth();

  // const navigate = useNavigate();
  console.log("protected routes says", auth);
  useEffect(() => {
    if (!auth || userRole !== "admin") {
      <Navigate to="/" />;
    }
  }, []);

  return <>{auth && userRole === "admin" ? <Outlet /> : <Navigate to="/" />}</>;
};

export default Protected;
