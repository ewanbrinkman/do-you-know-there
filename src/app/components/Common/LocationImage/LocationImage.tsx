import React from 'react';
import LocationImageProps from '@typings/locationImage/LocationImageProps';

const LocationImage: React.FC<LocationImageProps> = (
    props: LocationImageProps,
) => {
    return props.locationData ? (
        <img
            src={`images/areas/${props.locationData.area}/locations/${props.locationData.filename}`}
            alt="A location."
            style={props.style}
            className={`rounded-xl ${props.className}`}
            onClick={props.onClick}
        />
    ) : null;
};

export default LocationImage;
