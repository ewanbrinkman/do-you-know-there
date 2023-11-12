'use client';
import React, { useState } from 'react';
import GameContainer from '@components/Features/Game/GameContainer';
import useDeveloperMessage from '@hooks/useDeveloperMessage';
import LocationResult from '@typings/game/LocationResult';
import Container from '@components/Common/Container';
import Button from '@components/Common/Button';

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

    const closestLocationGuess = locationResults.reduce((min, current) => {
        return current.distance < min.distance ? current : min;
    }, locationResults[0]);
    const furthestLocationGuess = locationResults.reduce((max, current) => {
        return current.distance > max.distance ? current : max;
    }, locationResults[0]);
    const totalDistance = locationResults.reduce((sum, current) => {
        return sum + current.distance;
    }, 0);

    return gameOver ? (
        <div className="flex flex-grow flex-col items-center p-8 space-y-8 bg-gradient-to-b from-white to-primary-color">
            <Container className="w-full sm:max-w-3xl mx-16">
                <h1 className="text-3xl font-bold">Results</h1>
                <p>
                    Total distance (lower is better): {totalDistance.toFixed(1)}
                    m
                </p>
                <p>
                    Closest guess: {closestLocationGuess.distance.toFixed(1)}m
                </p>
                <p>
                    Furthest guess: {furthestLocationGuess.distance.toFixed(1)}m
                </p>
            </Container>
            <Button
                onClick={() => {
                    setLocationResults([]);
                    setGameOver(false);
                }}
            >
                Play Again
            </Button>
        </div>
    ) : (
        <GameContainer
            setGameOver={setGameOver}
            addLocationResult={addLocationResult}
            getLatestLocationResult={getLatestLocationResult}
        />
    );
}

export default Game;
