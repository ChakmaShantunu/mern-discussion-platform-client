import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';

const CommentSection = ({ postId, initialComments = [] }) => {
    const { user } = useAuth();
    const axios = useAxios();

    const [commentText, setCommentText] = useState('');
    const [commentList, setCommentList] = useState(initialComments);


    const handleSubmit = async e => {
        e.preventDefault();
        if (!user) {
            return Swal.fire('Unauthorized', 'Please login to comment.', 'warning');
        }

        if (!commentText.trim()) {
            return Swal.fire('Warning', 'Comment cannot be empty', 'warning');
        }

        const newComment = {
            user: user?.name,
            photo: user?.photoURL,
            text: commentText,
            time: new Date().toISOString()
        }

        try {
            const res = await axios.post(`/post/${postId}/comment`, newComment);
            if (res.data.insertedId) {
                setCommentList([newComment, ...commentList])
                setCommentText('')
                Swal.fire('Success', 'Comment added!', 'success');
            } else {
                Swal.fire('Error', 'Failed to add comment.', 'error');
            }
        } catch (error) {
            
            Swal.fire('Error', 'Failed to add comment.', 'error');
        }
        
    }
    return (
        <div className='mt-10 border-t pt-6'>
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            {
                user ? <>
                    <form onSubmit={handleSubmit}>
                        <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} name="" id="" placeholder='Write your comment...' className='w-full border rounded-md p-2' rows={3}></textarea>
                        <button
                            type="submit"
                            className="mt-2 px-4 py-1 rounded btn"
                        >
                            Comment
                        </button>
                    </form>
                </> : (<p className="text-red-500 mb-4">Please log in to comment.</p>)
            }

            {
                commentList.length > 0 ? (
                    commentList.map((comment, index) => (
                        <div key={index} className="flex gap-4 mb-4 mt-6">
                            <img
                                src={comment.commenterPhoto || comment.photo || 'https://i.pravatar.cc/40'}
                                alt={comment.commenterName || comment.user || 'Anonymous'}
                                className="w-10 h-10 rounded-full border"
                            />
                            <div>
                                <p className="text-sm font-semibold">
                                    {comment.commenterName || comment.user || 'Anonymous'}
                                </p>
                                <p className="text-gray-700 text-sm">
                                    {comment.commentText || comment.text}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(comment.createdAt || comment.time).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No comments yet.</p>
                )
            }


        </div>
    );
};

export default CommentSection;