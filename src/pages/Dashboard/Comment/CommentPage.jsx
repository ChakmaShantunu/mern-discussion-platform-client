import React, { useState } from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const feedbackOptions = [
    'Spam or misleading',
    'Offensive content',
    'Other',
];

const CommentPage = () => {
    const { user } = useAuth();
    const { postId } = useParams();
    const axiosInstance = useAxios();

    const [feedbacks, setFeedbacks] = useState({}); // { commentId: feedbackValue }
    const [reportedComments, setReportedComments] = useState(new Set()); // reported comment IDs

    const {
        data: comments = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/comments/${postId}`);
            return res.data;
        },
        enabled: !!postId,
    });

    const handleFeedbackChange = (commentId, value) => {
        setFeedbacks(prev => ({ ...prev, [commentId]: value }));
    };

    const handleReport = async (commentId) => {
        const feedback = feedbacks[commentId];
        if (!feedback) return;

        try {
            await axiosInstance.post('/reports', {
                commentId,
                feedback,
                reporterEmail: user?.email
            });

            setReportedComments(prev => new Set(prev).add(commentId));
            Swal.fire('Reported!', 'Thank you for your feedback.', 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to report comment.', 'error');
        }
    };

    // ছোট কমেন্ট ২০ ক্যারেক্টার পর্যন্ত দেখাবে, বেশি হলে ellipsis দিবে
    const shortenText = (text) => {
        if (text.length <= 20) return text;
        return text.slice(0, 20) + '...';
    };

    if (isLoading) return <p className="text-center mt-6">Loading comments...</p>;
    if (isError) return <p className="text-center mt-6 text-red-500">Error: {error.message}</p>;

    return (
        <div data-aos="fade-up" className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Comments for Post {postId}</h2>

            {comments.length === 0 && <p>No comments yet.</p>}

            {comments.length > 0 && (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-base-100">
                            <th className="border border-gray-300 px-3 py-2 text-left">Name</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">Comment</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">Feedback</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map(comment => {
                            const commentId = comment._id || comment.id;
                            const commentText = comment.commentText || comment.text || '';
                            const isReported = reportedComments.has(commentId);
                            const feedback = feedbacks[commentId] || '';

                            return (
                                <tr key={commentId} className="border border-gray-300">
                                    <td className="border border-gray-300 px-3 py-2">{comment.commenterName || 'Unknown'}</td>
                                    <td className="border border-gray-300 px-3 py-2" title={commentText}>
                                        {shortenText(commentText)}
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                        <select
                                            className="border rounded px-2 py-1"
                                            value={feedback}
                                            onChange={(e) => handleFeedbackChange(commentId, e.target.value)}
                                            disabled={isReported}
                                        >
                                            <option value="">Select feedback</option>
                                            {feedbackOptions.map((option, idx) => (
                                                <option key={idx} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border border-gray-300 px-3 py-2">
                                        <button
                                            disabled={!feedback || isReported}
                                            onClick={() => handleReport(commentId)}
                                            className={`px-3 py-1 rounded text-white ${!feedback || isReported ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                                        >
                                            Report
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CommentPage;
