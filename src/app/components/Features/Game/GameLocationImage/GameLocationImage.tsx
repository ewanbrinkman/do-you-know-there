import React from 'react';
import GameLocationImageProps from '@typings/locationImage/GameLocationImageProps';
import LocationImage from '@components/Common/LocationImage';

const GameLocationImage: React.FC<GameLocationImageProps> = (
    props: GameLocationImageProps,
) => {
    const toggleMinimized = (event: React.MouseEvent<HTMLElement>) => {
        props.setMinimized(!props.minimized);
    };

    return (
        <LocationImage
            locationData={props.locationData}
            onClick={toggleMinimized}
            className={`absolute z-10 max-w-[70%] max-h-[70%] transition-all duration-300 ease-in-out ${
                props.minimized
                    ? 'bottom-[50px] right-[30px] transform scale-[0.25] xsm:scale-[0.3] sm:scale-[0.4] origin-bottom-right'
                    : 'bottom-1/2 right-1/2 transform origin-bottom-right scale-100 translate-x-1/2 translate-y-1/2'
            }`}
        />
    );
};

export default GameLocationImage;
