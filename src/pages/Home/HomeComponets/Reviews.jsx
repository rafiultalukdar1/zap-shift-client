import React, { use } from 'react';
import image from '../../../assets/images/customer-top.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewsCard from './ReviewsCard';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Reviews = ({reviewsPromise}) => {

    const reviews = use(reviewsPromise);

    return (
        <>
            <div className='py-10'>
                <div className='container'>
                    <div>
                        <img src={image} className='mx-auto' alt="" />
                        <h2 className='text-[#03373D] text-[24px] md:text-[30px] lg:text-[36px] font-bold text-center'>What our customers are sayings</h2>
                        <p className='text-center text-[#606060]'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce<br /> pain, and strengthen your body with ease!</p>
                    </div>
                    <div className='mt-10'>
                        <Swiper
                            loop={true}
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={3}
                            coverflowEffect={{
                                rotate: 30,
                                stretch: '50%',
                                depth: 200,
                                modifier: 1,
                                scale: 0.85,
                                slideShadows: true,
                            }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination, Autoplay]}
                            className="mySwiper"
                            >
                            {reviews.map(review => (
                                <SwiperSlide key={review.id}>
                                <ReviewsCard review={review} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reviews;