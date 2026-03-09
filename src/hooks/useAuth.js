import { useState } from 'react';
import { registerService, loginService } from '../services/authService';
import { sileo } from 'sileo';
import { errorRouter } from '../utils/ErrorRouter';

export function useAuth() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const register = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const registerPromise = registerService(data)
            sileo.promise(registerPromise, {
                loading: { title: "Registrando tus datos..." },
                success: { title: "Cuenta creada exitosamente" },
                error: (err) => ({
                    title: "Error",
                    description: errorRouter(err)
                })
            });
            const response = await registerPromise;
            return response;
        } catch (error) {
            console.log(error);
            return null
        } finally {
            setLoading(false);
        }
    }


    const login = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const loginPromise = loginService(data);
            sileo.promise(loginPromise, {
                loading: { title: "Iniciando sesión..." },
                success: { title: "Inicio de sesión exitoso" },
                error: (err) => ({
                    title: "Error",
                    description: errorRouter(err)
                })
            });
            const response = await loginPromise;
            return response;
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { register, login, error, loading }
}