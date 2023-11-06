'use client';
import React, { useState, useRef, useEffect } from 'react';
import GameLocationImage from '@components/Features/Game/GameLocationImage';
import MapArea from '@typings/data/MapArea';
import MapData from '@typings/data/MapData';
import LocationData from '@typings/data/LocationData';
import RawLocationData from '@typings/data/RawLocationData';
import loadMapData from '@utils/loaders/loadMapData';
import gameConfig from '@config/game.json';
import dynamic from 'next/dynamic';
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
    const [locationId, setLocationid] = useState<number | null>(null);

    const [mapData, setMapData] = useState<MapData | null>(null);

    const parentContainerRef = useRef(null);

    const removeGuessMapInfo = useRef<(() => void) | null>(null);
    const createOrUpdateRemoveGuessMapInfo = (
        newRemoveGuessMapInfo: () => void,
    ) => {
        removeGuessMapInfo.current = newRemoveGuessMapInfo;
    };

    const [locationsGuessedAmount, setLocationsGuessedAmount] = useState(0);
    const [locationIdsNotPicked, setLocationIdsNotPicked] = useState<number[]>(
        [],
    );

    // Update map data, when the area changes.
    useEffect(() => {
        loadMapData(area).then((newMapData: MapData) => {
            setMapData(newMapData);
        });
    }, [area]);

    // Update the list of all location data of the area, when the area changes.
    useEffect(() => {
        import(`@assets/data/areas/${area}/locations.json`)
            .then((module) => {
                const rawAreaLocationData: RawLocationData[] = module.default;
                const newAreaLocationData: LocationData[] =
                    rawAreaLocationData.map((rawLocationData) => ({
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

    // Update location data, when the list of all location data changes, or the location Id changes.
    useEffect(() => {
        if (areaLocationData === null || locationId === null) {
            setLocationData(null);
            return;
        }

        const newLocationData =
            areaLocationData.find((location) => location.id === locationId) ??
            null;
        if (newLocationData === null) {
            console.error(
                `Location data for Id ${locationId} in area ${area} not found.`,
            );
        }

        setLocationData(newLocationData);
    }, [areaLocationData, locationId]);

    const pickLocationId = (locationIds: number[]) => {
        // Choose a new location Id that hasn't been picked yet.
        const chosenIndex = Math.floor(Math.random() * locationIds.length);
        const newLocationId = locationIds[chosenIndex];

        // Update the location Ids that can still be picked.
        locationIds.splice(chosenIndex, 1);
        setLocationIdsNotPicked(locationIds);

        setLocationid(newLocationId);
    };

    // Update the list of all location Ids, when the area location data changes
    useEffect(() => {
        if (areaLocationData === null) {
            setLocationIdsNotPicked([]);

            return;
        }

        const newLocationIdsNotPicked = areaLocationData.map(
            (locationDataWithId) => locationDataWithId.id,
        );
        pickLocationId(newLocationIdsNotPicked);
    }, [areaLocationData]);

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
                mapData={mapData}
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
                        setLocationsGuessedAmount((current) => current++);
                        setGuessed(false);
                        removeGuessMapInfo.current?.();
                        setMinimized(false);

                        if (locationIdsNotPicked.length > 0) {
                            pickLocationId([...locationIdsNotPicked]);
                        } else {
                            console.log('Game finished');
                        }
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
