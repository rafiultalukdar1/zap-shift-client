import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcels?email=${user.email}`);
            return res.data;
        }
    });

    // delete parcel
    const handleParcelDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if(res.data.deletedCount){
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }



    return (
        <>
            <div className='max-w-[1550px] mx-auto py-[30px] md:py-[55px] px-[15px]'>
                <h2 className='text-[22px] font-semibold pt-2 pb-4'>My Parcels : {parcels.length}</h2>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table min-w-[1100px]">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Cost</th>
                                <th>Delivery Status</th>
                                <th>Payment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parcels.map((parcel, index) => (
                                    <tr key={parcel._id}>
                                        <th>{index + 1}</th>
                                        <td>{parcel.parcelName}</td>
                                        <td>{parcel.cost}</td>
                                        <td>Delivery Status</td>
                                        <td>
                                            {
                                                parcel.paymentStatus === 'paid' ? 
                                                <span className='text-green-400 font-semibold'>Paid</span> : 
                                                <Link to={`/dashboard/payment/${parcel._id}`} className='text-[#F99D25] font-semibold'>Pay</Link>
                                            }
                                        </td>
                                        <td className='flex items-center gap-2.5'>
                                            <button className='btn btn-square text-[18px]'><FaRegEdit /></button>
                                            <button className='btn btn-square text-[18px]'><FaEye /></button>
                                            <button onClick={() => handleParcelDelete(parcel._id)} className='btn btn-square text-[18px]'><MdDeleteOutline /></button>
                                        </td>
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

export default MyParcels;