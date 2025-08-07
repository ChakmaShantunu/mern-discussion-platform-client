import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AdminProfile = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const [tagInput, setTagInput] = useState('');
    const [message, setMessage] = useState('');

    const adminEmail = user?.email;

    // Admin Info
    const { data: adminInfo, isLoading: adminLoading } = useQuery({
        queryKey: ['adminInfo', adminEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${adminEmail}`);
            return res.data;
        },
        enabled: !!adminEmail,
    });

    // Stats
    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/stats');
            return res.data;
        },
    });

    // All Tags
    const { data: tags = [], refetch } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tags');
            return res.data;
        },
    });

    // Add Tag
    const handleAddTag = async (e) => {
        e.preventDefault();
        if (!tagInput.trim()) return;

        try {
            await axiosSecure.post('/tags', { tag: tagInput.trim().toLowerCase() });
            setMessage(`✅ Tag "${tagInput.trim()}" added successfully`);
            setTagInput('');
            refetch();
        } catch (error) {
            setMessage('❌ Failed to add tag');
        }
    };

    if (adminLoading || statsLoading) return <p>Loading...</p>;

    const pieData = [
        { name: 'Posts', value: stats?.posts || 0 },
        { name: 'Comments', value: stats?.comments || 0 },
        { name: 'Users', value: stats?.users || 0 },
    ];

    return (
        <div data-aos="fade-right" className="max-w-5xl mx-auto px-4 py-6 bg-base-100 rounded-lg shadow">
            <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Admin Profile</h2>

            {/* Profile Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                <img
                    src={adminInfo?.photoURL || 'https://via.placeholder.com/100'}
                    alt="Admin"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div className="text-center sm:text-left">
                    <p className="text-xl font-semibold">{adminInfo?.name}</p>
                    <p>{adminInfo?.email}</p>
                </div>
            </div>

            {/* Site Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <ul className="text-lg space-y-2">
                    <li>📌 Total Posts: {stats?.posts}</li>
                    <li>💬 Total Comments: {stats?.comments}</li>
                    <li>👥 Total Users: {stats?.users}</li>
                </ul>

                <div className="flex justify-center">
                    <PieChart width={300} height={300}>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>

            {/* Add Tag */}
            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4 text-center md:text-left">Add New Tag</h3>
                <form onSubmit={handleAddTag} className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="text"
                        placeholder="e.g., javascript"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded w-full sm:flex-1"
                    />
                    <button
                        type="submit"
                        className="bg-info px-6 py-2 rounded hover:bg-info w-full sm:w-auto"
                    >
                        Add Tag
                    </button>
                </form>
                {message && <p className="mt-2 text-center sm:text-left">{message}</p>}
            </div>

            {/* Tag List */}
            <div className="mt-8">
                <h4 className="text-xl font-semibold mb-2 text-center md:text-left">Existing Tags</h4>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {tags.map((tag) => (
                        <span
                            key={tag._id}
                            className="bg-base-300 px-3 py-1 rounded-full text-sm"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default AdminProfile;
