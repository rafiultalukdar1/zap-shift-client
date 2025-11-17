import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/images/banner1.png";
import bannerImg2 from "../../../assets/images/banner2.png";
import bannerImg3 from "../../../assets/images/banner3.png";

const Banner = () => {
    return (
        <>
           <div className='py-12'>
                <div className='container'>
                    <Carousel autoPlay={true} infiniteLoop={true} showArrows={false} showThumbs={false} showIndicators={true} showStatus={false} swipeable={true} emulateTouch={true} interval={1500}>
                        <div>
                            <img src={bannerImg1} />
                        </div>
                        <div>
                            <img src={bannerImg2} />
                        </div>
                        <div>
                            <img src={bannerImg3} />
                        </div>
                    </Carousel>
                </div>
           </div>
        </>
    );
};

export default Banner;