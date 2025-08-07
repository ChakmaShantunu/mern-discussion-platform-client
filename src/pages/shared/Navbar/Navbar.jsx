import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import logo from '../../../assets/images/logo.jpg'

const Navbar = () => {
    const { user, logOut, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const [theme, setTheme] = useState("light");


    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const defaultTheme = prefersDark ? "dark" : "light";
            setTheme(defaultTheme);
            document.documentElement.setAttribute("data-theme", defaultTheme);
        }
    }, []);


    const handleToggle = (e) => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };
    const navItems = <>
        <li><NavLink to='/' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</NavLink></li>
        <li><NavLink to='/membership'>Membership</NavLink></li>

    </>

    const axiosSecure = useAxiosSecure();

    const { data: announcements = [] } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            console.log(res.data);
            return res.data;

        }
    });
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className='flex items-center justify-center gap-2'>
                    <img className='hidden w-[60px] md:block lg:block' src={logo} alt="" />
                    <p className="text-xl font-bold hidden md:block lg:block">QuickPost.io</p>
                </Link>

                {/* <Link to='/' className="btn btn-ghost text-xl hidden md:block lg:block">QuickPost.io</Link> */}
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end space-x-4">
                <label className="flex cursor-pointer gap-2 mr-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <path
                            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <input type="checkbox" className="toggle theme-controller" onChange={handleToggle} checked={theme === 'dark'} />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </label>
                <Link to="/">
                    <div className="relative">
                        <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 17h5l-1.405-1.405M19 13V7a7 7 0 10-14 0v6l-1.405 1.405M4 17h16"
                            />
                        </svg>
                        {announcements.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                                {announcements.length}
                            </span>
                        )}
                    </div>
                </Link>

                {!loading ? (
                    user ? (
                        <>
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                            >
                                <div className='hidden md:block'>
                                    {/* Avatar */}
                                    <img
                                        className='rounded-full'
                                        referrerPolicy='no-referrer'
                                        src={user?.image || user?.photoURL || 'https://i.ibb.co/2kR8vG5/default-user.png'}
                                        alt='profile'
                                        height='30'
                                        width='30'
                                    />
                                </div>
                                {isOpen && (
                                    <div data-aos="zoom-in-down" className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-base-100 overflow-hidden right-0 top-12 text-sm'>
                                        <div className='flex flex-col cursor-pointer'>
                                            <h2 className='text-center my-4 font-semibold'>{user?.name || 'User'}</h2>
                                            <Link
                                                to='/dashboard'
                                                className='px-4 py-3 hover:bg-base-300 transition font-semibold'
                                            >
                                                Dashboard
                                            </Link>
                                            <div
                                                onClick={logOut}
                                                className='px-4 py-3 hover:bg-base-300 transition font-semibold cursor-pointer'
                                            >
                                                Logout
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link to='/joinUs'>
                            <button className='btn btn-neutral'>Join Us</button>
                        </Link>
                    )
                ) : (
                    <div className="loading loading-spinner loading-md"></div>
                )}



            </div>
        </div>
    );
};

export default Navbar;