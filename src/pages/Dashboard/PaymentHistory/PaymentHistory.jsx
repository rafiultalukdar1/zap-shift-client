import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye } from 'react-icons/fa6';

const PaymentHistory = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        },
    });



    return (
        <>
            <div className='max-w-[1550px] mx-auto py-[30px] md:py-[55px] px-[15px]'>
                <h2 className='text-[22px] font-semibold pt-2 pb-4'>Payment History {payments.length}</h2>

                <div className="overflow-x-auto  rounded-box border border-base-content/5 bg-base-100">
                    <table className="table min-w-[1100px]">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Parcel</th>
                                <th>Paid Amount</th>
                                <th>Tracking ID</th>
                                <th>Transaction ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment, index) => (
                                    <tr key={payment._id}>
                                        <th>{index + 1}</th>
                                        <td>{payment.parcelName}</td>
                                        <td>{payment.amount}</td>
                                        <td>{payment.trackingId}</td>
                                        <td>{payment.transactionId}</td>
                                        <td><button className='btn btn-square text-[18px]'><FaEye /></button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;