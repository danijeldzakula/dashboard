import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../../context/useApp";

export default function ProtectedRoute({ children, redirectPath }) {
  const { loggedIn } = useApp();

  if (!loggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
