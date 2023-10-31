'use client';
import React, { useState } from 'react';
import GameLocationImage from '@components/Features/Game/GameLocationImage';
import MapType from '@typings/MapType';
import dynamic from 'next/dynamic';
const GameMap = dynamic(() => import('@components/Features/Game/GameMap'), {
    loading: () => <p>Map is loading...</p>,
    ssr: false,
});
import './GameContainer.css';

const GameContainer: React.FC = () => {
    const [minimized, setMinimized] = useState(false);

    return (
        <div className="flex-grow relative">
            <div
                className={`absolute w-full h-full ${
                            minimized
                                ? 'game-location__background--minimized'
                                : 'game-location__background--not-minimized'
                        }`}
                onClick={() => {
                    setMinimized(true);
                    // console.log('set true');
                }}
            >
                <GameMap
                    mapType={MapType.SFUBurnaby}
                    className="w-full h-full z-0"
                    minimized={minimized}
                    setMinimized={setMinimized}
                />
            </div>
            {/* <div className="absolute w-full h-full"> */}
            <GameLocationImage
                region={MapType.SFUBurnaby}
                id={1}
                size={650}
                minimized={minimized}
                setMinimized={setMinimized}
            />
            {/* </div> */}
        </div>
    );
};

export default GameContainer;
