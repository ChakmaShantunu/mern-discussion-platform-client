import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import LoadingSpinner from '../../../components/Loader/LoadingSpinner';
import UserDashboard from './UserDashboard';
import MemberDashboard from './MemberDashboard';
import AdminDashboard from './AdminDashboard';
import Forbidden from '../Forbidden/Forbidden';
import MyProfile from '../MyProfile/MyProfile';
import AdminProfile from '../AdminProfile/AdminProfile';

const DashboardHome = () => {
    const { role, isLoading } = useUserRole();

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (role === 'user') {
        return <MyProfile></MyProfile>
    }

    if (role === 'member') {
        return <MyProfile></MyProfile>
    }

    else if (role === 'admin') {
        return <AdminProfile></AdminProfile>
    } else {
        return <Forbidden></Forbidden>
    }
};

export default DashboardHome;