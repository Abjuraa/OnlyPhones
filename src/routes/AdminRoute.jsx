import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
    const { isAuthenticated, loading, role } = useAuth();

    if (loading) return <p>Loading ...</p>

    if (!isAuthenticated) {
        return <Navigate to="" replace></Navigate>
    }

    if (role !== "ADMIN") {
        return <Navigate to="" replace></Navigate>
    }

    return <Outlet />;
}