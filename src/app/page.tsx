'use client';
import React, { useState, useEffect } from 'react';
import MapArea from '@typings/data/MapArea';
import ProcessedMapData from '@typings/data/ProcessedMapData';
import MapData from '@typings/data/MapData';
import MapInfo from '@typings/data/MapInfo';
import loadMapData from '@utils/loaders/loadMapData';
import loadMapInfo from '@utils/loaders/loadMapInfo';
import Container from '@components/Common/Container';
import Button from '@components/Common/Button';
import getMapData from '@utils/getters/getMapData';
import ScreenSize from '@typings/data/ScreenSize';
import useDeveloperMessage from '@hooks/useDeveloperMessage';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@components/Common/Map'), {
    loading: () => null,
    ssr: false,
});

const Home: React.FC = () => {
    const [area, setArea] = useState<MapArea>(MapArea.SFUBurnaby);
    const [mapData, setMapData] = useState<MapData | null>(null);
    const [processedMapData, setProcessedMapData] =
        useState<ProcessedMapData | null>(null);
    const [mapInfo, setMapInfo] = useState<MapInfo | null>(null);

    // Update map data and info, when the area changes.
    useEffect(() => {
        loadMapData(area).then((newProcessedMapData: ProcessedMapData) => {
            setProcessedMapData(newProcessedMapData);
            const newMapData: MapData = getMapData(
                newProcessedMapData,
                window.innerWidth,
            );
            setMapData(newMapData);
        });
        loadMapInfo(area).then((newMapInfo: MapInfo) => {
            setMapInfo(newMapInfo);
        });
    }, [area]);

    useDeveloperMessage();

    return (
        <div className="flex flex-grow relative justify-center items-center">
            <div className="pointer-events-none z-10 absolute flex flex-col items-center space-y-16">
                <Container className="pointer-events-auto mx-16">
                    <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                        Do You Know {mapInfo ? mapInfo.name : 'There'}?
                    </h1>
                </Container>
                <Container className="pointer-events-auto mx-16">
                    <p className="text-base md:text-lg">
                        Choose where each picture was taken on the map.
                    </p>
                </Container>
                <Button href="/play">Play</Button>
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
