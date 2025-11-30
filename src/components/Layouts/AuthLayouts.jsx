import React from 'react';
import AuthLogo from '../AuthLogo/AuthLogo';
import { Outlet } from 'react-router';
import authImg from '../../assets/images/authImage.png'

const AuthLayouts = () => {
    return (
        <>
            <div className='bg-white'>
                <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>
                    <div>
                        <AuthLogo></AuthLogo>
                        <Outlet></Outlet>
                    </div>
                    <div className='bg-[#FAFDF0] h-full w-full flex flex-col items-center justify-center'>
                        <img className='mx-auto' src={authImg} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthLayouts;