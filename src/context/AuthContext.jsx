import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const setUSerFromToken = (token) => {
        try {
            const decoded = jwtDecode(token);

            if (decoded.exp * 1000 < Date.now()) {
                console.warn("El token esta expirado, eliminando...");
                logout();
                return null;
            }

            const dataUser = {
                email: decoded.sub,
                rol: decoded.rol
            }

            setUser(dataUser);
            return dataUser
        } catch (err) {
            console.error("Token invalido. eliminando");
            logout();
            return null;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("tokenOnlyPhones")

        if (token) {
            setUSerFromToken(token);
        } else (
            setUser(null)
        )

        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem("tokenOnlyPhones", token);
        return setUSerFromToken(token)
    }


    const logout = () => {
        localStorage.removeItem("tokenOnlyPhones");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);