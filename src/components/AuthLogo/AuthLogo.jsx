import React from 'react';
import logo from '../../assets/images/navlogo.png'
import { NavLink } from 'react-router';

const AuthLogo = () => {
    return (
        <>
            <div className='pt-7 pl-3 sm:pl-[50px] md:pl-[70px] lg:pl-[110px]'>
                <NavLink to='/'><img src={logo} alt="" /></NavLink>
            </div>
        </>
    );
};

export default AuthLogo;