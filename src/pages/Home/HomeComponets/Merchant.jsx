import React from 'react';
import MerchantImg from '../../../assets/images/merchant.png'

const Merchant = () => {
    return (
        <>
            <div className='py-10'>
                <div className='container'>
                    <img src={MerchantImg} className='w-full' alt="" />
                </div>
            </div>
        </>
    );
};

export default Merchant;