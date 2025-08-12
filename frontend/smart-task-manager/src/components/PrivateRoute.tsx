// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useContext, type JSX } from "react";
import { AuthContext } from '../context/AuthContext';

interface PrivateRouteProps {
    children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const auth = useContext(AuthContext);

    // If no token, redirect to login
    if (!auth?.token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}