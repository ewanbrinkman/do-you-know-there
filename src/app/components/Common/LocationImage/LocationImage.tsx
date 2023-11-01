'use client';
import React, { useEffect, useState } from 'react';
import LocationImageProps from '@typings/LocationImageProps';
import LocationData from '@typings/LocationData';
import Image from 'next/image';

const LocationImage: React.FC<LocationImageProps> = (
    props: LocationImageProps
) => {
    const [locationData, setLocationData] = useState<LocationData | null>(null);

    useEffect(() => {
        import(`@assets/data/regions/${props.region}/locations.json`)
            .then((module) => {
                const regionLocationData: LocationData[] = module.default;

                const locationData = regionLocationData.find((item) => item.id === props.id);
                if (locationData === undefined) {
                    throw new Error(`Location data for Id ${props.id} not found.`);
                }
                setLocationData(locationData);
            })
            .catch((error) => {
                console.error(`Failed to load region data for ${props.region}: ${error}`);
            });

            
    }, [props.region]);

    // console.log({width: `${props.size}%`, height: `${props.size}%`});

    return locationData ? (
        // <div className='relative w-full md:w-1/2 lg:w-1/3'>
        // <div className='relative' style={{
        //     height: '100vw',
        // }}>
        // <div className='relative' style={{width: `${props.size}px`, height: `${props.size}px`}}>
        <div className={`${props.className}`} style={props.style}>
            <Image fill
            src={`/regions/${props.region}/locations/${locationData.filename}`}
            alt="A location."
            style={{objectFit: 'cover'}}
            className='rounded-3xl'
            priority={props.priority === undefined ? false : props.priority}
            onClick={props.onClick}
            // sizes='(max-width: 640px) 100vw, 50vw'
        />
        </div>
    ): null;
};

export default LocationImage;
