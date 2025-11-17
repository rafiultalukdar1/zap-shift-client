import React from 'react';
import cardImg1 from '../../../assets/images/live-tracking.png';
import cardImg2 from '../../../assets/images/safe-delivery.png';

const Card = () => {
  const items = [
    {
      img: cardImg1,
      title: 'Live Parcel Tracking',
      description:
        'Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.',
    },
    {
      img: cardImg2,
      title: '100% Safe Delivery',
      description:
        'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
    },
    {
      img: cardImg2,
      title: '24/7 Call Center Support',
      description:
        'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
    },
  ];

  return (
    <div className='py-10'>
      <div className='container space-y-6'>
        {items.map((item, index) => (
          <div key={index} className='bg-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm'>
            <div className='shrink-0 w-full md:w-1/4'>
              <img src={item.img} alt={item.title} className='mx-auto' />
            </div>
            <div className='hidden md:flex w-px bg-gray-300 h-24'></div>
            <div className='md:w-2/3'>
              <h3 className='text-xl font-semibold text-[#0C3A2D] mb-2'>{item.title}</h3>
              <p className='text-gray-600 leading-relaxed text-sm'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
