import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {

    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure();

    const { data : parcel, isLoading } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    if(isLoading) {
        return <>loading</>;
    }

    // payment 
    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        };
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);
        window.location.href = res.data.url;
    };


    

    return (
        <>
            <div className='max-w-[1550px] mx-auto py-[30px] md:py-[55px] px-[15px]'>
                <h2 className='text-[22px] font-semibold pt-2 pb-4'>Please pay {parcel.cost} for {parcel.parcelName}</h2>
                <button onClick={handlePayment} className='btn'>Pay now</button>
            </div>
        </>
    );
};

export default Payment;