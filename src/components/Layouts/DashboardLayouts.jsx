import React from 'react';
import { Outlet } from 'react-router';
import logo from '../../assets/images/navlogo.png'
import { NavLink } from 'react-router';
import { FaBarsStaggered } from 'react-icons/fa6';

const DashboardLayouts = () => {
    return (
        <>
            <div className="drawer xl:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <nav className="navbar w-full bg-white flex justify-between items-center">
                        {/* Small screen button */}
                        <label htmlFor="my-drawer-4" className="xl:hidden">
                            <div className='pl-2 md:pl-5 cursor-pointer text-black text-[20px]'><FaBarsStaggered /></div>
                        </label>
                        <div></div>
                        <div className='pr-2 md:pr-5'>
                            Profile
                        </div>
                    </nav>
                    <Outlet />
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                    <div className="min-h-full w-64 bg-base-200 px-5 py-5">
                        <NavLink to='/'>
                            <img src={logo} alt="logo" />
                        </NavLink>
                        <div className='mt-10 flex flex-col gap-2.5 text-[18px] font-semibold'>
                            <NavLink to='/dashboard/my-parcels'>My Parcels</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayouts;