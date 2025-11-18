import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {

    const position = [23.8103, 90.4125];
    const cerviceCenters = useLoaderData();
    const mapRef = useRef(null);
    console.log(cerviceCenters)

    const handleSearch = e => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = cerviceCenters.find(c => c.district.toLowerCase().includes(location.toLowerCase()));
        if (district) {
            const coord = [district.latitude, district.longitude];
            mapRef.current.flyTo(coord, 14);
        }
    }
    
    return (
        <>
            <div className='py-[50px] lg:py-[70px]'>
                <div className='container'>
                    <div className='bg-white py-[50px] lg:py-20 px-[15px] sm:px-[50px] lg:px-[70px] rounded-lg lg:rounded-2xl'>
                        <h2 className='text-[#03373D] text-[32px] sm:text-[40px] lg:text-[55px] font-bold'>We are available in 64 districts</h2>
                        <div className='py-10'>
                            <form onSubmit={handleSearch}>
                                <input name='location' type="text" className='border border-[#817777] py-1.5 px-1.5 outline-0 rounded' placeholder='Search location'/>
                                <button className='cursor-pointer bg-[#d35b5b] py-1.5 px-3.5 text-white rounded '>Search</button>
                            </form>      
                        </div>
                        <div className='w-full h-[350px] sm:h-[420px] lg:h-[650px]'>
                            <MapContainer center={position} zoom={8} scrollWheelZoom={false} className='h-full z-40' ref={mapRef}>
                                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                {
                                    cerviceCenters.map(center => 
                                        <Marker key={center.district} position={[center.latitude, center.longitude]}>
                                            <Popup>
                                                <strong>{center.district}</strong><br /> Service Area
                                            </Popup>
                                    </Marker>)
                                }
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Coverage;