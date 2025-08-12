/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode, useEffect } from "react";

import { useNavigate } from "react-router-dom";

//1. Define the shape of the AuthContext
interface AuthContextType {
    token: string | null;
    isLoggedIn: boolean;
    setToken: (token: string) => void;
    logout: () => void;
}

// 2. Create the context with default empty values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. AuthProvider to wrap the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });

    const navigate = useNavigate();

    // Helper: save token to both state and localStorage
    const setToken = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setTokenState(newToken);
    };

    //Logout function clears token and redirects to login
    const logout = () => {
        localStorage.removeItem('token');
        setTokenState(null);
        navigate('/login');
    };

    //If token is removed manually, force logout 
    useEffect(() => {
        const stored = localStorage.getItem('token');
        if (!stored) {
            setTokenState(null);
        }
    }, []);

    const value: AuthContextType = {
        token,
        isLoggedIn: !!token,
        setToken,
        logout
    };

    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};


