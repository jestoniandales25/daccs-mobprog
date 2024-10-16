import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { Alert } from 'react-native';

interface User {
    email: string | null;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    formFields: {
        email: string;
        password: string;
    };
    setFormField: (field: keyof AuthContextProps['formFields'], value: string) => void;
    resetFormFields: () => void;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    });

    const router = useRouter();

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({ email: firebaseUser.email });
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);


    const setFormField = (field: keyof typeof formFields, value: string) => {
        setFormFields(prevFields => ({
            ...prevFields,
            [field]: value
        }));
    };


    const resetFormFields = () => {
        setFormFields({
            email: '',
            password: ''
        });
    };


    const login = async () => {
        try {
            const { email, password } = formFields;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser({ email: userCredential.user.email });
            setIsAuthenticated(true);
            router.push('/pages/dashboard'); 
        } catch (error) {
            console.error('Login failed:', error);

        }
    };


    const logout = async () => {
        try {
            await signOut(auth);
            setIsAuthenticated(false);
            setUser(null);
            resetFormFields(); 
            router.push('/'); 
        } catch (error) {
            Alert.alert('Error', 'Failed to log out. Please try again.');

        }
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
