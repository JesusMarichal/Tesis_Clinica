import { useState, useCallback } from 'react';
import { authService } from '../services/authService';
import type { User } from '../types';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(authService.getUser());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async (email: string, pass: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.login(email, pass);
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return data;
        } catch (err: any) {
            const message = err.response?.data?.message || 'Error de conexión';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
    }, []);

    return {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
    };
};
