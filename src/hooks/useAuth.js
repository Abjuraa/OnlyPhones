import { useState } from 'react';
import { registerService, loginService } from '../services/authService';

export function useAuth() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const errorRouter = (err) => {
        return (
            err?.response?.data?.message ??
            "Error del servidor"
        )
    }


    const register = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await registerService(data);
            return response;
        } catch (error) {
            setError(errorRouter(error));
            setTimeout(() => setError(null), 3000)
            return null
        } finally {
            setLoading(false);
        }
    }


    const login = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await loginService(data);
            return response;
        } catch (error) {
            setError(errorRouter(error));
            setTimeout(() => setError(null), 3000)
            return null
        } finally {
            setLoading(false);
        }
    }

    return { register, login, error, loading }
}