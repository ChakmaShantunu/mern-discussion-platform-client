import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import useAxios from '../../../hooks/useAxios';
import axios from 'axios';

const Register = () => {
    const axiosInstance = useAxios();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, setUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/'

    const onSubmit = data => {
        console.log(data);
        console.log(createUser);
        createUser(data.email, data.password)
            .then(async (result) => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    email: data.email,
                    name: data.name,
                    password: data.password,
                    photoURL: profilePic,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/users', userInfo)
                console.log(userRes.data);

                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('Profile Updated');
                        navigate(from);
                        toast.success("Register Successful")
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleImageUpload = async e => {
        e.preventDefault();
        const image = e.target.files[0];
        console.log(image);
        const formData = new FormData();
        formData.append('image', image)

        const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
        setProfilePic(data.data.url)
    }
    return (
        <section data-aos="fade-up" className="p-6 flex items-center justify-center">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h3 className="text-2xl font-bold text-center pt-8">Create an Account!</h3>
                    <p className='text-xs text-center mt-2'>Join now to streamline your experience from day one</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">


                            {/* Name Field */}
                            <label className="label">Your Name</label>
                            <input type="text" {...register('name', { required: true })} className="input" placeholder="Name" />
                            {
                                errors.name?.type === 'required' && (<p className='text-red-500'>Name is required</p>)
                            }

                            {/* image field */}
                            <label className="label">Upload Image</label>
                            <input type="file" onChange={handleImageUpload} className="input" placeholder="Your Profile image" />



                            {/* Email field */}
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                            {
                                errors.email?.type === 'required' && (<p className='text-red-500'>Email is required</p>)
                            }



                            {/* Password field */}
                            <label className="label">Password</label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                })}
                                className="input"
                                placeholder="Password"
                            />

                            {errors.password?.type === 'required' && (
                                <p className="text-red-500">Password is required</p>
                            )}

                            {errors.password?.type === 'minLength' && (
                                <p className="text-red-500">Password must be at least 6 characters</p>
                            )}

                            {errors.password?.type === 'maxLength' && (
                                <p className="text-red-500">Password must be under 20 characters</p>
                            )}

                            {errors.password?.type === 'pattern' && (
                                <p className="text-red-500">
                                    Password must contain at least one uppercase letter and one special character (!@#$&*)
                                </p>
                            )}


                            <button type='submit' className="btn btn-neutral mt-4">Register</button>
                        </fieldset>
                        <div>
                            <p className=''>Already have an account? Please <Link
                                className='underline' to='/joinUs'>Login</Link></p>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </section>
    );
};

export default Register;