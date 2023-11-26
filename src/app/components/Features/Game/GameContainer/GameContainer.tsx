'use client';
import React, { useState, useRef, useEffect } from 'react';
import GameLocationImage from '@components/Features/Game/GameLocationImage';
import MapArea from '@typings/data/MapArea';
import MapData from '@typings/data/MapData';
import ProcessedMapData from '@typings/data/ProcessedMapData';
import LocationData from '@typings/data/LocationData';
import RawLocationData from '@typings/data/RawLocationData';
import loadMapData from '@utils/loaders/loadMapData';
import getMapData from '@utils/getters/getMapData';
import type PastGameLocations from '@typings/data/PastGameLocations';
import gameConfig from '@config/game.json';
import Button from '@components/Common/Button';
import GameContainerProps from '@typings/game/GameContainerProps';
import Container from '@components/Common/Container';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import GameMap from '@components/Features/Game/GameMap';

const GameContainer: React.FC<GameContainerProps> = (
    props: GameContainerProps,
) => {
    const [minimized, setMinimized] = useState(false);
    const [guessed, setGuessed] = useState(false);
    const [unsubmittedGuess, setUnsubmittedGuess] = useState(false);

    const [areaLocationData, setAreaLocationData] = useState<
        LocationData[] | null
    >(null);
    const [locationData, setLocationData] = useState<LocationData | null>(null);
    const [area, setArea] = useState<MapArea>(MapArea.SFUBurnaby);
    const [locationId, setLocationid] = useState<string | null>(null);

    const [mapData, setMapData] = useState<MapData | null>(null);
    const [processedMapData, setProcessedMapData] =
        useState<ProcessedMapData | null>(null);

    const parentContainerRef = useRef(null);

    const removeGuessMapInfo = useRef<(() => void) | null>(null);

    const [locationsGuessedAmount, setLocationsGuessedAmount] = useState(0);
    const [locationIdsNotPicked, setLocationIdsNotPicked] = useState<string[]>(
        [],
    );

    const [guessMarkerCoordinates, setGuessMarkerCoordinates] =
        useState<L.LatLngExpression | null>(null);

    const mapRef = useRef<L.Map | null>(null);

    // Update map data, when the area changes.
    useEffect(() => {
        loadMapData(area).then((newProcessedMapData: ProcessedMapData) => {
            setProcessedMapData(newProcessedMapData);
            const newMapData: MapData = getMapData(
                newProcessedMapData,
                window.innerWidth,
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

    const pickLocationId = (locationIds: string[]) => {
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

        // Don't pick locations from recently played games if possible. Start by
        // loading in any location ids from past games.
        const rawPastGameLocations = localStorage.getItem('pastGameLocations');
        const pastGameLocations: PastGameLocations =
            rawPastGameLocations === null
                ? []
                : JSON.parse(rawPastGameLocations);
        if (
            pastGameLocations.length >= gameConfig.gamesBeforeLocationsCanRepeat
        ) {
            pastGameLocations.splice(0, pastGameLocations.length - 3);
        }

        // Remove as many locations from the saved past games as possible.
        let validLocationIds: string[] = [...newLocationIdsNotPicked];
        for (let i = pastGameLocations.length - 1; i >= 0; i--) {
            // Check if validLocationIds length is larger or equal to
            // locationsPerGame + pastGameLocations[pastGameLocations.length -
            // i].
            if (
                validLocationIds.length >=
                gameConfig.locationsPerGame +
                    pastGameLocations[pastGameLocations.length - 1 - i].length
            ) {
                // Remove elements from validLocationIds that are in
                // pastGameLocations[pastGameLocations.length - i].
                validLocationIds = validLocationIds.filter(
                    (id) =>
                        !pastGameLocations[
                            pastGameLocations.length - 1 - i
                        ].includes(id),
                );
            } else {
                // Stop the loop if the condition is no longer met.
                break;
            }
        }

        pickLocationId(validLocationIds);
    }, [areaLocationData]);

    return (
        <div
            ref={parentContainerRef}
            className="flex flex-grow relative justify-center items-center"
        >
            {areaLocationData !== null && (
                <div>
                    <Container className="z-10 absolute top-[30px] right-[30px]">
                        <p>
                            Location {locationsGuessedAmount + 1}/
                            {Math.min(
                                gameConfig.locationsPerGame,
                                areaLocationData.length,
                            )}
                            {guessed &&
                                ` - Distance: ${props
                                    .getLatestLocationResult()
                                    .distance.toFixed(1)}m`}
                        </p>
                    </Container>
                </div>
            )}
            <GameMap
                mapRef={mapRef}
                mapData={mapData}
                className="w-full h-full z-0"
                minimized={minimized}
                setMinimized={setMinimized}
                onPlaceMarker={() => {
                    setUnsubmittedGuess(true);
                }}
                guessed={guessed}
                locationData={locationData}
                guessMarkerCoordinates={guessMarkerCoordinates}
                setGuessMarkerCoordinates={setGuessMarkerCoordinates}
            >
                {unsubmittedGuess &&
                    mapData &&
                    guessMarkerCoordinates &&
                    locationData && (
                        <Button
                            className="absolute bottom-[50px]"
                            onClick={() => {
                                if (mapRef.current === null) {
                                    return;
                                }

                                mapRef.current.setZoom(mapData.zoom.initial);

                                // Find the distance between the two guesses
                                // locations.
                                props.addLocationResult({
                                    distance: new L.LatLng(
                                        locationData.coordinates.lat,
                                        locationData.coordinates.lng,
                                    ).distanceTo(guessMarkerCoordinates),
                                    locationData: locationData,
                                });
                                setUnsubmittedGuess(false);
                                setGuessed(true);
                            }}
                        >
                            Submit
                        </Button>
                    )}
            </GameMap>
            {guessed ? (
                areaLocationData &&
                mapData && (
                    <Button
                        className="z-10 absolute bottom-[50px]"
                        onClick={() => {
                            if (mapRef.current === null) {
                                return;
                            }

                            mapRef.current.setZoom(mapData.zoom.initial);
                            setGuessMarkerCoordinates(null);
                            setGuessed(false);
                            removeGuessMapInfo.current?.();
                            setMinimized(false);

                            // Set location data to null for now, to not have
                            // the old location image be displayed.
                            // pickLocationId will set the new location data so
                            // that the new location image is displayed.
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
