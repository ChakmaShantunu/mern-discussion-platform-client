import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import Swal from "sweetalert2";
import Select from 'react-select';

const AddPost = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [selectedTag, setSelectedTag] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    
    const { data: tagsData = [], isLoading, isError } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tags');
            return res.data;
        },
    });
    


    const tagOptions = tagsData.map(tag => ({
        value: tag,
        label: tag,
    }));



    // Fetch post count for the logged-in user
    const {
        data: postCount = 0,
        isLoading: isPostCountLoading,
        isError: isPostCountError,
        error: postCountError
    } = useQuery({
        queryKey: ['postCount', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/count/${encodeURIComponent(user.email)}`);
            return res.data.count;
        },
        enabled: !!user?.email,
    });

    // Handle image upload to imgbb
    const handleImageUpload = async e => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);

        try {
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
            setImageUrl(data.data.url);
        } catch (error) {
            console.error('Image upload error:', error);
            Swal.fire('Error', 'Image upload failed.', 'error');
        }
    };

    // Form submit handler
    const onSubmit = async data => {
        if (postCount >= 5 && user?.role === 'user') {
            return Swal.fire('Limit Reached', 'You can only post 5 times without a gold membership.', 'warning');
        }

        if (!selectedTag || selectedTag.length === 0) {
            return Swal.fire('Tag Missing', 'Please select at least one tag.', 'warning');
        }

        const post = {
            author: {
                name: user.name || 'Anonymous',
                email: user.email,
                image: imageUrl || user.photoURL || '',
            },
            title: data.title,
            description: data.description,
            tags: selectedTag.map(tag => tag.value),
            upVote: 0,
            downVote: 0,
            createdAt: new Date().toISOString(),
        };

        try {
            const res = await axiosSecure.post('/posts', post);
            if (res.data.insertedId) {
                Swal.fire('Success!', 'Post added successfully.', 'success');
                reset();
                setSelectedTag([]);
                setImageUrl('');
                navigate('/dashboard/myPosts');
            } else {
                Swal.fire('Error', 'Failed to add post.', 'error');
            }
        } catch (error) {
            console.error('Post error:', error);
            Swal.fire('Error', 'Something went wrong!', 'error');
        }
    };

    if (isPostCountLoading) return <p className="text-center mt-10">Checking post limit...</p>;
    if (isPostCountError) return <p className="text-center mt-10 text-red-500">Error: {postCountError.message}</p>;
    if (isLoading) return <p>Loading tags...</p>;
    if (isError) return <p>Error loading tags.</p>;

    return (
        <div data-aos="fade-right" className="max-w-4xl mx-auto bg-base-100 p-8 rounded-lg mt-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Post</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Author Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label font-semibold">Author Name</label>
                        <input
                            type="text"
                            value={user?.name || ''}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="label font-semibold">Author Email</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Post Title */}
                <div>
                    <label className="label font-semibold">Post Title</label>
                    <input
                        type="text"
                        {...register('title', { required: true })}
                        placeholder="Enter your post title"
                        className="input input-bordered w-full"
                    />
                    {errors.title && <p className="text-red-500 mt-1">Title is required</p>}
                </div>

                {/* Post Description */}
                <div>
                    <label className="label font-semibold">Post Description</label>
                    <textarea
                        {...register('description', { required: true })}
                        rows={6}
                        placeholder="Write your post description..."
                        className="textarea textarea-bordered w-full resize-y"
                    />
                    {errors.description && <p className="text-red-500 mt-1">Description is required</p>}
                </div>

                {/* Image Upload */}
                <div className="form-control">
                    <label className="label cursor-pointer font-semibold">
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file-input file-input-bordered file-input-primary w-full max-w-xs mt-2"
                        />
                    </label>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="mt-4 rounded-lg shadow-md mx-auto"
                            style={{ maxWidth: '250px' }}
                        />
                    )}
                </div>

                {/* Tags Select */}
                <div>
                    <label className="label font-semibold">Select Tags</label>
                    <Select
                        options={tagOptions}
                        value={selectedTag}
                        onChange={setSelectedTag}
                        isMulti
                        placeholder="Choose tags"
                        classNamePrefix="react-select"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full text-lg font-semibold py-3">
                    Submit Post
                </button>
            </form>
        </div>

    );
};

export default AddPost;
