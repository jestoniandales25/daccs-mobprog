import React, { createContext, useState, ReactNode } from 'react';
import { useRouter } from 'expo-router';

interface User {
    username: string;
    email: string;
}
interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const login = (userData: User) => {
        setIsAuthenticated(true);
        setUser(userData);
        router.push('/pages/dashboard');
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
