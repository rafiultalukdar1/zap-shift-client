import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/images/navlogo.png'
import { FaArrowRight } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Nav = () => {

    const { user, logOut } = useAuth();

    const links = (
        <>
            <NavLink to="/be-a-rider">Be a Rider</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
            <NavLink to="/send-parcel">Send Parcel</NavLink>
            <NavLink to="/coverage">Coverage</NavLink>
            {
                user && <>
                    <NavLink to="/dashboard">My Dashboard</NavLink>
                </>
            }
        </>
    );

    // Log Out
    const handleLogOut = () => {
        logOut()
            .then(() => {
                
            })
            .catch(error => {
                console.log(error)
            });
    };


    return (
        <>
            <div className='sticky top-0 z-99 pt-8'>
                <div className='container'>
                    <div className='navbar bg-white py-3 sm:py-5 px-1.5 sm:px-5 md:px-7 rounded-2xl'>
                        <div className='navbar-start'>
                            <div className='dropdown'>
                                <div tabIndex={0} role='button' className='lg:hidden cursor-pointer mr-3.5'>
                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-10' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' /> </svg>
                                </div>
                                <nav tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-2 mt-3 w-52 p-2 shadow px-5 py-3 space-y-1.5">
                                    {links}
                                </nav>
                            </div>
                            <NavLink to='/' className='flex items-center gap-1.5 text-[20px] font-bold text-[#141414]'><img className='max-w-[130px]' src={logo} alt="" /></NavLink>
                        </div>
                        <div className='navbar-center hidden lg:flex'>
                            <nav className='flex items-center gap-[22px]'>
                                {links}
                            </nav>
                        </div>
                        <div className='navbar-end'>
                            {
                                user ? 
                                <button onClick={() => handleLogOut()} className='py-2.5 px-6 rounded-lg text-[18px] font-bold cursor-pointer bg-white border border-[#DADADA] text-[#606060]'>LogOut</button>
                                :
                                <div className='flex items-center gap-4'>
                                    <button className='py-2.5 px-6 rounded-lg text-[18px] font-bold cursor-pointer bg-white border border-[#DADADA] text-[#606060]'><Link to='/login'>Sign In</Link></button>
                                    <button className='py-2.5 px-6 rounded text-[18px] font-bold cursor-pointer bg-[#CAEB66] text-[#1F1F1F]'><Link to='/be-a-rider'>Be a rider</Link></button>
                                    <button className='h-12 w-12 bg-[#1F1F1F] rounded-full cursor-pointer text-[#CAEB66] flex items-center justify-center transform -rotate-45'><FaArrowRight size={20} /></button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Nav;