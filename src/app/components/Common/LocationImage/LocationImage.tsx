'use client';
import React, { useEffect } from 'react';
import LocationImageProps from '@typings/LocationImageProps';
import LocationData from '@typings/LocationData';
import Image from 'next/image';

const LocationImage: React.FC<LocationImageProps> = (
    props: LocationImageProps
) => {
    useEffect(() => {
        import(`@assets/data/regions/${props.region}/locations.json`)
            .then((module) => {
                const regionLocationData: LocationData[] = module.default;

                const locationData = regionLocationData.find((item) => item.id === props.id);
                if (locationData === undefined) {
                    throw new Error(`Location data for Id ${props.id} not found.`);
                }
                props.setLocationData(locationData);
            })
            .catch((error) => {
                console.error(`Failed to load region data for ${props.region}: ${error}`);
            });

            
    }, [props.region, props.id]);

    return props.locationData ? (
        <div className={`${props.className}`} style={{width: props.size, height: props.size, ...props.style}}>
            <Image fill
            src={`/regions/${props.region}/locations/${props.locationData.filename}`}
            alt="A location."
            style={{objectFit: 'cover'}}
            className='rounded-3xl'
            priority={props.priority === undefined ? false : props.priority}
            onClick={props.onClick}
        />
        </div>
    ): null;
};

export default LocationImage;
