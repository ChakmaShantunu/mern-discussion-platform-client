import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import LoadingSpinner from '../components/Loader/LoadingSpinner';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    console.log(user.role);
    const { role, isLoading } = useUserRole();
    const location = useLocation();

    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to='/forbidden'></Navigate>
    }


    return children;
};

export default AdminRoute;