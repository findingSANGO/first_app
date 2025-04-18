import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import axios from 'axios';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: async (email: string, password: string) => {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                        email,
                        password,
                    });
                    
                    const { access_token, user } = response.data;
                    
                    set({
                        user,
                        token: access_token,
                        isAuthenticated: true,
                    });
                    
                    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                } catch (error) {
                    throw new Error('Invalid credentials');
                }
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
                delete axios.defaults.headers.common['Authorization'];
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore; 