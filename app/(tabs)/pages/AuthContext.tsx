import React, { createContext, useState, ReactNode } from 'react';
import { useRouter } from 'expo-router';

interface User {
    username: string;
    email: string;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    formFields: {
        username: string;
        email: string;
        password: string;
    };
    setFormField: (field: keyof AuthContextProps['formFields'], value: string) => void;
    resetFormFields: () => void;
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
    const [formFields, setFormFields] = useState({
        username: '',
        email: '',
        password: ''
    });

    const router = useRouter();

    // Function to update form fields (username, email, password)
    const setFormField = (field: keyof typeof formFields, value: string) => {
        setFormFields(prevFields => ({
            ...prevFields,
            [field]: value
        }));
    };

    // Function to reset all form fields to their initial state
    const resetFormFields = () => {
        setFormFields({
            username: '',
            email: '',
            password: ''
        });
    };

    const login = (userData: User) => {
        setIsAuthenticated(true);
        setUser(userData);
        router.push('/pages/dashboard');
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        resetFormFields();  // Reset fields on logout
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            user, 
            formFields, 
            setFormField, 
            resetFormFields, 
            login, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
