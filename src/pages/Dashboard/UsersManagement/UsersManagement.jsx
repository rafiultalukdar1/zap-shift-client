import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';

const UsersManagement = () => {

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeUser = id => {
        const roleInfo = { role: 'admin' };
        axiosSecure.patch(`/users/${id}`, roleInfo)
            .then(res => {
                if(res.data.modifiedCount){
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'User role updated to Admin',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    const handleRemoveAdmin = id => {
        const roleInfo = { role: 'user' };
        axiosSecure.patch(`/users/${id}`, roleInfo)
            .then(res => {
                if(res.data.modifiedCount){
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: 'Removed!',
                        text: 'Admin role removed successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };



    return (
        <div className='max-w-[1550px] mx-auto py-[30px] md:py-[55px] px-[15px]'>
            <h2 className='text-[22px] font-semibold pt-2 pb-4'>Users Management {users.length}</h2>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table min-w-[1100px]">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="border-b">
                                <td>{index + 1}</td>

                                <td>
                                    <img
                                        src={user.photoURL}
                                        className="w-[45px] h-[45px] rounded-full object-cover"
                                    />
                                </td>

                                <td>{user.displayName}</td>
                                <td>{user.email}</td>

                                <td className={`font-semibold ${user.role === 'admin' ? 'text-green-600' : 'text-blue-600'}`}>
                                    {user.role}
                                </td>

                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                                <td className="flex items-center gap-2.5">
                                    <button onClick={() => handleMakeUser(user._id)} className="btn btn-square text-[18px]">
                                        <FaUserCheck />
                                    </button>
                                    <button onClick={() => handleRemoveAdmin(user._id)} className="btn btn-square text-[18px]">
                                        <IoPersonRemoveSharp />
                                    </button>
                                    <button className="btn btn-square text-[18px]">
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

export default UsersManagement;