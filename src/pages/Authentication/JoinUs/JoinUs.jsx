import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import useAxios from '../../../hooks/useAxios';

const JoinUs = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user, signInUser, setUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/'

    const onSubmit = data => {
        const axiosInstance = useAxios();
        signInUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);

                try {
                    const firebaseToken = await result.user.getIdToken();
                    const res = await axiosInstance.post('/login', {
                        email: data.email,
                        password: data.password,
                    },
                        {
                            headers: {
                                Authorization: `Bearer ${firebaseToken}`,
                            },
                        });
                    const user = res.data.user;

                    const backendToken = res.data.token;
                    if (backendToken) {
                        localStorage.setItem('accessToken', backendToken);
                        setUser({
                            ...user, // পূর্বের user info যদি থাকে
                            accessToken: backendToken,
                        });
                        toast.success('Login successful!');
                        navigate(from, { replace: true });
                    } else {
                        toast.error('Login failed: No token from backend');
                    }
                } catch (error) {
                    console.error('Login failed:', error);
                    toast.error('Login failed. Please check your credentials.');
                }

                navigate(from);
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <section data-aos="fade-up" className='flex justify-center items-center p-6'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h3 className="text-2xl font-bold text-center pt-8 ">Sign in now!</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">

                            <label className="label">Email</label>
                            <input type="email" {...register('email')} className="input" placeholder="Email" />

                            <label className="label">Password</label>
                            <input type="password" {...register('password', { required: true, minLength: 6, maxLength: 20 })} className="input" placeholder="Password" />
                            {
                                errors.password?.type === 'required' && (<p role="alert" className='text-red-500'>Password is required</p>)
                            }
                            {
                                errors.password?.type === 'minLength' && (<p role="alert" className='text-red-500'>Password must be 6 characters</p>)
                            }
                            {
                                errors.password?.type === 'maxLength' && (<p role="alert" className='text-red-500'>Password must be 20 characters</p>)
                            }
                            <div><a className="link link-hover">Forgot password?</a></div>

                        </fieldset>
                        <button type='submit' className="btn btn-neutral mt-4 w-full">Login</button>
                    </form>
                    <div>
                        <p className=''>New to this account ? Please <Link
                            className='underline' to='/register'>Register</Link></p>
                    </div>
                    <div className="divider">OR</div>
                    <SocialLogin></SocialLogin>
                </div>

            </div>
        </section>
    );
};

export default JoinUs;