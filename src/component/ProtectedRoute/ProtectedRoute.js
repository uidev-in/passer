import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated === "true" ? element : <Navigate to="/" />;
}

export default ProtectedRoute;
