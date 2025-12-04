import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!sessionId) return;

        const fetchPayment = async () => {
            try {
                const res = await axiosSecure.patch(`/payment-success?session_id=${sessionId}`);

                if (res.data.success && res.data.paymentInfo) {
                    const payment = res.data.paymentInfo;

                    setPaymentInfo({
                        trackingId: payment.trackingId,
                        transactionId: payment.transactionId,
                        parcelName: payment.parcelName,
                        amount: payment.amount,
                        currency: payment.currency,
                        paidAt: payment.paidAt
                    });
                } else {
                    setError(res.data.message || "Payment not successful.");
                }
            } catch (err) {
                if (err.response?.status === 409) {
                    setError("Payment already exists.");
                } else {
                    setError("Something went wrong.");
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPayment();
    }, [sessionId, axiosSecure]);

    if (loading) return <p className='text-center py-10'>Loading payment details...</p>;
    if (error) return <p className='text-center py-10 text-red-500'>{error}</p>;

    return (
        <div className='max-w-[1550px] mx-auto py-[30px] md:py-[55px] px-[15px]'>
            <h2 className='text-3xl font-bold mb-5'>Payment Success ✅</h2>

            {paymentInfo && (
                <div className='bg-gray-100 p-5 rounded-md space-y-2'>
                    <p><strong>Parcel:</strong> {paymentInfo.parcelName}</p>
                    <p><strong>Amount Paid:</strong> {paymentInfo.amount} {paymentInfo.currency?.toUpperCase()}</p>
                    <p><strong>Tracking ID:</strong> {paymentInfo.trackingId}</p>
                    <p><strong>Transaction ID:</strong> {paymentInfo.transactionId}</p>
                    <p><strong>Paid At:</strong> {new Date(paymentInfo.paidAt).toLocaleString()}</p>
                </div>
            )}

            <Link to='/dashboard/my-parcels' className='btn mt-5'>Back to Parcels</Link>
        </div>
    );
};

export default PaymentSuccess;