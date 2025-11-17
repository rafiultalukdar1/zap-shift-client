import React from 'react';
import { FaShippingFast, FaGlobeAsia, FaWarehouse, FaUndo, FaMoneyBillWave, FaHandshake } from "react-icons/fa";

const OurServices = () => {
  const services = [
    {
      icon: <FaShippingFast className="text-[#0C3A2D] text-4xl mb-4" />,
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pickup to drop-off.",
    },
    {
      icon: <FaGlobeAsia className="text-[#0C3A2D] text-4xl mb-4" />,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      icon: <FaWarehouse className="text-[#0C3A2D] text-4xl mb-4" />,
      title: "Fulfillment Solution",
      description:
        "Customized service with inventory management support, online order processing, packaging, and after-sales support.",
    },
    {
      icon: <FaMoneyBillWave className="text-[#0C3A2D] text-4xl mb-4" />,
      title: "Cash on Home Delivery",
      description:
        "100% cash-on-delivery available anywhere in Bangladesh with guaranteed product safety.",
    },
    {
      icon: <FaHandshake className="text-[#0C3A2D] text-4xl mb-4" />,
      title: "Corporate Service / Contract Logistics",
      description:
        "Customized corporate services including warehouse and inventory management support.",
    },
    {
      icon: <FaUndo className="text-[#0C3A2D] text-4xl mb-4" />,
      title: "Parcel Return",
      description:
        "Our reverse logistics system allows customers to return or exchange products with online merchants easily.",
    },
  ];

  return (
    <>
        <div className="py-16">
            <div className="container">
                <div className='bg-[#0C3A2D] rounded-2xl py-15 px-2.5 sm:px-5 lg:px-12'>
                    <h2 className="text-2xl font-semibold text-white mb-3 text-center">Our Services</h2>
                    <p className="text-gray-200 text-center mb-10 max-w-2xl mx-auto">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition text-center" >
                        {service.icon}
                        <h3 className="font-semibold text-[#0C3A2D] mb-2">{service.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default OurServices;
