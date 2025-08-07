import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import CommentSection from '../CommentList/CommentSection';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton } from 'react-share';

const PostDetails = () => {

    const singlePost = useLoaderData();
    console.log(singlePost);
    const axios = useAxios();
    const { user } = useAuth();

    const {
        _id,
        author,
        title,
        description,
        tags,
        upVote: initialUpVote,
        downVote: initialDownVote,
        createdAt
    } = singlePost || {};

    const [upVote, setUpVote] = useState(initialUpVote || 0)
    const [downVote, setDownVote] = useState(initialDownVote || 0)

    const formattedDate = new Date(createdAt).toLocaleString();
    const shareUrl = `${window.location.origin}/post/${_id}`;

    const handleUpVote = async () => {
        if (!user) {
            return Swal.fire('Unauthorized', 'Please login to upvote.', 'warning');
        }
        try {
            const res = await axios.post(`/post/${_id}/upVote`);
            setUpVote(res.data.upVote)
        } catch (error) {
            
            alert('Failed to upvote');
        }
    }
    const handleDownVote = async () => {
        if (!user) {
            return Swal.fire('Unauthorized', 'Please login to upvote.', 'warning');
        }
        try {
            const res = await axios.post(`/post/${_id}/downVote`);
            setDownVote(res.data.downVote)
        } catch (error) {
            
            alert('Failed to downvote');
        }
    }

    return (
        <div data-aos="fade-up" className="max-w-3xl mx-auto p-6 my-10 bg-base-100 shadow-md border border-gray-200 rounded-lg">
            {/* Author Section */}
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={author?.image}
                    alt={author?.name}
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
                <div>
                    <h2 className="text-lg font-semibold ">{author?.name}</h2>
                    <p className="text-sm ">{author?.email}</p>
                </div>
            </div>

            {/* Post Title */}
            <h1 className="text-2xl font-bold text-info mb-4">{title}</h1>

            {/* Description */}
            <p className=" text-base mb-6 leading-relaxed">{description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {tags?.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {/* Vote & Time */}
            <div className="flex items-center gap-6  text-sm font-medium">
                <button onClick={handleUpVote} className='cursor-pointer'>👍 {upVote}</button>
                <button onClick={handleDownVote} className='cursor-pointer'>👎 {downVote}</button>
                <span>🕒 {formattedDate}</span>
                <div className="dropdown dropdown-end">
                    {user ? (
                        <>
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn m-1"
                            >
                                Share with ⬇️
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                            >
                                <div className="flex justify-center gap-4">
                                    <FacebookShareButton url={shareUrl}>
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                    <LinkedinShareButton url={shareUrl}>
                                        <LinkedinIcon size={32} round />
                                    </LinkedinShareButton>
                                </div>
                            </ul>
                        </>
                    ) : (
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn m-1 cursor-not-allowed opacity-50"
                            title="Login required to share"
                            onClick={() => alert('Please login to share this post')}
                        >
                            Share with ⬇️
                        </div>
                    )}
                </div>


            </div>

            <div>
                <CommentSection postId={_id}></CommentSection>
            </div>
        </div>
    );
};

export default PostDetails;
