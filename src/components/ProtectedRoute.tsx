import { Navigate, Outlet } from "react-router";
import { getToken } from "../utils/storage";

export default function ProtectedRoute() {
  const token = getToken();

  // No token = not logged in -> redirect to Sign In
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // Token exists -> render whatever child route was requested
  return <Outlet />;
}
