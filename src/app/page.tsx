'use client';
import React, { useState, useEffect } from 'react';
import MapArea from '@typings/data/MapArea';
import MapData from '@typings/data/MapData';
import loadMapData from '@utils/loaders/loadMapData';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const Map = dynamic(() => import('@components/Common/Map'), {
    loading: () => <p>Map is loading...</p>,
    ssr: false,
});

const Home: React.FC = () => {
    const [area, setArea] = useState<MapArea>(MapArea.SFUBurnaby);
    const [mapData, setMapData] = useState<MapData | null>(null);

    // Update map data, when the area changes.
    useEffect(() => {
        loadMapData(area).then((newMapData: MapData) => {
            setMapData(newMapData);
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
            <div className='absolute z-10'>
                <h1 className='' style={{ fontSize: '3rem' }}>Do You Know {area}</h1>
                <Link
                    className="text-blue-500 hover:text-blue-700 text-lg"
                    href="/play"
                >
                    Play
                </Link>
            </div>
            <Map mapData={mapData} className="w-full h-full z-0" />
        </div>
    );
};

export default Home;
