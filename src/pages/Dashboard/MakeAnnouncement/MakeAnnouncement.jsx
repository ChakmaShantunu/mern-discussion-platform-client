import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import { useState } from "react";

const MakeAnnouncement = () => {
    const axiosSecure = useAxiosSecure();
    const [imageUrl, setImageUrl] = useState('');

    const handleImageUpload = async e => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);

        try {
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
            setImageUrl(data?.data?.url);
        } catch (error) {
            console.error('Image upload error:', error);
            Swal.fire('Error', 'Image upload failed.', 'error');
        }
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        if (!imageUrl) {
            return Swal.fire("Error", "Please upload an author image", "error");
        }

        const announcementData = {
            ...data,
            authorImage: imageUrl, 
            date: new Date(), 
        };
        try {
            await axiosSecure.post("/announcements", announcementData);
            Swal.fire("Success", "Announcement added!", "success");
            reset();
        } catch (error) {
            Swal.fire("Error", "Failed to add announcement", "error");
        }
    };

    return (
        <div data-aos="fade-right" className="w-full mx-auto bg-base-100 rounded-lg p-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Make Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div>
                    <label className="block font-semibold mb-2">Author Image URL</label>
                    <label className="label cursor-pointer font-semibold">
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs mt-2"
                        />
                    </label>
                </div>

                <div>
                    <label className="block font-semibold mb-2">
                        Author Name <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Author Name"
                        className={`input input-bordered w-full ${errors.authorName ? "input-error" : ""}`}
                        {...register("authorName", { required: "Author Name is required" })}
                    />
                    {errors.authorName && (
                        <p className="text-red-500 mt-1 text-sm">{errors.authorName.message}</p>
                    )}
                </div>

                <div>
                    <label className="block font-semibold mb-2">
                        Title <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Title"
                        className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                        <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block font-semibold mb-2">
                        Description <span className="text-red-600">*</span>
                    </label>
                    <textarea
                        placeholder="Description"
                        rows={6}
                        className={`textarea textarea-bordered w-full ${errors.description ? "textarea-error" : ""}`}
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && (
                        <p className="text-red-500 mt-1 text-sm">{errors.description.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-default w-full py-3 text-lg"
                >
                    Submit Announcement
                </button>
            </form>
        </div>

    );
};

export default MakeAnnouncement;
