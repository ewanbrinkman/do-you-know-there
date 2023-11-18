'use client';
import React, { useState } from 'react';
import GameContainer from '@components/Features/Game/GameContainer';
import ResultsContainer from '@components/Features/Game/ResultsContainer';
import useDeveloperMessage from '@hooks/useDeveloperMessage';
import LocationResult from '@typings/game/LocationResult';

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
