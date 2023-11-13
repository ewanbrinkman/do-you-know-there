import React from 'react';
import GameLocationImageProps from '@typings/locationImage/GameLocationImageProps';
import LocationImage from '@components/Common/LocationImage';
import './GameLocationImage.css';

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
            className={`absolute z-10 game-location-image ${
                props.minimized
                    ? 'game-location-image--minimized'
                    : 'game-location-image--not-minimized'
            }`}
            style={{
                maxWidth: '70%',
                maxHeight: '70%',
            }}
        />
    );
};

export default GameLocationImage;
