import { useState } from 'react';
import { registerService } from '../services/authService';

export function useAuth() { 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const register = async (data) => { 
        setLoading(true);
        setError(null);

        try {
            const response = await registerService(data);
            return response;
        } catch (error) {
            setError(error.message || "Error al crear la cuenta");
            throw error;
        } finally { 
            setLoading(false);
        }
    }

    return { register, error, loading}
}