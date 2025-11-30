import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {

    return (
        <>
            <div className='max-w-[1550px] mx-auto py-[30px] md:py-[55px] px-[15px]'>
                <h2 className='text-3xl font-bold'>Payment is cancelled. Please try again</h2>
                <Link to='/dashboard/my-parcels' className='btn mt-5'>Back to Parcels</Link>
            </div>
        </>
    );
};

export default PaymentCancel;