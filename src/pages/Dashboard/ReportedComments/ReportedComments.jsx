import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ReportedComments = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reports = [], refetch } = useQuery({
        queryKey: ['reported-comments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reports');
            return res.data;
        }
    });

    const handleDeleteComment = async (commentId) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "Delete this comment permanently?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/comments/${commentId}`);
                Swal.fire('Deleted!', 'Comment has been deleted.', 'success');
                refetch();
            } catch (error) {
                Swal.fire('Error', 'Failed to delete comment.', 'error');
            }
        }
    };

    return (
        <div data-aos="fade-right" className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Reported Comments</h2>

            {reports.length === 0 ? (
                <p className="text-center text-gray-500">No reports found.</p>
            ) : (
                <div className="overflow-x-auto border border-gray-300 rounded shadow">
                    <table className="min-w-[700px] w-full table-auto border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-3 py-2 text-left whitespace-nowrap">Reporter</th>
                                <th className="border px-3 py-2 text-left whitespace-nowrap">Feedback</th>
                                <th className="border px-3 py-2 text-left whitespace-nowrap">Comment</th>
                                <th className="border px-3 py-2 text-left whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, idx) => (
                                <tr key={idx} className="border hover:bg-gray-50">
                                    <td className="border px-3 py-2 max-w-xs break-words">{report.reporterEmail}</td>
                                    <td className="border px-3 py-2 max-w-xs break-words">{report.feedback}</td>
                                    <td className="border px-3 py-2 max-w-xs break-words">{report.commentText}</td>
                                    <td className="border px-3 py-2">
                                        <button
                                            onClick={() => handleDeleteComment(report.commentId)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                        >
                                            Delete
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

export default ReportedComments;
