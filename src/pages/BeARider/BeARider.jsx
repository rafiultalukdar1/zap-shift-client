import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';

const BeARider = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const serviceCenters = useLoaderData(); 
    const duplicateRegions = serviceCenters.map(c => c.region);
    const regions = [...new Set(duplicateRegions)];

    const selectedRegion = useWatch({ control, name: 'region' });

    const districtsByRegion = (region) => {
        if (!region) return [];
        return serviceCenters.filter(c => c.region === region).map(c => c.district);
    };

    const handleRiderApply = (data) => {
        axiosSecure.post('/riders', data).then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Application Submitted!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });

        console.log(data);
    };

    return (
        <div className='py-[55px] lg:py-[90px]'>
            <div className='container'>
                <div className='bg-white rounded-lg lg:rounded-2xl py-[25px] px-[15px] sm:py-[55px] sm:px-10 lg:py-[90px] lg:px-[75px]'>
                    <h2 className='text-[32px] sm:text-[40px] lg:text-[48px] font-bold'>Be a Rider</h2>
                    <p className='pt-3 pb-5 text-gray-600 max-w-2xl'>
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    </p>

                    <form onSubmit={handleSubmit(handleRiderApply)}>
                        <h3 className='pt-5 text-[22px] pb-2.5 font-semibold'>Tell us about yourself</h3>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-1.5 gap-x-5 pt-2 pb-5 border-b border-[#bdd479a1]'>
                            <div>
                                <label className='form-label'>Your Name</label>
                                <input {...register("name", { required: true })} className="form-input" placeholder="Your Name" type="text" />
                                {errors.name && <p className="text-red-500 text-sm font-medium">Required</p>}
                            </div>

                            <div>
                                <label className='form-label'>Your Age</label>
                                <input {...register("age", { required: true })} className="form-input" placeholder="Your Age" type="number" />
                                {errors.age && <p className="text-red-500 text-sm font-medium">Required</p>}
                            </div>

                            <div>
                                <label className='form-label'>Your Email</label>
                                <input {...register("email", { required: true })} className="form-input" placeholder="Your Email" type="email" />
                                {errors.email && <p className="text-red-500 text-sm font-medium">Required</p>}
                            </div>

                            <div>
                                <label className='form-label'>Region</label>
                                <select {...register("region", { required: true })} defaultValue="" className="select form-input">
                                    <option value="" disabled>Select your Region</option>
                                    {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                                </select>
                                {errors.region && <p className="text-red-500 text-sm font-medium">Required</p>}
                            </div>

                            <div>
                                <label className='form-label'>District</label>
                                <select {...register("district", { required: true })} defaultValue="" className="select form-input">
                                    <option value="" disabled>Select your District</option>
                                    {districtsByRegion(selectedRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
                                </select>
                                {errors.district && <p className="text-red-500 text-sm font-medium">Required</p>}
                            </div>

                            <div>
                                <label className='form-label'>NID No</label>
                                <input {...register("nid", { required: true })} className="form-input" placeholder="NID" type="text" />
                                {errors.nid && <p className="text-red-500 text-sm font-medium">Required</p>}
                            </div>

                            <div>
                                <label className='form-label'>Contact</label>
                                <input {...register("contact", { required: true })} className="form-input" placeholder="Contact" type="text" />
                                {errors.contact && <p className="text-red-500 text-sm font-medium">Required</p>}
                            </div>

                            <div>
                                <label className='form-label'>Licence No</label>
                                <input {...register("licence", { required: true })} className="form-input" placeholder="Enter Licence Number" type="text" />
                                {errors.licence && <p className="text-red-500 text-sm font-medium">Required</p>}
                            </div>
                            

                            <div className='sm:col-span-2'>
                                <label className='form-label'>Preferred Warehouse</label>
                                <select {...register("warehouse", { required: true })} defaultValue="" className="select form-input">
                                    <option value="" disabled>Select warehouse</option>
                                    <option value="Dhaka Hub">Dhaka Hub</option>
                                    <option value="Chattogram Hub">Chattogram Hub</option>
                                    <option value="Sylhet Hub">Sylhet Hub</option>
                                    <option value="Rajshahi Hub">Rajshahi Hub</option>
                                </select>
                                {errors.warehouse && <p className="text-red-500 text-sm font-medium">Required</p>}
                            </div>

                        </div>

                        <button className='w-full py-2.5 rounded bg-[#CAEB66] font-semibold mt-5 lg:mt-[50px]'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BeARider;
