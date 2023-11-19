'use client';
import React, { useState, useEffect } from 'react';
import Container from '@components/Common/Container';
import Button from '@components/Common/Button';
import ResultsContainerProps from '@typings/game/ResultsContainerProps';
import LocationImage from '@components/Common/LocationImage';
import PersonalBests from '@typings/game/PersonalBests';

const ResultsContainer: React.FC<ResultsContainerProps> = (
    props: ResultsContainerProps,
) => {
    const closestLocationGuess = props.locationResults.reduce(
        (min, current) => {
            return current.distance < min.distance ? current : min;
        },
        props.locationResults[0],
    );
    const furthestLocationGuess = props.locationResults.reduce(
        (max, current) => {
            return current.distance > max.distance ? current : max;
        },
        props.locationResults[0],
    );
    const totalDistance = props.locationResults.reduce((sum, current) => {
        return sum + current.distance;
    }, 0);

    const [personalBests, setPersonalBests] = useState<PersonalBests | null>(
        null,
    );

    useEffect(() => {
        // Read in personal best scores.
        const rawGameResultsPersonalBests = localStorage.getItem(
            'gameResultsPersonalBests',
        );
        const gameResultsPersonalBests: PersonalBests =
            rawGameResultsPersonalBests === null
                ? {
                      summary: {
                          total: totalDistance,
                          closest: closestLocationGuess.distance,
                          furthest: furthestLocationGuess.distance,
                      },
                      locations: {},
                  }
                : JSON.parse(rawGameResultsPersonalBests);

        // Update summary personal best scores.
        gameResultsPersonalBests.summary.total = Math.min(
            gameResultsPersonalBests.summary.total,
            totalDistance,
        );
        gameResultsPersonalBests.summary.closest = Math.min(
            gameResultsPersonalBests.summary.closest,
            closestLocationGuess.distance,
        );
        gameResultsPersonalBests.summary.furthest = Math.min(
            gameResultsPersonalBests.summary.furthest,
            furthestLocationGuess.distance,
        );

        // Update location personal best scores.
        for (const locationResult of props.locationResults) {
            const locationResultId = locationResult.locationData.id;
            if (
                gameResultsPersonalBests.locations[locationResultId] ===
                undefined
            ) {
                gameResultsPersonalBests.locations[locationResultId] =
                    locationResult.distance;
            } else {
                gameResultsPersonalBests.locations[locationResultId] = Math.min(
                    gameResultsPersonalBests.locations[locationResultId],
                    locationResult.distance,
                );
            }
        }

        // Save the new personal best scores.
        localStorage.setItem(
            'gameResultsPersonalBests',
            JSON.stringify(gameResultsPersonalBests),
        );

        setPersonalBests(gameResultsPersonalBests);
    }, []);

    return (
        <div className="flex flex-grow flex-col items-center p-8 space-y-8 bg-gradient-to-b from-white to-primary-color">
            <Container className="w-full sm:max-w-2xl mx-16">
                <h1 className="text-3xl font-bold">Results</h1>
                <p>
                    Total distance (lower is better): {totalDistance.toFixed(1)}
                    m<br />
                    {personalBests &&
                        `Personal best: ${personalBests.summary.total.toFixed(1)}m`}
                </p>
                <p>
                    Closest guess: {closestLocationGuess.distance.toFixed(1)}m
                    <br />
                    {personalBests &&
                        `Personal best: ${personalBests.summary.closest.toFixed(1)}m`}
                </p>
                <p>
                    Furthest guess: {furthestLocationGuess.distance.toFixed(1)}m
                    <br />
                    {personalBests &&
                        `Personal best: ${personalBests.summary.furthest.toFixed(1)}m`}
                </p>
            </Container>
            <Container className="w-full sm:max-w-2xl mx-16">
                <div className="flex flex-col items-center space-y-12">
                    {props.locationResults.map((locationResult, index) => (
                        <div
                            className="flex flex-col items-center space-y-2 max-w-[70%]"
                            key={index}
                        >
                            <h2 className="text-2xl font-bold">
                                {locationResult.locationData.name}
                            </h2>
                            <p>
                                {locationResult.distance.toFixed(1)}m<br />
                                {personalBests &&
                                    `Personal best: ${
                                        personalBests.locations[
                                            locationResult.locationData.id
                                        ].toFixed(1)
                                    }m`}
                            </p>
                            <LocationImage
                                locationData={locationResult.locationData}
                                className="max-h-[300px]"
                            />
                        </div>
                    ))}
                </div>
            </Container>
            <Button onClick={props.onPlayAgain}>Play Again</Button>
        </div>
    );
};

export default ResultsContainer;
