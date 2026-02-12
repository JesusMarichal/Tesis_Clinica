import axios from 'axios';
import type { AuthResponse } from '../types';

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

export const authService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
            email,
            password,
        });
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken() {
        return localStorage.getItem('token');
    },

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};
