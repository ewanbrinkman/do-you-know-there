import React from 'react';
import GameLocationImageProps from '@typings/GameLocationImageProps';
import LocationImage from './LocationImage';
import './GameLocationImage.css';

const GameLocationImage: React.FC<GameLocationImageProps> = (
    props: GameLocationImageProps
) => {
    const toggleMinimized = (e: React.MouseEvent<HTMLDivElement>) => {
        props.setMinimized(!props.minimized);
        // Prevent the background div from getting the click event. Don't need toggle anymore.
        // e.stopPropagation();
    };

    return (
        // Top parent div is shaded region.
        // <div
        //     className={`absolute w-full h-full ${
        //         minimized
        //             ? 'game-location__background--minimized'
        //             : 'game-location__background--not-minimized'
        //     }`}
        //     onClick={() => {
        //         setMinimized(true);
        //     }}
        // >
            <div // Container for game location image.
                onClick={toggleMinimized}
                className={`z-10 game-location-image ${
                    props.minimized
                        ? 'game-location-image--minimized'
                        : 'game-location-image--not-minimized'
                }`}
            >
                <LocationImage region={props.region} id={props.id} size={props.size} />
            </div>
        // </div>
    );
};

export default GameLocationImage;
