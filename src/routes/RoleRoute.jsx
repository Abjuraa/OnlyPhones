import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRoute({ allowedRoles }) {
    const { user, loading } = useAuth();

    if (loading) return <p>Cargando........</p>;

    if (!user) return <Navigate to="/login" />

    if (allowedRoles.includes(user.role)) return <Navigate to="/403" />

    return <Outlet />
}
