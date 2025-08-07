import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';  
import { Link } from 'react-router';

const PostsList = () => {
    const axios = useAxios();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('newest'); // 'newest' or 'popularity'
    const limit = 5;

    const { data = {}, isLoading, isError, error } = useQuery({
        queryKey: ['posts', page, sort],
        queryFn: async () => {
            const res = await axios.get(`/posts?page=${page}&limit=${limit}&sort=${sort}`);
            return res.data;
        },
        keepPreviousData: true
    });

    const posts = data.posts || [];
    const totalPages = Math.ceil((data.totalCount || 0) / limit);

    if (isLoading) return <p className="text-center mt-4">Loading...</p>;

    if (isError) return <p className="text-center mt-4 text-red-500">Error: {error.message}</p>;

    return (
        <div data-aos="fade-up" className="my-24">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold">📢 Forum Posts from Members</h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    See what our members are sharing — ideas, updates, discussions, and announcements.
                </p>
            </div>

            {/* Sort Buttons */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => { setSort('newest'); setPage(1); }}
                    className={`btn ${sort === 'newest' ? 'btn-primary' : 'btn-outline'}`}
                >
                    Newest
                </button>
                <button
                    onClick={() => { setSort('popularity'); setPage(1); }}
                    className={`btn ${sort === 'popularity' ? 'btn-primary' : 'btn-outline'}`}
                >
                    Most Popular
                </button>
            </div>

            {posts.length === 0 && <p className="text-center text-gray-500">No posts found.</p>}

            <div data-aos="fade-right" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {posts.map(post => (
                    <div key={post._id} className="card bg-base-100 shadow-md rounded p-4 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src={post.author?.image}
                                alt={post.author?.name}
                                className="w-10 h-10 rounded-full object-cover"
                                loading="lazy"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                                <p className="text-sm text-gray-500">
                                    {new Date(post.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <p className="mb-2">
                            <strong>Tags: </strong>
                            {post.tags.join(', ')}
                        </p>
                        <p className="mb-1">
                            <strong>Votes:</strong> {post.upVote - post.downVote} (↑ {post.upVote} | ↓ {post.downVote})
                        </p>
                        <p className="mb-1">
                            <strong>Comments:</strong> {post.commentCount}
                        </p>
                        <Link to={`/postDetails/${post._id}`}>
                            <button className='btn btn-default mt-2'>See Details</button>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-8 flex justify-center items-center gap-2">
                <button
                    className="btn"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <span className="btn btn-ghost">Page {page} of {totalPages}</span>
                <button
                    className="btn"
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PostsList;
