import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../components/Loader/LoadingSpinner';

const MemberRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (!user) {
        return <Navigate state={{ from: location.pathname }} to='/forbidden'></Navigate>
    }
    return children;
};

export default MemberRoute;