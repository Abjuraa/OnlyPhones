import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
    const { user, loading } = useAuth();
    const token = localStorage.getItem("tokenOnlyPhones")

    if (loading) return <p>Loading ...</p>

    if (!token) {
        return <Navigate to="/login" />
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />;
}