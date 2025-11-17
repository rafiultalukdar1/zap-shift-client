import React from 'react';
import { TfiQuoteLeft } from 'react-icons/tfi';

const ReviewsCard = ({review}) => {

    return (
        <>
            <div className='p-8 rounded-lg shadow-lg bg-white space-y-3'>
                <TfiQuoteLeft size={45}/>
                <p className='text-[#202020] text-[16px] border-b border-dashed pb-3.5'>{review.review}</p>
                <div className='pt-2.5 flex items-center gap-2.5'>
                    <img className='h-12 w-12 rounded-full object-cover' src={review.user_photoURL} alt="" />
                    <div>
                        <h4 className='text-[20px] font-semibold'>{review.userName}</h4>
                        <p className='text-[15px]'>{review.delivery_email}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewsCard;