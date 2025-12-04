import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    });

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email };
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Rider status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    refetch();
                }
            });
    };

    const handleApproval = (rider) => updateRiderStatus(rider, 'approved');
    const handleRejection = (rider) => updateRiderStatus(rider, 'rejected');

    return (
        <div className='max-w-[1550px] mx-auto py-[30px] md:py-[55px] px-[15px]'>
            <h2 className='text-[22px] font-semibold pt-2 pb-4'>Riders Pending Approval: {riders.length}</h2>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table min-w-[1100px]">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>District</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id} className="border-b">
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td className={`font-semibold ${rider.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                                    {rider.status}
                                </td>
                                <td>{rider.district}</td>
                                <td className='flex items-center gap-2.5'>
                                    <button onClick={() => handleApproval(rider)} className='btn btn-square text-[18px]'>
                                        <FaUserCheck />
                                    </button>
                                    <button onClick={() => handleRejection(rider)} className='btn btn-square text-[18px]'>
                                        <IoPersonRemoveSharp />
                                    </button>
                                    <button className='btn btn-square text-[18px]'>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;
