import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaUser, FaPlusCircle, FaClipboardList, FaUserShield, FaUserTie, FaFlag, FaBullhorn } from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';
import QuickPost from '../pages/shared/QuickPost/QuickPost';


const DashboardLayout = () => {
    const { role, isLoading } = useUserRole();
    console.log(role);
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Page content here */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>
            <div data-aos="fade-right" className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 pl-4 space-y-4">
                    {/* Sidebar content here */}
                    <QuickPost></QuickPost>
                    {!isLoading && role === 'user' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/myProfile">My Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addPost">Add Post</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myPosts">My Posts</NavLink>
                            </li>
                        </>
                    )}
                    {!isLoading && role === 'member' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/myProfile">My Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addPost">Add Post</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myPosts">My Posts</NavLink>
                            </li>
                        </>
                    )}


                    {/* admin links */}
                    {!isLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to='/dashboard/adminProfile' className="flex items-center gap-2">
                                    <FaUserTie /> Admin Profile
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashboard/makeAdmin' className="flex items-center gap-2">
                                    <FaUserShield /> Manage Users
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashboard/reportedComments' className="flex items-center gap-2">
                                    <FaFlag /> Reported Comments
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashboard/announcement' className="flex items-center gap-2">
                                    <FaBullhorn /> Make Announcement
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div >
    );
};

export default DashboardLayout;