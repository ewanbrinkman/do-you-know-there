'use client';
import React, { useState, useEffect } from 'react';
import MapArea from '@typings/data/MapArea';
import MapData from '@typings/data/MapData';
import MapInfo from '@typings/data/MapInfo';
import loadMapData from '@utils/loaders/loadMapData';
import loadMapInfo from '@utils/loaders/loadMapInfo';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Button from '@components/Common/Button';
const Map = dynamic(() => import('@components/Common/Map'), {
    loading: () => null,
    ssr: false,
});

const Home: React.FC = () => {
    const [area, setArea] = useState<MapArea>(MapArea.SFUBurnaby);
    const [mapData, setMapData] = useState<MapData | null>(null);
    const [mapInfo, setMapInfo] = useState<MapInfo | null>(null);

    // Update map data and info, when the area changes.
    useEffect(() => {
        loadMapData(area).then((newMapData: MapData) => {
            setMapData(newMapData);
        });
        loadMapInfo(area).then((newMapInfo: MapInfo) => {
            setMapInfo(newMapInfo);
        });
    }, [area]);

    return (
        <div
            className="flex-grow relative"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div className="pointer-events-none z-10 absolute flex flex-col items-center">
                <h1 className="pointer-events-auto mb-16 text-center text-primary-color bg-secondary-color font-extrabold rounded-lg p-4 mx-16 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                    Do You Know {mapInfo ? mapInfo.name : 'There'}?
                </h1>
                <p className="pointer-events-auto mb-16 text-center text-primary-color bg-secondary-color rounded-lg p-4 mx-16 text-base md:text-lg">
                    Choose where each picture was taken on the map.
                </p>
                <Button text="Play" href="/play" />
            </div>
            <Map
                mapData={mapData}
                className="w-full h-full z-0"
                zoomControl={false}
            />
        </div>
    );
};

export default Home;
