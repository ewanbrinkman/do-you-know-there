'use client';
import React,  { useState } from 'react';
import GameContainer from '@components/Features/Game/GameContainer';
import useDeveloperMessage from '@hooks/useDeveloperMessage';

function Game() {
    const [gameOver, setGameOver] = useState(false);

    useDeveloperMessage();

    return gameOver ? null : <GameContainer setGameOver={setGameOver}/>;
}

export default Game;
