import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Badge from '../../shared/Badge/Badge';
import { useQuery } from '@tanstack/react-query';

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Query: User profile
    const {
        data: profile,
        isLoading: isProfileLoading,
        isError: isProfileError,
        error: profileError,
    } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Query: Recent posts
    const {
        data: recentPosts = [],
        isLoading: isPostsLoading,
        isError: isPostsError,
        error: postsError,
    } = useQuery({
        queryKey: ['recentPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/recent/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isProfileLoading || isPostsLoading) {
        return <p className="text-center mt-6">Loading profile...</p>;
    }

    if (isProfileError || isPostsError) {
        return (
            <p className="text-center mt-6 text-red-500">
                Error: {profileError?.message || postsError?.message}
            </p>
        );
    }

    return (
        <div data-aos="fade-right" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-base-200 rounded-xl shadow-lg mt-10">
            {profile && (
                <div className="flex flex-col md:flex-row items-center md:items-start md:gap-8 text-center md:text-left">
                    {/* Profile Info */}
                    <div className="flex-shrink-0">
                        <img
                            src={profile.photoURL}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mx-auto md:mx-0 border-4 border-primary"
                        />
                    </div>
                    <div className="mt-4 md:mt-0 space-y-2">
                        <h2 className="text-3xl font-bold">{profile.name}</h2>
                        <p className="text-lg text-gray-500">{profile.email}</p>
                        <Badge role={profile.role} badge={profile.badge}></Badge>
                    </div>
                </div>
            )}

            {/* Recent Posts */}
            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4">Recent Posts</h3>
                <div className="space-y-4">
                    {recentPosts.map((post) => (
                        <div
                            key={post._id}
                            className="p-4 bg-base-100 rounded-lg shadow transition hover:shadow-md"
                        >
                            <h4 className="text-xl font-bold">{post.title}</h4>
                            <p className="text-gray-600">{post.description}</p>
                            <div className="text-sm text-gray-400 mt-1">
                                Tags: {post.tags?.join(', ') || 'N/A'}
                            </div>
                        </div>
                    ))}
                    {recentPosts.length === 0 && (
                        <p className="text-gray-500 text-center">No posts found.</p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default MyProfile;
