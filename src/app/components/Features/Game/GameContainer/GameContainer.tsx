'use client';
import React, { useState } from 'react';
import GameLocationImage from '@components/Features/Game/GameLocationImage';
import MapType from '@typings/MapType';
import dynamic from 'next/dynamic';
const GameMap = dynamic(() => import('@components/Features/Game/GameMap'), {
    loading: () => <p>Map is loading...</p>,
    ssr: false,
});

const GameContainer: React.FC = () => {
    const [minimized, setMinimized] = useState(false);

    return (
        <div className="flex-grow relative">
            <GameMap
                mapType={MapType.SFUBurnaby}
                className="w-full h-full z-0"
                minimized={minimized}
                setMinimized={setMinimized}
            />
            <GameLocationImage
                region={MapType.SFUBurnaby}
                id={1}
                minimized={minimized}
                setMinimized={setMinimized}
            />
        </div>
    );
};

export default GameContainer;
