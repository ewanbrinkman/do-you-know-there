'use client';
import React, { useState, useEffect } from 'react';
import MapArea from '@typings/data/MapArea';
import MapData from '@typings/data/MapData';
import MapInfo from '@typings/data/MapInfo';
import loadMapData from '@utils/loaders/loadMapData';
import loadMapInfo from '@utils/loaders/loadMapInfo';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
                <h1
                    className="pointer-events-auto text-primary-color bg-secondary-color font-extrabold rounded-lg p-4 mx-16 text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
                    // style={{ textShadow: '2px 2px 5px rgb(0, 0, 0, 0.5)' }}
                >
                    Do You Know {mapInfo ? mapInfo.name : 'There'}?
                </h1>
                <button className="pointer-events-auto text-primary-color bg-secondary-color mt-16 rounded-md py-2 px-4 transition duration-300 hover:bg-secondary-color-dark ease-in-out text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-3xl">
                    Play
                </button>
                {/* <div className="bg-secondary-color rounded-lg p-4 mt-16">
                    <button
                        className="text-primary-color hover:text-white text-lg"
                        // href="/play"
                    >
                        Play
                    </button>
                </div> */}
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
