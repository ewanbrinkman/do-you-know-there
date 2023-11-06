'use client';
import React, { useRef, useEffect } from 'react';
import LocationImageProps from '@typings/locationImage/LocationImageProps';
import Image from 'next/image';

const LocationImage: React.FC<LocationImageProps> = (
    props: LocationImageProps,
) => {
    // const image = useRef<HTMLImageElement | null>(null);

    // useEffect(() => {
    //     // const container = props.containerRef.current;

    //     const updateContainerSize = () => {
    //         if (image.current) {
    //             image.current.width = image.current.naturalWidth;
    //             image.current.height = image.current.naturalHeight;
    //         }
    //     };

    //     updateContainerSize();

    //     window.addEventListener('resize', updateContainerSize);

    //     return () => {
    //         window.removeEventListener('resize', updateContainerSize);
    //     };
    // }, []);

    return props.locationData ? (
        // <div
        //     className={props.className}
        //     style={props.style}
        // >
            <img
                // ref={image}
                // fill
                src={`/areas/${props.locationData.area}/locations/${props.locationData.filename}`}
                alt="A location."
                // style={{ objectFit: 'cover' }}
                style={{
                    ...props.style,
                    // ...props.style,
                    // maxWidth: '75%',
                    // maxHeight: '75%',
                    // minWidth: '75%',
                    // minHeight: '75%',
                    // width: 'auto',
                    // height: 'auto',
                    // maxWidth: '100%',
                    // maxHeight: '100%',
                }}
                // width={props.size}
                // height={props.size}
                // width='auto'
                // height='auto'
                // layout="intrinsic"
                className={`rounded-3xl ${props.className}`}
                // priority={props.priority === undefined ? false : props.priority}
                onClick={props.onClick}
                // onLoadingComplete={(img) => {console.log(img.naturalWidth); console.log(img.naturalHeight)}}
            />
        // </div>
    ) : null;
};

export default LocationImage;
