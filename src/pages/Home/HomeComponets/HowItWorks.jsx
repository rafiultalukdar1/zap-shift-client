import React from 'react';
import { FaTruck, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa";

const HowItWorks = () => {
  const items = [
    {
      icon: <FaTruck className="text-[#0C3A2D] text-4xl mb-4" />,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: <FaMoneyBillWave className="text-[#0C3A2D] text-4xl mb-4" />,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: <FaWarehouse className="text-[#0C3A2D] text-4xl mb-4" />,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      icon: <FaBuilding className="text-[#0C3A2D] text-4xl mb-4" />,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];

  return (
    <>
        <div className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold text-[#0C3A2D] mb-10">How it Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                        {item.icon}
                        <h3 className="font-semibold text-[#0C3A2D] mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    </>
  );
};

export default HowItWorks;
