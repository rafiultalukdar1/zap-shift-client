import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {

    const { user } = useAuth();
    const { register, handleSubmit, control, formState: {errors} } = useForm();
    const serviceCenter = useLoaderData();
    const duplicateRegions = serviceCenter.map(c => c.region);
    const regions = [...new Set(duplicateRegions)];
    const senderRegion = useWatch({ control, name: 'senderRegion'});
    const receiverRegion = useWatch({ control, name: 'receiverRegion'});
    
    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenter.filter (c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSendParcel = (data) => {
        const isDocument = data.parcelType === 'document';
        const isSameDistricts = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);
        let cost = 0;
        if (isDocument) {
            cost = isSameDistricts ? 60 : 80;
        } else {
            if (parcelWeight < 3) {
                cost = isSameDistricts ? 110 : 150;
            } else {
                const minCharge = isSameDistricts ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistricts 
                    ? extraWeight * 40 
                    : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        data.cost = cost;
        Swal.fire({
            title: "Confirm Payment",
            text: `The total cost is ${cost} BDT. Proceed to payment?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, pay now!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        if (res.data.insertedId) {
                            navigate('/dashboard/my-parcels')
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Parcel created! Redirecting to payment...",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            // window.location.href = `/dashboard/payment/${res.data.insertedId}`;
                        }
                    });
            }
        });
    };


    return (
        <>
            <div className='py-[55px] lg:py-[90px]'>
                <div className='container'>
                    <div className='bg-white rounded-lg lg:rounded-2xl py-[25px] px-[15px] sm:py-[55px] sm:px-10 lg:py-[90px] lg:px-[75px]'>
                        <h2 className='text-[32px] sm:text-[40px] lg:text-[48px] font-bold'>Send A Parcel</h2>

                        <form onSubmit={handleSubmit(handleSendParcel)}>
                            <h3 className='pt-5 text-[22px] pb-2.5 font-semibold'>Enter your parcel details</h3>
                            <div className='flex items-center gap-5 py-2.5'>
                                <label className="form-label">
                                    <input type="radio" value="document" {...register('parcelType')} className="radio" defaultChecked />
                                    Document
                                </label>
                                <label className="form-label">
                                    <input type="radio" value="not-document" {...register('parcelType')} className="radio" />
                                    Not-Document
                                </label>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2.5 pb-5 border-b border-[#bdd479a1]'>
                                <div>
                                    {/* Parcel Name */}
                                    <label className="form-label">Parcel Name</label>
                                    <input name="parcelName" {...register("parcelName", { required: true })} className="form-input" type="text" placeholder="Enter parcel name" />
                                    {errors.parcelName?.type === "required" && (<p className="text-red-500 text-sm font-medium">Parcel name is required</p>)}
                                </div>
                                <div>
                                    {/* Parcel Weight (KG) */}
                                    <label className="form-label">Parcel Weight (KG)</label>
                                    <input name="parcelWeight" {...register("parcelWeight", { required: true })} className="form-input" type="number" placeholder="Enter parcel weight (KG)" />
                                    {errors.parcelWeight?.type === "required" && (<p className="text-red-500 text-sm font-medium">Parcel weight is required</p>)}
                                </div>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                {/* Sender Details */}
                                <div>
                                    <h3 className='pt-5 text-[22px] pb-2.5 font-semibold'>Sender Details</h3>
                                    {/* Sender Name */}
                                    <label className="form-label">Sender Name</label>
                                    <input name="senderName" {...register("senderName", { required: true })} className="form-input" type="text" placeholder="Enter sender name" defaultValue={user?.displayName}/>
                                    {errors.senderName?.type === "required" && (<p className="text-red-500 text-sm font-medium">Sender name is required</p>)}
                                    {/* Sender Email */}
                                    <label className="form-label">Sender Email</label>
                                    <input name="senderEmail" {...register("senderEmail", { required: true })} className="form-input" type="email" placeholder="Enter sender email" defaultValue={user?.email}/>
                                    {errors.senderEmail?.type === "required" && (<p className="text-red-500 text-sm font-medium">Sender email is required</p>)}
                                    {/* Address */}
                                    <label className="form-label">Address</label>
                                    <input name="address" {...register("address", { required: true })} className="form-input" type="text" placeholder="Enter address" />
                                    {errors.address?.type === "required" && (<p className="text-red-500 text-sm font-medium">Address is required</p>)}
                                    {/* Sender Phone No */}
                                    <label className="form-label">Sender Phone No</label>
                                    <input name="senderPhone" {...register("senderPhone", { required: true })} className="form-input" type="text" placeholder="Enter sender phone number" />
                                    {errors.senderPhone?.type === "required" && (<p className="text-red-500 text-sm font-medium">Sender phone number is required</p>)}
                                    {/* Sender Regions */}
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend form-label">Sender Regions</legend>
                                        <select {...register('senderRegion', { required: true })} defaultValue="" className="select form-input">
                                            <option value="" disabled>Pick a region</option>
                                            {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                                        </select>
                                        {errors.senderRegion?.type === "required" && (<p className="text-red-500 text-sm font-medium">Please select a region</p>)}
                                    </fieldset>
                                    {/* Your District */}
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend form-label">Sender District</legend>
                                        <select {...register('senderDistrict', { required: true })} defaultValue="" className="select form-input">
                                            <option value="" disabled>Pick a District</option>
                                            {districtsByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)}
                                        </select>
                                        {errors.senderDistrict?.type === "required" && (<p className="text-red-500 text-sm font-medium">Please select a district</p>)}
                                    </fieldset>
                                    {/* <label className="form-label">Your District</label>
                                    <input name="district" {...register("district", { required: true })} className="form-input" type="text" placeholder="Enter your district" />
                                    {errors.district?.type === "required" && (<p className="text-red-500 text-sm font-medium">District is required</p>)} */}
                                    {/* Pickup Instruction */}
                                    <label className="form-label">Pickup Instruction</label>
                                    <input name="pickupInstruction" {...register("pickupInstruction", { required: true })} className="form-input" type="text" placeholder="Enter pickup instruction" />
                                    {errors.pickupInstruction?.type === "required" && (<p className="text-red-500 text-sm font-medium">Pickup instruction is required</p>)}
                                </div>
                                {/* Receiver Details */}
                                <div>
                                    <h3 className='pt-5 text-[22px] pb-2.5 font-semibold'>Receiver Details</h3>
                                    {/* Receiver Name */}
                                    <label className="form-label">Receiver Name</label>
                                    <input name="receiverName" {...register("receiverName", { required: true })} className="form-input" type="text" placeholder="Enter receiver name" />
                                    {errors.receiverName?.type === "required" && (<p className="text-red-500 text-sm font-medium">Receiver name is required</p>)}
                                    {/* Receiver Email */}
                                    <label className="form-label">Receiver Email</label>
                                    <input name="receiverEmail" {...register("receiverEmail", { required: true })} className="form-input" type="email" placeholder="Enter receiver email" />
                                    {errors.receiverEmail?.type === "required" && (<p className="text-red-500 text-sm font-medium">Receiver email is required</p>)}
                                    {/* Receiver Address */}
                                    <label className="form-label">Receiver Address</label>
                                    <input name="receiverAddress" {...register("receiverAddress", { required: true })} className="form-input" type="text" placeholder="Enter receiver address" />
                                    {errors.receiverAddress?.type === "required" && (<p className="text-red-500 text-sm font-medium">Receiver address is required</p>)}
                                    {/* Receiver Contact No */}
                                    <label className="form-label">Receiver Contact No</label>
                                    <input name="receiverContact" {...register("receiverContact", { required: true })} className="form-input" type="text" placeholder="Enter receiver contact number" />
                                    {errors.receiverContact?.type === "required" && (<p className="text-red-500 text-sm font-medium">Receiver contact number is required</p>)}
                                    {/* Receiver Regions */}
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend form-label">Receiver Regions</legend>
                                        <select {...register('receiverRegion', { required: true })} defaultValue="" className="select form-input">
                                            <option value="" disabled>Pick a region</option> {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                                        </select> {errors.receiverRegion?.type === "required" && ( <p className="text-red-500 text-sm font-medium">Please select a region</p>)}
                                    </fieldset>
                                    {/* Receiver District */}
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend form-label">Receiver District</legend>
                                        <select {...register('receiverDistrict', { required: true })} defaultValue="" className="select form-input">
                                            <option value="" disabled>Pick a District</option>
                                            {districtsByRegion(receiverRegion).map((r, i) => <option key={i} value={r}>{r}</option>)}
                                        </select> {errors.receiverDistrict?.type === "required" && ( <p className="text-red-500 text-sm font-medium">Please select a district</p>)}
                                    </fieldset>
                                    {/* Receiver District */}
                                    {/* <label className="form-label">Receiver District</label>
                                    <input name="receiverDistrict" {...register("receiverDistrict", { required: true })} className="form-input" type="text" placeholder="Enter receiver district" />
                                    {errors.receiverDistrict?.type === "required" && (<p className="text-red-500 text-sm font-medium">Receiver district is required</p>)} */}
                                    {/* Delivery Instruction */}
                                    <label className="form-label">Delivery Instruction</label>
                                    <input name="deliveryInstruction" {...register("deliveryInstruction", { required: true })} className="form-input" type="text" placeholder="Enter delivery instruction" />
                                    {errors.deliveryInstruction?.type === "required" && (<p className="text-red-500 text-sm font-medium">Delivery instruction is required</p>)}
                                </div>
                            </div>


                            
                            {/* Button */}
                            <button className='w-full py-2.5 rounded bg-[#CAEB66] font-semibold mt-5 lg:mt-[50px]'>Proceed to Confirm Booking</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SendParcel;