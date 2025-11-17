import React from 'react';
import Banner from './HomeComponets/Banner';
import HowItWorks from './HomeComponets/HowItWorks';
import OurServices from './HomeComponets/OurServices';
import Brands from './HomeComponets/Brands';
import Card from './HomeComponets/Card';
import Merchant from './HomeComponets/Merchant';
import Reviews from './HomeComponets/Reviews';

const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Brands></Brands>
            <Card></Card>
            <Merchant></Merchant>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </>
    );
};

export default Home;