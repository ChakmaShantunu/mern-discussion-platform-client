import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch users with searchTerm as query
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users', searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${searchTerm}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const handleMakeAdmin = async (id) => {
        try {
            const res = await axiosSecure.patch(`/users/admin/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire('Success!', 'User is now an admin', 'success');
                refetch();
            }
        } catch {
            Swal.fire('Error!', 'Failed to make admin', 'error');
        }
    };

    return (
        <div data-aos="fade-right" className="w-full mx-auto bg-base-100 rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center lg:text-left">
                Manage Users
            </h2>

            {/* Search */}
            <div className="mb-4 flex justify-center lg:justify-start">
                <input
                    type="text"
                    placeholder="Search by username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>

            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : users.length === 0 ? (
                <p className="text-center">No users found.</p>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="table w-full min-w-[700px]">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Subscription Status</th>
                                    <th>Role</th>
                                    <th>Make Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role === "admin"
                                                ? "Admin"
                                                : user.role === "member"
                                                    ? "Membership"
                                                    : "Free"}
                                        </td>
                                        <td className="capitalize">{user.role}</td>
                                        <td>
                                            {user.role === "admin" ? (
                                                <span className="text-green-600 font-semibold">Admin</span>
                                            ) : (
                                                <button
                                                    onClick={() => handleMakeAdmin(user._id)}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {users.map(user => (
                            <div
                                key={user._id}
                                className="p-4 bg-base-100 rounded-lg shadow space-y-1"
                            >
                                <p>
                                    <strong>Name: </strong> {user.name}
                                </p>
                                <p>
                                    <strong>Email: </strong> {user.email}
                                </p>
                                <p>
                                    <strong>Subscription: </strong>{" "}
                                    {user.role === "admin"
                                        ? "Admin"
                                        : user.role === "member"
                                            ? "Membership"
                                            : "Free"}
                                </p>
                                <p className="capitalize">
                                    <strong>Role: </strong> {user.role}
                                </p>
                                <div>
                                    {user.role === "admin" ? (
                                        <span className="text-green-600 font-semibold">Admin</span>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user._id)}
                                            className="btn btn-sm btn-info"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageUsers;
