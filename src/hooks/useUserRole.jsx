
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();

    const email = user?.email;

    const { data: role = 'user', isLoading, error, refetch } = useQuery({
        queryKey: ["userRole", email],
        queryFn: async () => {
            const encodedEmail = encodeURIComponent(email);
            const res = await axiosSecure.get(`/users/${encodedEmail}/role`);
            return res.data.role;
        },
        enabled: !!email && !authLoading,
        retry: 1,
        staleTime: 5 * 60 * 1000,
    });


    return { role, isLoading: isLoading || authLoading, error, refetch };
};

export default useUserRole;
