import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Login = () => {

    const [showPass, setShowPass] = useState(false);
    const {signInUser,signWithGoogle} = useAuth();
    const {register, handleSubmit} = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // Handle Login
    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
            console.log(result);
            navigate(location.state || '/');
            toast.success('Login successful!')
        })
        .catch(error => {
            console.error(error);
        });
    };

    // Handle Google Login
    const handleGoogleSignIn = () => {
        signWithGoogle()
            .then((result) => {
                // window.location.href = '/';
                toast.success('Google login successful!');
                // create in db (Google Login)
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                };
                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user data has been stord',res.data);
                        navigate(location.state || '/');
                    })
            })
            .catch(error => {
                console.log(error)
            });
    }
    

    return (
        <>
            <div className='max-w-[480px] mx-auto h-[calc(100%-90px)] flex flex-col justify-center'>
                <div>
                    <h2 className='text-[32px] sm:text-[38px] md:text-[42px] lg:text-[48px] font-extrabold'>Welcome Back!</h2>
                    <p className='text-[18px] md:text-[20px]'>Login with ZapShift</p>
                    <form onSubmit={handleSubmit(handleLogin)} className='mt-5'>
                        {/* Email Field */}
                        <label className="form-label">Email address</label>
                        <input name='email' {...register('email')} className='form-input' type="email" placeholder="Enter your email address"/>
                        {/* Password Field */}
                        <label className="form-label">Password</label>
                        <div className='relative mb-2'>
                            <input name='password' {...register('password')} className='form-input' type={showPass ? 'text' : 'password'} placeholder="Enter your password"/>
                            <span onClick={() => setShowPass(!showPass)} className='absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer text-[#141414]'>{showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</span>
                        </div>
                        <a className='cursor-pointer'>Forget Password?</a>
                        <button className='block w-full mt-2.5 bg-[#CAEB66] font-semibold py-2.5 cursor-pointer rounded'>Login</button>
                        <p className='pt-2 text-black font-medium'>Don't have any account? <Link state={location.state} to='/register' className='text-[#8FA748]'>Register</Link></p>
                        <p className='text-center py-5 text-[#71717A] font-semibold'>OR</p>
                        <button onClick={handleGoogleSignIn} type="button" className='flex items-center justify-center gap-2 w-full border border-[#CAEB66] py-2 bg-[#E9ECF1] rounded text-[15px] text-[#141414] font-medium cursor-pointer'><svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="transparent"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg><span>Sign up with Google</span></button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;