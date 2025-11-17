import React from 'react';
import brandImg1 from '../../../assets/images/amazon.png'
import brandImg2 from '../../../assets/images/casio.png'
import brandImg3 from '../../../assets/images/moonstar.png'
import brandImg4 from '../../../assets/images/navlogo.png'
import brandImg5 from '../../../assets/images/randstad.png'
import brandImg6 from '../../../assets/images/star.png'
import brandImg7 from '../../../assets/images/start_people.png'
import Marquee from 'react-fast-marquee';

const Brands = () => {

    const brandImages = [
        brandImg1,
        brandImg2,
        brandImg3,
        brandImg4,
        brandImg5,
        brandImg6,
        brandImg7,
    ];

    return (
        <>
            <div className='py-10'>
                <div className='container'>
                    <Marquee gradient={false} speed={50} pauseOnHover={true}>
                        {brandImages.map((img, index) => (
                            <div key={index} className='mx-8'>
                                <img src={img} alt={`brand-${index}`} className='max-w-[350px]' />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </>
    );
};

export default Brands;