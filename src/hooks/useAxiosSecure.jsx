import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    
    const navigate = useNavigate();

    useEffect(() => {
        // Request interceptor
        const requestInterceptor = axiosSecure.interceptors.request.use(config => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user?.accessToken}`;
            }
            return config;
        }, error => {
            return Promise.reject(error);
        });

        // Response interceptor
        const responseInterceptor = axiosSecure.interceptors.response.use(
            res => res,
            error => {
                const status = error.response?.status;
                console.log('inside response interceptor', status);

                if (status === 403) {
                    navigate('/forbidden');
                } else if (status === 401) {
                    logOut()
                        .then(() => {
                            navigate('/joinUs');
                        })
                        .catch(() => { });
                }
                return Promise.reject(error);
            }
        );

        
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
