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

    return locationData ? (
        <div style={{width: `${props.size}px`, height: `${props.size}px`}}>
            <Image fill
            src={`/regions/${props.region}/locations/${locationData.filename}`}
            alt="A location."
            style={{objectFit: 'cover'}}
            className='rounded-3xl'
        />
        </div>
    ): null;
};

export default LocationImage;
