import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner/Spinner";

export default function AdminRoute({ children }) {
  const { loggedUser } = useSelector((state) => state.user);

  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token && loggedUser?.data?.role !== "admin") {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (token && loggedUser?.success && loggedUser?.data?.role == "admin") {
    return children;
  }

  return <Spinner />;
}
