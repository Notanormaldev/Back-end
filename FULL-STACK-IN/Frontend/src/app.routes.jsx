import { createBrowserRouter, Navigate } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/posts/pages/Feed";
import Createpost from "./features/posts/pages/Createpost";
import { useAuth } from "./features/auth/hooks/auth.hook";

const ProtectedRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const token = localStorage.getItem("token");

    if (loading) {
        return <div>Loading...</div>;
    }

    return token && user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? <Navigate to="/" /> : children;
};

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <PublicRoute><Login /></PublicRoute>
    },
    {
        path: '/register',
        element: <PublicRoute><Register /></PublicRoute>
    },
    {
        path: '/',
        element: <ProtectedRoute><Feed /></ProtectedRoute>
    },
    {
        path: '/createpost',
        element: <ProtectedRoute><Createpost /></ProtectedRoute>
    }
]);