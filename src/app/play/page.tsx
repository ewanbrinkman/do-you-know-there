'use client';
import React, { useState } from 'react';
import ResultsContainer from '@components/Features/Game/ResultsContainer';
import useDeveloperMessage from '@hooks/useDeveloperMessage';
import LocationResult from '@typings/game/LocationResult';
import dynamic from 'next/dynamic';
const GameContainer = dynamic(
    () => import('@components/Features/Game/GameContainer'),
    {
        loading: () => null,
        ssr: false,
    },
);

function Game() {
    const [gameOver, setGameOver] = useState(false);
    const [locationResults, setLocationResults] = useState<LocationResult[]>(
        [],
    );

    const addLocationResult = (locationResult: LocationResult) => {
        setLocationResults((current) => [...current, locationResult]);
    };

    const getLatestLocationResult = () => {
        return locationResults[locationResults.length - 1];
    };

    useDeveloperMessage();

    return gameOver ? (
        <ResultsContainer
            locationResults={locationResults}
            onPlayAgain={() => {
                setLocationResults([]);
                setGameOver(false);
            }}
        />
    ) : (
        <GameContainer
            setGameOver={setGameOver}
            addLocationResult={addLocationResult}
            getLatestLocationResult={getLatestLocationResult}
        />
    );
}

export default Game;
