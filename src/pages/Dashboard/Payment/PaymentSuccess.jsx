import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();
    
    useEffect(() => {
        if(sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                })
        }

    }, [sessionId, axiosSecure])


    // console.log(sessionId);

    return (
        <>
            <div className='max-w-[1550px] mx-auto py-[30px] md:py-[55px] px-[15px]'>
                <h2 className='text-3xl font-bold'>Payment Success</h2>
                <Link to='/dashboard/my-parcels' className='btn mt-5'>Back to Parcels</Link>
            </div>
        </>
    );
};

export default PaymentSuccess;