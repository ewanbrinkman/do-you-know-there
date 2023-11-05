'use client';
import React, { useState, useRef, useEffect } from 'react';
import GameLocationImage from '@components/Features/Game/GameLocationImage';
import MapArea from '@/app/types/data/MapArea';
import LocationData from '@/app/types/data/LocationData';
import dynamic from 'next/dynamic';
import RawLocationData from '@/app/types/data/RawLocationData';
const GameMap = dynamic(() => import('@components/Features/Game/GameMap'), {
    loading: () => <p>Map is loading...</p>,
    ssr: false,
});

const GameContainer: React.FC = () => {
    const [minimized, setMinimized] = useState(false);
    const [guessed, setGuessed] = useState(false);

    const [areaLocationData, setAreaLocationData] = useState<
        LocationData[] | null
    >(null);
    const [locationData, setLocationData] = useState<LocationData | null>(null);
    const [area, setArea] = useState<MapArea>(MapArea.SFUBurnaby);
    const [locationId, setLocationid] = useState(1);

    const parentContainerRef = useRef(null);

    const removeGuessMapInfo = useRef<(() => void) | null>(null);
    const createOrUpdateRemoveGuessMapInfo = (
        newRemoveGuessMapInfo: () => void,
    ) => {
        removeGuessMapInfo.current = newRemoveGuessMapInfo;
    };

    // Update area.
    useEffect(() => {
        import(`@assets/data/areas/${area}/locations.json`)
            .then((module) => {
                const rawAreaLocationData: RawLocationData[] = module.default;
                const newAreaLocationData: LocationData[] = rawAreaLocationData.map(rawLocationData => ({
                    ...rawLocationData,
                    area: area,
                }));
                setAreaLocationData(newAreaLocationData);
            })
            .catch((error) => {
                console.error(
                    `Failed to load area data for area ${area}: ${error}`,
                );
            });
    }, [area]);

    // Update location.
    useEffect(() => {
        if (areaLocationData === null) {
            setLocationData(null);
            return;
        }

        const newLocationData = areaLocationData.find((location) => location.id === locationId) ??
        null;
        if (newLocationData === null) {
            console.error(`Location data for Id ${locationId} in area ${area} not found.`);
        }

        setLocationData(newLocationData);
    }, [areaLocationData, locationId]);

    return (
        <div
            ref={parentContainerRef}
            className="flex-grow relative"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* <button className='absolute z-10' style={{bottom: '30px'}}>Next</button> */}
            <GameMap
                area={MapArea.SFUBurnaby}
                className="w-full h-full z-0"
                minimized={minimized}
                setMinimized={setMinimized}
                onGuess={() => {
                    setGuessed(true);
                }}
                guessed={guessed}
                // canGuess={() => {
                //     // Can only guess if location data has been loaded and have not guessed yet.
                //     return (locationData ?? false) && !guessed;
                // }}
                locationData={locationData}
                createOrUpdateRemoveGuessMapInfo={
                    createOrUpdateRemoveGuessMapInfo
                }
            />
            {guessed ? (
                <button
                    className="absolute z-10 bg-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                    style={{ bottom: '30px' }}
                    onClick={() => {
                        setGuessed(false);
                        removeGuessMapInfo.current?.();
                        setMinimized(false);
                        setLocationid(
                            (currentLocationId) => currentLocationId + 1,
                        );
                    }}
                >
                    Next
                </button>
            ) : (
                <GameLocationImage
                    locationData={locationData}
                    minimized={minimized}
                    setMinimized={setMinimized}
                    containerRef={parentContainerRef}
                />
            )}
        </div>
    );
};

export default GameContainer;
