import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRoute({ allowedRoles }) {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!allowedRoles.includes(role)) return <Navigate to="/not-authorized" />;

    return <Outlet />;
}
