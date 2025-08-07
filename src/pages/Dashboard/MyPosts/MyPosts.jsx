import React from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaCommentAlt, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';

const MyPosts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: posts = [], isError } = useQuery({
        queryKey: ['myPosts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`posts/user/${user.email}`)
            return res.data
        }
    })


    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/posts/${id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'Post has been deleted.', 'success');

                }
            } catch (error) {
                Swal.fire('Error', 'Failed to delete post.', 'error', error);
            }
        }

    }

    if (isLoading) return <div className="text-center my-10">Loading your posts...</div>;
    if (isError) return <div className="text-center text-red-500">Failed to load posts.</div>;
    return (
        <div data-aos="fade-right" className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">My Posts</h2>

            {posts.length === 0 ? (
                <p className="text-center text-gray-500">You have not posted anything yet.</p>
            ) : (
                <div className="w-full overflow-x-auto rounded-lg shadow-sm">
                    <table className="table table-zebra w-full min-w-[600px]">
                        <thead className="bg-base-300">
                            <tr>
                                <th>#</th>
                                <th>Post Title</th>
                                <th>Votes</th>
                                <th>Comment</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, index) => (
                                <tr key={post._id}>
                                    <td>{index + 1}</td>
                                    <td>{post.title}</td>
                                    <td>{(post.upVote || 0) - (post.downVote || 0)}</td>
                                    <td>
                                        <Link to={`/comments/${post._id}`}>
                                            <button className="btn btn-sm btn-info text-white">
                                                <FaCommentAlt />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="btn btn-sm btn-error text-white"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
};

export default MyPosts;