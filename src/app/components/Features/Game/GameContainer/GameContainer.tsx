'use client';
import React, { useState, useRef, useEffect } from 'react';
import GameLocationImage from '@components/Features/Game/GameLocationImage';
import MapArea from '@typings/data/MapArea';
import MapData from '@/app/types/data/MapData';
import ProcessedMapData from '@/app/types/data/ProcessedMapData';
import LocationData from '@typings/data/LocationData';
import RawLocationData from '@typings/data/RawLocationData';
import loadMapData from '@utils/loaders/loadMapData';
import convertProcessedMapDataToMapData from '@utils/converters/convertProcessedMapDataToMapData';
import ScreenSize from '@typings/data/ScreenSize';
import gameConfig from '@config/game.json';
import dynamic from 'next/dynamic';
import Button from '@components/Common/Button';
import GameContainerProps from '@typings/game/GameContainerProps';
import Container from '@components/Common/Container';
import LocationResult from '@typings/game/LocationResult';
const GameMap = dynamic(() => import('@components/Features/Game/GameMap'), {
    loading: () => null,
    ssr: false,
});

const GameContainer: React.FC<GameContainerProps> = (
    props: GameContainerProps,
) => {
    const [minimized, setMinimized] = useState(false);
    const [guessed, setGuessed] = useState(false);

    const [areaLocationData, setAreaLocationData] = useState<
        LocationData[] | null
    >(null);
    const [locationData, setLocationData] = useState<LocationData | null>(null);
    const [area, setArea] = useState<MapArea>(MapArea.SFUBurnaby);
    const [locationId, setLocationid] = useState<number | null>(null);

    const [mapData, setMapData] = useState<MapData | null>(null);
    const [processedMapData, setProcessedMapData] =
        useState<ProcessedMapData | null>(null);

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
        loadMapData(area).then((newProcessedMapData: ProcessedMapData) => {
            setProcessedMapData(newProcessedMapData);
            const newMapData: MapData = convertProcessedMapDataToMapData(
                newProcessedMapData,
                window.innerWidth < 800 ? ScreenSize.Small : ScreenSize.Base,
            );
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

    // Update location data, when the list of all location data changes, or the
    // location Id changes.
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
    }, [areaLocationData, locationId, area]);

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
            className="flex flex-grow relative justify-center items-center"
        >
            {areaLocationData !== null && (
                <Container className="z-10 absolute top-[30px] right-[30px]">
                    <p>
                        Location {locationsGuessedAmount + 1}/
                        {Math.min(
                            gameConfig.locationsPerGame,
                            areaLocationData.length,
                        )}
                    </p>
                </Container>
            )}
            <GameMap
                mapData={mapData}
                className="w-full h-full z-0"
                minimized={minimized}
                setMinimized={setMinimized}
                onGuess={() => {
                    setGuessed(true);
                }}
                guessed={guessed}
                locationData={locationData}
                createOrUpdateRemoveGuessMapInfo={
                    createOrUpdateRemoveGuessMapInfo
                }
                addLocationResult={props.addLocationResult}
            />
            {guessed && (
                <Container className="z-10 absolute top-[30px]">
                    <p>
                        Distance:{' '}
                        {props.getLatestLocationResult().distance.toFixed(1)}m
                    </p>
                </Container>
            )}
            {guessed ? (
                areaLocationData !== null && (
                    <Button
                        className="z-10 absolute bottom-[50px]"
                        onClick={() => {
                            setGuessed(false);
                            removeGuessMapInfo.current?.();
                            setMinimized(false);

                            // Set location data to null for now, to not have the
                            // old location image be displayed. pickLocationId will
                            // set the new location data so that the new location
                            // image is displayed.
                            setLocationData(null);

                            if (
                                locationIdsNotPicked.length > 0 &&
                                locationsGuessedAmount + 1 <
                                    gameConfig.locationsPerGame
                            ) {
                                pickLocationId([...locationIdsNotPicked]);
                            } else {
                                props.setGameOver(true);
                            }
                            setLocationsGuessedAmount((current) => ++current);
                        }}
                    >
                        {locationsGuessedAmount + 1 <
                        Math.min(
                            gameConfig.locationsPerGame,
                            areaLocationData.length,
                        )
                            ? 'Next'
                            : 'View Results'}
                    </Button>
                )
            ) : (
                <GameLocationImage
                    locationData={locationData}
                    minimized={minimized}
                    setMinimized={setMinimized}
                />
            )}
        </div>
    );
};

export default GameContainer;
