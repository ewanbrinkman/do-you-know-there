import React from 'react';
import LocationImageProps from '@/app/types/locationImage/LocationImageProps';
import Image from 'next/image';

const LocationImage: React.FC<LocationImageProps> = (
    props: LocationImageProps,
) => {
    return props.locationData ? (
        <div
            className={`${props.className}`}
            style={{ width: props.size, height: props.size, ...props.style }}
        >
            <Image
                fill
                src={`/areas/${props.locationData.area}/locations/${props.locationData.filename}`}
                alt="A location."
                style={{ objectFit: 'cover' }}
                className="rounded-3xl"
                priority={props.priority === undefined ? false : props.priority}
                onClick={props.onClick}
            />
        </div>
    ) : null;
};

export default LocationImage;
