import React from 'react';
import { FaFacebookF, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import logo from '../../assets/images/navlogo.png'

const Footer = () => {
    return (
        <>
            <footer className='text-white rounded-t-xl py-12'>
                <div className='container mx-auto text-center space-y-6'>
                    <div className='py-10 bg-black rounded-xl'>
                        <div>
                            <img className='mx-auto py-2.5' src={logo} alt='' />
                            <p className='text-gray-400 max-w-xl mx-auto mt-2'> Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time. </p>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-center space-x-6 text-gray-300 mt-4'>
                            <a href='#services' className='hover:text-white'>Services</a>
                            <a href='#coverage' className='hover:text-white'>Coverage</a>
                            <a href='#about' className='hover:text-white'>About Us</a>
                            <a href='#pricing' className='hover:text-white'>Pricing</a>
                            <a href='#blog' className='hover:text-white'>Blog</a>
                            <a href='#contact' className='hover:text-white'>Contact</a>
                        </div>
                        <div className='flex justify-center space-x-4 mt-4'>
                            <a href='#' className='hover:text-white text-[35px] text-white'>
                                <FaLinkedin />
                            </a>
                            <a href='#' className='hover:text-gray-300 text-[35px] text-white'>
                                <FaXTwitter />
                            </a>
                            <a href='#' className='hover:text-white text-[35px] text-white'>
                                <FaFacebookF />
                            </a>
                            <a href='#' className='hover:text-white text-[35px] text-white'>
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;